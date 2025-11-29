<?php
header("Content-Type:text/html; charset=utf-8;"); 
/*
****************************************************************************************
* <Authentication Result Parameter>
****************************************************************************************
*/
$authResultCode = $_POST['AuthResultCode'];		// authentication result code 0000:success
$authResultMsg = $_POST['AuthResultMsg'];		// authentication result message
$nextAppURL = $_POST['NextAppURL'];				// authorization request URL
$txTid = $_POST['TxTid'];						// transaction ID
$authToken = $_POST['AuthToken'];				// authentication TOKEN
$payMethod = $_POST['PayMethod'];				// payment method
$mid = $_POST['MID'];							// merchant id
$moid = $_POST['Moid'];							// order number
$amt = $_POST['Amt'];							// Amount of payment
$reqReserved = $_POST['ReqReserved'];			// mall custom field 
$netCancelURL = $_POST['NetCancelURL'];			// netCancelURL
	
/*
****************************************************************************************
* <authorization parameters init>
****************************************************************************************
*/
$response = "";

if($authResultCode === "0000"){
	/*
	****************************************************************************************
	* <Hash encryption> (do not modify)
	****************************************************************************************
	*/
	$ediDate = date("YmdHis");
	$merchantKey = "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg=="; // 상점키
	$signData = bin2hex(hash('sha256', $authToken . $mid . $amt . $ediDate . $merchantKey, true));

	try{
		$data = Array(
			'TID' => $txTid,
			'AuthToken' => $authToken,
			'MID' => $mid,
			'Amt' => $amt,
			'EdiDate' => $ediDate,
			'SignData' => $signData,
			'CharSet' => 'utf-8'
		);		
		/*
		****************************************************************************************
		* <authorization request>
		* authorization through server to server communication.
		****************************************************************************************
		*/			
		$response = reqPost($data, $nextAppURL);
		jsonRespDump($response);
	}catch(Exception $e){
		$e->getMessage();
		$data = Array(
			'TID' => $txTid,
			'AuthToken' => $authToken,
			'MID' => $mid,
			'Amt' => $amt,
			'EdiDate' => $ediDate,
			'SignData' => $signData,
			'NetCancel' => '1',
			'CharSet' => 'utf-8'
		);
		/*
		*************************************************************************************
		* <NET CANCEL>
		* If an exception occurs during communication, cancelation is recommended
		*************************************************************************************
		*/			
		$response = reqPost($data, $netCancelURL);
		jsonRespDump($response);
	}	
	
}else{
	//When authentication fail
	$ResultCode = $authResultCode; 	
	$ResultMsg = $authResultMsg;
}

// API CALL foreach example
function jsonRespDump($resp){
	$respArr = json_decode($resp);
	foreach ( $respArr as $key => $value ){
		echo "$key=". $value."<br />";
	}
}

//Post api call
function reqPost(Array $data, $url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);					//connection timeout 15 
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));	//POST data
	curl_setopt($ch, CURLOPT_POST, true);
	$response = curl_exec($ch);
	curl_close($ch);	 
	return $response;
}
?>