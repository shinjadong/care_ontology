<?php
header("Content-Type:text/html; charset=utf-8;"); 
/*
*******************************************************
* <Payment Request Parameter>
* The sample page only shows basic (required) parameters.
*******************************************************
*/

$merchantKey = "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg=="; // merchantKey
$MID         = "nicepay00m"; // merchantID
$goodsName   = "나이스페이"; // goodsName
$price       = "1004"; // amount of payment
$buyerName   = "나이스"; // buyer name 
$buyerTel	 = "01000000000"; // buyer contact
$buyerEmail  = "happy@day.co.kr"; // buyer email        
$moid        = "mnoid1234567890"; // order id                     
$returnURL	 = "http://localhost:8080/payResult_utf.php"; // absolute path, mobile payment only

/*
*******************************************************
* <Hash encryption> (do not modify)
*******************************************************
*/
$ediDate = date("YmdHis");
$hashString = bin2hex(hash('sha256', $ediDate.$MID.$price.$merchantKey, true));
?>
<!DOCTYPE html>
<html>
<head>
<title>NICEPAY PAY REQUEST(EUC-KR)</title>
<meta charset="utf-8">
<style>
	html,body {height: 100%;}
	form {overflow: hidden;}
</style>
<script src="https://pg-web.nicepay.co.kr/v3/common/js/nicepay-pgweb.js" type="text/javascript"></script>
<script type="text/javascript">
//It is executed when call payment window.
function nicepayStart(){
	goPay(document.payForm);
}

//[PC Only]When pc payment window is closed, nicepay-pgweb.js call back nicepaySubmit() function <<'nicepaySubmit()' DO NOT CHANGE>>
function nicepaySubmit(){
	document.payForm.submit();
}

//[PC Only]payment window close function <<'nicepayClose()' DO NOT CHANGE>>
function nicepayClose(){
	alert("payment window is closed");
}
</script>
</head>
<body>
<form name="payForm" method="post" action="payResult_utf.php">
	<table>
		<tr>
			<th>PayMethod</th>
			<td><input type="text" name="PayMethod" value=""></td>
		</tr>
		<tr>
			<th>GoodsName</th>
			<td><input type="text" name="GoodsName" value="<?php echo($goodsName)?>"></td>
		</tr>
		<tr>
			<th>Amt</th>
			<td><input type="text" name="Amt" value="<?php echo($price)?>"></td>
		</tr>				
		<tr>
			<th>MID</th>
			<td><input type="text" name="MID" value="<?php echo($MID)?>"></td>
		</tr>	
		<tr>
			<th>Moid</th>
			<td><input type="text" name="Moid" value="<?php echo($moid)?>"></td>
		</tr> 
		<tr>
			<th>BuyerName</th>
			<td><input type="text" name="BuyerName" value="<?php echo($buyerName)?>"></td>
		</tr>
		<tr>
			<th>BuyerEmail</th>
			<td><input type="text" name="BuyerEmail" value="<?php echo($buyerEmail)?>"></td>
		</tr>		
		<tr>
			<th>BuyerTel</th>
			<td><input type="text" name="BuyerTel" value="<?php echo($buyerTel)?>"></td>
		</tr>	 
		<tr>
			<th>ReturnURL [Mobile only]</th>
			<td><input type="text" name="ReturnURL" value="<?php echo($returnURL)?>"></td>
		</tr>
		<tr>
			<th>Virtual Account Expiration Date(YYYYMMDD)</th>
			<td><input type="text" name="VbankExpDate" value=""></td>
		</tr>		
					
		<input type="hidden" name="NpLang" value="EN"/> <!-- EN:English, CN:Chinese, KO:Korean -->
		<input type="hidden" name="GoodsCl" value="1"/>	<!-- products(1), contents(0)) -->
		<input type="hidden" name="TransType" value="0"/>	<!-- USE escrow false(0)/true(1) --> 
		<input type="hidden" name="CharSet" value="utf-8"/>	<!-- Return CharSet -->
		<input type="hidden" name="ReqReserved" value=""/>	<!-- mall custom field -->
					
		<!-- DO NOT CHANGE -->
		<input type="hidden" name="EdiDate" value="<?php echo($ediDate)?>"/> <!-- YYYYMMDDHHMISS -->
		<input type="hidden" name="SignData" value="<?php echo($hashString)?>"/>	<!-- EncryptData -->
	</table>
	<a href="#" class="btn_blue" onClick="nicepayStart();">REQUEST</a>
</form>
</body>
</html>