<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="translate.aspx.cs" Inherits="AhutAssist.application.BaseInfo.CourseStu.translate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>跳转页面</title>



</head>
<body>
    <form id="form1" runat="server">
        <div style="text-align: center; padding-top: 50px; padding-left: 15%; padding-right: 15%; width: 70%;">

            <asp:Panel ID="panelProtocol" Width="100%" HorizontalAlign="Center" runat="server">
            </asp:Panel>

        </div>
        <div style="padding-top: 5px; padding-left: 48%">

            <asp:Button ID="ButtonOK" runat="server" Width="80px" Height="40px" OnClick="ButtonOK_Click" Text="我同意" Visible="false" />

        </div>
    </form>
</body>
</html>
