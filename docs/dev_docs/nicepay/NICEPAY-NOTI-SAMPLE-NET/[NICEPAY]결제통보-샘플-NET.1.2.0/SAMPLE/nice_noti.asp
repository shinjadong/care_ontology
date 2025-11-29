<%

'**********************************************************************************
' 구매자가 입금하면 결제데이터 통보를 수신하여 DB 처리 하는 부분 입니다.
' 수신되는 필드에 대한 DB 작업을 수행하십시오.
' 수신필드 자세한 내용은 메뉴얼 참조
'**********************************************************************************

PayMethod       = Request("PayMethod")          '지불수단
M_ID            = Request("MID")                '상점ID
MallUserID      = Request("MallUserID")         '회원사 ID
Amt             = Request("Amt")                '금액
name            = Request("name")               '구매자명
GoodsName       = Request("GoodsName")          '상품명
TID             = Request("TID")                '거래번호
MOID            = Request("MOID")               '주문번호
AuthDate        = Request("AuthDate")           '입금일시 (yyMMddHHmmss)
ResultCode      = Request("ResultCode")         '결과코드 ('4110' 경우 입금통보)
ResultMsg       = Request("ResultMsg")          '결과메시지
VbankNum        = Request("VbankNum")           '가상계좌번호
FnCd            = Request("FnCd")               '가상계좌 은행코드
VbankName       = Request("VbankName")          '가상계좌 은행명
VbankInputName  = Request("VbankInputName")     '입금자 명
CancelDate      = Request("CancelDate")         '취소일시

'**********************************************************************************
'가상계좌, 계좌이체의 경우 현금영수증 자동발급신청이 되었을경우 전달되며
'RcptTID 에 값이 있는경우만 발급처리 됨
'**********************************************************************************
RcptTID         = Request("RcptTID")            '현금영수증 거래번호
RcptType        = Request("RcptType")           '현금 영수증 구분(0:미발행, 1:소득공제용, 2:지출증빙용)
RcptAuthCode    = Request("RcptAuthCode")       '현금영수증 승인번호

Set objFSO      = CreateObject("Scripting.FileSystemObject")

'**********************************************************************************
'이부분에 로그파일 경로를 수정해주세요.
'로그는 문제발생시 오류 추적의 중요데이터 이므로 반드시 적용해주시기 바랍니다.
Set fs = objFSO.OpenTextFile("C:\NICEPAY20\log\nice_vacct_noti_result.log",8,True)
'**********************************************************************************

fs.WriteLine("************************************************")
fs.WriteLine("PayMethod     : " + PayMethod)
fs.WriteLine("M_ID          : " + M_ID)
fs.WriteLine("MallUserID    : " + MallUserID)
fs.WriteLine("Amt           : " + Amt)
fs.WriteLine("name          : " + name)
fs.WriteLine("GoodsName     : " + GoodsName)
fs.WriteLine("TID           : " + TID)
fs.WriteLine("MOID          : " + MOID)
fs.WriteLine("AuthDate      : " + AuthDate)
fs.WriteLine("ResultCode    : " + ResultCode)
fs.WriteLine("ResultMsg     : " + ResultMsg)
fs.WriteLine("VbankNum      : " + VbankNum)
fs.WriteLine("FnCd          : " + FnCd)
fs.WriteLine("VbankName     : " + VbankName)
fs.WriteLine("VbankInputName : " + VbankInputName)
fs.WriteLine("RcptTID       : " + RcptTID)
fs.WriteLine("RcptType      : " + RcptType)
fs.WriteLine("RcptAuthCode  : " + RcptAuthCode)
fs.WriteLine("CancelDate    : " + CancelDate)
fs.WriteLine("************************************************")
fs.WriteLine("")
fs.Close


'가맹점 DB처리

'**************************************************************************************************
'**************************************************************************************************
'결제 데이터 통보 설정 > “OK” 체크박스에 체크한 경우" 만 처리 하시기 바랍니다. 
'**************************************************************************************************
'TCP인 경우 OK 문자열 뒤에 라인피드 추가
'위에서 상점 데이터베이스에 등록 성공유무에 따라서 성공시에는 "OK"를 NICEPAY로
'리턴하셔야합니다. 아래 조건에 데이터베이스 성공시 받는 FLAG 변수를 넣으세요
'(주의) OK를 리턴하지 않으시면 NICEPAY 서버는 "OK"를 수신할때까지 계속 재전송을 시도합니다
'기타 다른 형태의 PRINT(response.write)는 하지 않으시기 바랍니다
'IF (데이터베이스 등록 성공 유무 조건변수 = true) THEN
'Response.write "OK"                ' 절대로 지우지마세요
'ELSE
'Response.write "FAIL"              ' 절대로 지우지마세요
'END IF
'*************************************************************************************************
'*************************************************************************************************
%>

