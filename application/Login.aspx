<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="AhutAssist.application.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>用户登录</title>
    <link href="/library/jquery/css/ui-lightness/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" />
    <script src="/library/jquery/js/jquery-1.9.1.js"></script>
    <script src="/library/jquery/js/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="../library/JavaScriptOpt.js"></script>

    <script type="text/javascript">
        window.onload = function () {
            //这么做可以让背景图片在验证码加载之后再加载
            document.getElementById('table_main').style.backgroundImage = 'url(/resource/images/login.png)';
        }
        function ChangeVerificationCode() {
            var count = (new Date()).getSeconds();
            document.getElementById("imageVerificationCode").src = "/ajax/GetVerificationCode.ashx?count=" + count;
        }
        function LoginError(msg) {
            document.getElementById("ErrorMsgContent").innerHTML = msg;
            document.getElementById("ErrorMsg").className = "";
            setTimeout(function () {
                document.getElementById("ErrorMsg").className = "ui-helper-hidden";
            }, 5000);
        }
        function LoginWait(msg) {
            document.getElementById("ErrorMsgContent").innerHTML = msg;
            document.getElementById("ErrorMsg").className = "";
        }

        function LoginKeyCheck(e) {
            var keynum = 0;
            if (window.event) // IE
            {
                keynum = e.keyCode
            }
            else if (e.which) // Netscape/Firefox/Opera
            {
                keynum = e.which
            }
            if (keynum.toString() == "13") {
                document.getElementById("buttonLogin").click();
            }
        }
        function Reset() {
            document.getElementById("textBoxUserCode").value = "";
            document.getElementById("textBoxPassword").value = "";
            document.getElementById("textBoxVerificationCode").value = "";
        }
    </script>

    <style type="text/css">
        #TableContent {
            width: 100%;
            height: 100%;
        }

        #textBoxUserCode {
            position: relative;
            left: 680px;
            top: 306px;
            width: 165px;
        }

        #textBoxPassword {
            position: relative;
            left: 680px;
            top: 313px;
            width: 165px;
        }

        #textBoxVerificationCode {
            position: relative;
            left: 680px;
            top: 320px;
            width: 60px;
        }

        #imageVerificationCode {
            position: relative;
            left: 680px;
            top: 324px;
            width: 100px;
            height: 30px;
        }

        #LinkButtonChangeVerificationCode {
            position: relative;
            left: 680px;
            top: 320px;
            font-size: 12px;
            color: Blue;
            width: 40px;
            cursor: pointer;
        }

        #buttonLogin {
            position: relative;
            left: 680px;
            top: 334px;
            cursor: pointer;
        }

        #buttonReset {
            position: relative;
            left: 700px;
            top: 334px;
            cursor: pointer;
        }
    </style>

</head>
<body onkeypress="LoginKeyCheck(event);">
    <form id="form1" runat="server">
        <div id="ErrorMsg" class="ui-helper-hidden" style="position: absolute; width: 100%;">
            <div style="margin: 0 auto; width: 300px; text-align: center;">
                <div class="ui-widget" style="margin-top: 0px;">
                    <div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;">
                        <p>
                            <span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>
                            <strong style="font-size: 13px;">提示:</strong><span style="font-size: 13px;" id="ErrorMsgContent"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <table id="table_main" style="width: 1263px; height: 665px; margin: 0 auto; vertical-align: top;">
            <tr style="vertical-align: top;">
                <td style="vertical-align: top;">
                    <table id="TableContent" style="vertical-align: top;">
                        <tr style="vertical-align: top;">
                            <td style="vertical-align: top;">
                                <asp:TextBox ID="textBoxUserCode" runat="server"></asp:TextBox><br />
                                <asp:TextBox ID="textBoxPassword" AutoCompleteType="None" TextMode="Password" MaxLength="20" runat="server"></asp:TextBox><br />
                                <asp:TextBox ID="textBoxVerificationCode" AutoCompleteType="None" runat="server"></asp:TextBox>
                                <img id="imageVerificationCode" style="width: 50px; height: 20px;" alt="----" src="/ajax/GetVerificationCode.ashx?count=1" />
                                <a id="LinkButtonChangeVerificationCode" href="javascript:ChangeVerificationCode();" style="font-size: 13px; width: 40px; height: 15px;">更换</a><br />
                                <asp:Button ID="buttonLogin" runat="server" Text="登陆" OnClick="buttonLogin_Click" />
                                <%--<input type="button" id="buttonLogin" value="登 录" onclick="Login();" />--%>
                                <input type="button" id="buttonReset" value="重 置" onclick="Reset();" /><br />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div style="width: 1263px; height: 20px; margin: 0 auto; font-size: 12px; text-align: center; margin-top: -130px;">
            <span>为了更好的用户体验,建议您使用浏览器：IE8+、火狐、Google Chrome、Opera、Safari；屏幕分辨率：1366*768+</span>
        </div>
    </form>
</body>
</html>

