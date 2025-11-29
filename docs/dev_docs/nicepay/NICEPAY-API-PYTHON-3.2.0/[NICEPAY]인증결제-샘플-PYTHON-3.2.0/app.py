from flask import Flask, render_template, request
from datetime import datetime
import hashlib, requests, sys, json
from base64 import b64encode, b64decode
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes

app = Flask(__name__)

def getSignData(str):
    encoded_str = str.encode()
    EncryptData = hashlib.sha256(encoded_str).hexdigest()
    return EncryptData

def getEdiDate():
    YYYYmmddHHMMSS = datetime.today().strftime("%Y%m%d%H%M%S")
    return str(YYYYmmddHHMMSS)

def authRequest(url, data):
    headers = {
        'Content-type' : 'application/x-www-form-urlencoded', 'charset': 'euc-kr'
    }
    
    response = requests.post(
        url=url,
        data=data, 
        headers=headers
    )

    resDict = json.loads(response.text)
    print(resDict)

    return resDict

##Req variables
Amt         = "1004"                          # 결제상품금액
BuyerEmail  = "happy@day.co.kr"               # 구매자메일주소
BuyerName   = "나이스"                     # 구매자명 
BuyerTel    = "01000000000"                   # 구매자연락처 
EdiDate     = getEdiDate()                    # 거래 날짜   
GoodsName   = "상품"                       # 결제상품명
MerchantKey = "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==" #상점키
MID         = "nicepay00m"                    # 상점아이디
Moid        = "mnoid1234567890"               # 상품주문번호  
CancelPwd   = "123456"                        # 취소비밀번호       
ReturnURL   = "http://localhost:5000/authReq" # Mobile only

@app.route('/payment')
def reqPc():
    return render_template(
        'payRequest.html',
        MID=MID,
        Amt=Amt,
        GoodsName=GoodsName,
        BuyerEmail=BuyerEmail,
        BuyerName=BuyerName,
        BuyerTel=BuyerTel,
        Moid=Moid,
        EdiDate=EdiDate,
        EncryptData=getSignData(EdiDate + MID + Amt + MerchantKey),
        returnURL=ReturnURL
    )

@app.route('/cancel')
def reqCancel():
    return render_template(
        'cancelRequest.html',
        title="hello world"
    )

@app.route('/authReq', methods=['POST'])
def getReq():
    AuthResultCode=request.form['AuthResultCode']
    AuthResultMsg=request.form['AuthResultMsg']
    TxTid=request.form['TxTid']
    AuthToken=request.form['AuthToken']
    PayMethod=request.form['PayMethod']
    MID=request.form['MID']
    Moid=request.form['Moid']
    Amt=request.form['Amt']
    ReqReserved=request.form['ReqReserved']
    NextAppURL=request.form['NextAppURL'] #승인 API URL
    NetCancelURL=request.form['NetCancelURL'] #API 응답이 없는 경우 망취소 API 호출
#    authSignature=request.form['Signature'] #Nicepay에서 내려준 응답값의 무결성 검증 Data
#    #인증 응답 Signature = hex(sha256(AuthToken + MID + Amt + MerchantKey))indentation
#    authComparisonSignature = getSignData(request.form['AuthToken'] + request.form['MID'] + request.form['Amt'] + MerchantKey)
    EdiDate=getEdiDate()
    SignData=getSignData(AuthToken + MID + Amt + EdiDate + MerchantKey)

    data = {
        'TID': TxTid,
        'AuthToken': AuthToken,
        'Amt': Amt,
        'MID': MID,
        'SignData': SignData,
        'EdiDate': EdiDate   
    }
    
#    #인증 응답으로 받은 Signature 검증을 통해 무결성 검증을 진행하여야 합니다.
#    if(authSignature == authComparisonSignature):
#        resDict = authRequest(NextAppURL, data)
#    else:
#        print("authSignature : " + authSignature)
#        print("authComparisonSignature : " + authComparisonSignature)
	
    #AuthResultCode가 0000인경우 승인 API 호출
    resDict = authRequest(NextAppURL, data)

#    Signature = resDict['Signature']
#    #가맹점은 승인응답으로 전달된 TID, Amt 값을 활용하여 위변조 대조 해쉬값을 생성하여 전달받은 Signature 값과 대조를 진행합니다. 대조가 일치할 경우 정상승인을 진행합니다.
#    paySignature = getSignData(resDict['TID'] + resDict['MID'] + resDict['Amt'] + MerchantKey)
#    if(Signature == paySignature):
#        print("Signature : " + Signature)
#        return render_template(
#            'result.html',
#            result=resDict
#        )
#    else:
#        print("Signature : " + Signature)
#        print("paySignature : " + paySignature)
    	
    return render_template(
        'result.html',
        result=resDict
    )  

#Cancel
@app.route('/cancelReq', methods=['POST'])
def cancelReq():   
    TID=request.form['TID']
    CancelAmt=request.form['CancelAmt']
    PartialCancelCode=request.form['PartialCancelCode']
    Moid="test"
    CancelMsgKr="고객요청"
    CancelMsg=CancelMsgKr.encode("euc-kr","ignore") 
    EdiDate=getEdiDate()
    SignData=getSignData(MID + CancelAmt + EdiDate + MerchantKey)

    data = {
        'TID': TID,
        'MID': MID,
        'Moid': Moid,
        'CancelAmt': CancelAmt,
        'CancelMsg': CancelMsg, #취소 메시지 한글 처리하는경우 인코딩 EUC-KR로 요청
        'PartialCancelCode': PartialCancelCode,
        'EdiDate': EdiDate,
        'SignData': SignData
    }
    resDict = authRequest("https://pg-api.nicepay.co.kr/webapi/cancel_process.jsp", data)

#    Signature = resDict['Signature']
#    #취소 응답 시 위변조 대조 해쉬값을 생성하여 전달받은 Signature 값과 대조를 진행합니다. 대조가 일치할 경우 취소를 진행합니다.
#    cancelSignature = getSignData(resDict['TID'] + resDict['MID'] + resDict['CancelAmt'] + MerchantKey)
#    if(Signature == cancelSignature):
#        print("Signature : " + Signature)
#        return render_template(
#            'result.html',
#            result=resDict
#        )
#    else:
#        print("Signature : " + Signature)
#        print("cancelSignature : " + cancelSignature)

    return render_template(
        'result.html',
        result=resDict
    )         

if __name__ == '__main__':
    app.run(debug=True)