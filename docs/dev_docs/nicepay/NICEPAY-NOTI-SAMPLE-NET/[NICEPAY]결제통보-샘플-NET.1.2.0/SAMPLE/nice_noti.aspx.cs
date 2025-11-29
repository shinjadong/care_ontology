using System;
using System.Web.UI;
using System.IO;

public partial class niceVacctNoti : System.Web.UI.Page
{
    protected string LogPath;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            responseVacctNoti();
        }
    }

    protected void responseVacctNoti()
    {
        String sPayMethod      = Request.Params["PayMethod"];          // 지불수단
        String sMID            = Request.Params["MID"];                // 상점ID
        String sMallUserID     = Request.Params["MallUserID"];         // 회원사 ID
        String sAmt            = Request.Params["Amt"];                // 금액
        String sName           = Request.Params["name"];               // 구매자명
        String sGoodsName      = Request.Params["GoodsName"];          // 상품명
        String sTID            = Request.Params["TID"];                // 거래번호
        String sMOID           = Request.Params["MOID"];               // 주문번호
        String sAuthDate       = Request.Params["AuthDate"];           // 입금일시 (yyMMddHHmmss)
        String sResultCode     = Request.Params["ResultCode"];         // 결과코드 ('4110' 경우 입금통보)
        String sResultMsg      = Request.Params["ResultMsg"];          // 결과메시지
        String sVbankNum       = Request.Params["VbankNum"];           // 가상계좌번호
        String sFnCd           = Request.Params["FnCd"];               // 가상계좌 은행코드
        String sVbankName      = Request.Params["VbankName"];          // 가상계좌 은행명
        String sVbankInputName = Request.Params["VbankInputName"];     // 입금자 명
        String sCancelDate     = Request.Params["CancelDate"];         // 취소일시
 
        // 가상계좌채번시 현금영수증 자동발급신청이 되었을경우 전달 (RcptTID, RcptType, RcptAuthCode)
        String sRcptTID        = Request.Params["RcptTID"];            // 현금영수증 거래번호
        String sRcptType       = Request.Params["RcptType"];           // 현금 영수증 구분(0:미발행, 1:소득공제용, 2:지출증빙용)
        String sRcptAuthCode   = Request.Params["RcptAuthCode"];       // 현금영수증 승인번호

        // 로그파일 
        FileInfo file = new FileInfo(@"C:\log\nice_vacct_noti_result.log");
        StreamWriter sw = file.AppendText();
        sw.WriteLine("************************************************");
        sw.WriteLine("PayMethod      : " + sPayMethod);
        sw.WriteLine("M_ID           : " + sMID);
        sw.WriteLine("MallUserID     : " + sMallUserID);
        sw.WriteLine("Amt            : " + sAmt);
        sw.WriteLine("name           : " + sName);
        sw.WriteLine("GoodsName      : " + sGoodsName);
        sw.WriteLine("TID            : " + sTID);
        sw.WriteLine("MOID           : " + sMOID);
        sw.WriteLine("AuthDate       : " + sAuthDate);
        sw.WriteLine("ResultCode     : " + sResultCode);
        sw.WriteLine("ResultMsg      : " + sResultMsg);
        sw.WriteLine("VbankNum       : " + sVbankNum);
        sw.WriteLine("FnCd           : " + sFnCd);
        sw.WriteLine("VbankName      : " + sVbankName);
        sw.WriteLine("VbankInputName : " + sVbankInputName);
        sw.WriteLine("RcptTID        : " + sRcptTID);
        sw.WriteLine("RcptType       : " + sRcptType);
        sw.WriteLine("RcptAuthCode   : " + sRcptAuthCode);
        sw.WriteLine("CancelDate     : " + sCancelDate);        
        sw.WriteLine("************************************************");
        sw.WriteLine("");
        sw.Flush();
        sw.Close();

        /****************************************************
         * <결제 결과 가맹점 데이터베이스 처리>
         * 
         * 가상계좌 입금결과를 가맹점 입금완료 처리를 위해
         * 데이터베이스 처리를 하시기 바랍니다.
         * 
        ****************************************************/

        bool insertSuccess = true; // 가맹점 데이터베이스 처리가 완료된 것으로 가정합니다.

        // 가맹점 DB처리 - 결제 데이터 통보 설정 > “OK” 체크박스에 체크한 경우" 만 처리 하시기 바랍니다.
        // TCP인 경우 OK 문자열 뒤에 라인피드 추가
        if (insertSuccess == true) {
            Response.Write("OK");
            Response.End();
        } else {
            Response.Write("FAIL");
            Response.End();
        }
    }
}

