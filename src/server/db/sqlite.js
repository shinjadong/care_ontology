/**
 * CareOn POS - SQLite 데이터베이스 모듈
 * 결제 데이터를 로컬에 저장하여 디지털 트윈의 기반 구축
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class CareOnDB {
  constructor(dbPath) {
    // 데이터 디렉토리 생성
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new Database(dbPath);

    // WAL 모드 활성화 (동시 읽기/쓰기 성능 향상)
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('synchronous = NORMAL');

    this.initTables();
    console.log('[DB] SQLite 초기화 완료:', dbPath);
  }

  initTables() {
    // 거래(Transaction) 테이블 - 결제 데이터 저장
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tid TEXT UNIQUE NOT NULL,
        order_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        pay_method TEXT,
        card_name TEXT,
        card_no TEXT,
        auth_code TEXT,
        auth_date TEXT,
        status TEXT DEFAULT 'pending',
        result_code TEXT,
        result_msg TEXT,
        raw_data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 주문(Order) 테이블
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        order_number INTEGER,
        total_amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        items TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at DATETIME
      )
    `);

    // 이벤트 로그 테이블 (디지털 트윈용)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS event_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        entity_type TEXT,
        entity_id TEXT,
        payload TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 인덱스 생성
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_transactions_order ON transactions(order_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(created_at);
      CREATE INDEX IF NOT EXISTS idx_event_log_type ON event_log(event_type, created_at);
    `);
  }

  // ==================== 거래 관련 ====================

  /**
   * 새 거래 시작 (결제 요청 시)
   */
  startTransaction(orderId, amount, payMethod = 'CARD') {
    const stmt = this.db.prepare(`
      INSERT INTO transactions (tid, order_id, amount, pay_method, status)
      VALUES (?, ?, ?, ?, 'requested')
    `);

    const tid = `CAREON_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    stmt.run(tid, orderId, amount, payMethod);

    this.logEvent('TRANSACTION_STARTED', 'transaction', tid, { orderId, amount });
    return tid;
  }

  /**
   * 거래 승인 완료 업데이트
   */
  completeTransaction(tid, paymentResult) {
    const stmt = this.db.prepare(`
      UPDATE transactions
      SET status = 'completed',
          tid = ?,
          auth_code = ?,
          auth_date = ?,
          card_name = ?,
          card_no = ?,
          result_code = ?,
          result_msg = ?,
          raw_data = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE tid = ? OR order_id = ?
    `);

    stmt.run(
      paymentResult.TID || tid,
      paymentResult.AuthCode,
      paymentResult.AuthDate,
      paymentResult.CardName,
      paymentResult.CardNo,
      paymentResult.ResultCode,
      paymentResult.ResultMsg,
      JSON.stringify(paymentResult),
      tid,
      paymentResult.Moid
    );

    this.logEvent('TRANSACTION_COMPLETED', 'transaction', tid, paymentResult);
  }

  /**
   * 거래 실패 업데이트
   */
  failTransaction(tid, error) {
    const stmt = this.db.prepare(`
      UPDATE transactions
      SET status = 'failed',
          result_code = ?,
          result_msg = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE tid = ?
    `);

    stmt.run(error.code || 'ERROR', error.message, tid);
    this.logEvent('TRANSACTION_FAILED', 'transaction', tid, error);
  }

  /**
   * 거래 조회
   */
  getTransaction(tid) {
    return this.db.prepare('SELECT * FROM transactions WHERE tid = ?').get(tid);
  }

  /**
   * 오늘 매출 통계
   */
  getTodayStats() {
    const result = this.db.prepare(`
      SELECT
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as total,
        COALESCE(AVG(amount), 0) as average
      FROM transactions
      WHERE status = 'completed'
        AND DATE(created_at) = DATE('now', 'localtime')
    `).get();

    return result;
  }

  /**
   * 최근 거래 목록
   */
  getRecentTransactions(limit = 10) {
    return this.db.prepare(`
      SELECT * FROM transactions
      ORDER BY created_at DESC
      LIMIT ?
    `).all(limit);
  }

  // ==================== 주문 관련 ====================

  /**
   * 새 주문 생성
   */
  createOrder(items, totalAmount) {
    const orderId = `ORD_${Date.now()}`;
    const orderNumber = this.getNextOrderNumber();

    const stmt = this.db.prepare(`
      INSERT INTO orders (id, order_number, total_amount, items, status)
      VALUES (?, ?, ?, ?, 'pending')
    `);

    stmt.run(orderId, orderNumber, totalAmount, JSON.stringify(items));
    this.logEvent('ORDER_CREATED', 'order', orderId, { items, totalAmount });

    return { orderId, orderNumber };
  }

  getNextOrderNumber() {
    const result = this.db.prepare(`
      SELECT COALESCE(MAX(order_number), 0) + 1 as next
      FROM orders
      WHERE DATE(created_at) = DATE('now', 'localtime')
    `).get();

    return result.next;
  }

  completeOrder(orderId) {
    this.db.prepare(`
      UPDATE orders
      SET status = 'completed', completed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(orderId);

    this.logEvent('ORDER_COMPLETED', 'order', orderId, {});
  }

  // ==================== 이벤트 로그 ====================

  logEvent(eventType, entityType, entityId, payload) {
    const stmt = this.db.prepare(`
      INSERT INTO event_log (event_type, entity_type, entity_id, payload)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(eventType, entityType, entityId, JSON.stringify(payload));
  }

  getEventLog(limit = 50) {
    return this.db.prepare(`
      SELECT * FROM event_log ORDER BY created_at DESC LIMIT ?
    `).all(limit);
  }

  // ==================== 분석용 ====================

  /**
   * 시간대별 매출 (오늘)
   */
  getHourlySales() {
    return this.db.prepare(`
      SELECT
        strftime('%H', created_at) as hour,
        COUNT(*) as count,
        SUM(amount) as total
      FROM transactions
      WHERE status = 'completed'
        AND DATE(created_at) = DATE('now', 'localtime')
      GROUP BY strftime('%H', created_at)
      ORDER BY hour
    `).all();
  }

  close() {
    this.db.close();
  }
}

module.exports = CareOnDB;
