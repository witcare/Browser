function contains(a, key) {
    for (var i = 0; i < a.length; i++) {
        // alert("a[i]:"+ a[i] +" key:"+ key);
        if (a[i] == key) {
            return true;
        }
    }
    return false;
}

function loadUrl(url, name, value) {
    // navigator.app.loadUrl("file:///android_asset/www/"+url);
    // navigator.app.loadUrl(url);
    // window.location.href=url;
    if (!empty(name)) {
        setCookie(name, value);
    }
    window.location = url;
}

function openUrl(url) {
    // alert("openUrl("+url+")");
    window.location = url;
}

function setCookie(c_name, c_value) {
    window.localStorage.setItem(c_name, c_value);
}

function getCookie(c_name) {
    var val = window.localStorage.getItem(c_name);
    if (empty(val)) {
        val = "";
    }
    return val;
}
function clsCookie(c_name) {
    try {
        window.localStorage.removeItem(c_name);
    } catch (err) {
        // 在此处理错误
    }
}

function clsAllCookie(b_name) {
    try {
        var storage = window.localStorage;
        for (var i = 0; i < storage.length; i++) {
            var k = storage.key(i);
            if (startsWith(k, b_name)) {
                // alert("clsAllCookie:" + k);
                clsCookie(k);
            }
        }
    } catch (err) {
        // 在此处理错误
    }
}

function startsWith(s, b) {
    return s.indexOf(b) == 0;
}

function empty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (trim(v).length == 0)
                return true;
            break;
        case 'boolean':
            if (!v)
                return true;
            break;
        case 'number':
            if (0 === v)
                return true;
            break;
        case 'object':
            if (null === v)
                return true;
            if (undefined !== v.length && v.length == 0)
                return true;
            for (var k in v) {
                return false;
            }
            return true;
            break;
    }
    return false;
}

function trim(str) {
    for (var i = 0; i < str.length && str.charAt(i) == "  "; i++)
        ;
    for (var j = str.length; j > 0 && str.charAt(j - 1) == "  "; j--)
        ;
    if (i > j)
        return "";
    return str.substring(i, j);
}

function stringToJson(stringValue) {
    eval("var theJsonValue = " + stringValue);
    return theJsonValue;
}

function showLoading() {

    $('#waitingId').modal('show');
    //$.mobile.showPageLoadingMsg("e", txt);
    //navigator.notification.activityStart("","");
    //$.mobile.loading('show');
    /**
     $.mobile.loading('show', {
     text : txt,
     textVisible : true,
     theme : 'z',
     html : ""
     });
     **/
}

function hideLoading() {
    $('#waitingId').modal('hide');
    //$.mobile.loading('hide');
    //navigator.notification.activityStop();
    //$.mobile.hidePageLoadingMsg();

}

function openWebUrl(url) {
    navigator.notification.confirm(
            '请确认是否打开网页链接[' + url + ']?', // message
            function (button) {
                // if press 'Yes'
                if (button === 1) {
                    window.open(url, '_blank', 'location=no');
                }
            }, // callback function
            '系统提示', // title
            '是,否'                           // confirm 选项，用逗号隔开
            );

}


function scan() {
    // alert("scan");
    BarcodeScanner.scan({
        success: function (result) {
            // alert(result);
            loadUrl("txtView.html", "tmp_scan_data", result);
        },
        failure: function (err) {
            // alert(err);
        }
    });
}

function exitFromApp() {
    navigator.notification.confirm(
            '确定要退出程序吗?', // message
            onConfirm, // callback function
            '系统提示', // title
            '是,否'                           // confirm 选项，用逗号隔开
            );
}

function onConfirm(button) {
    // if press 'Yes'
    if (button === 1) {
        navigator.app.exitApp();
    }
}

function alertMessage(msg) {
    navigator.notification.alert(msg, function () {
    }, "提示信息", "确定");
}
function strtoarray(data) {
    if (empty(data)) {
        return new Array();
    } else {
        return data.split(',');
    }
}
function arraytostr(data) {
    var str = "";
    for (var i = 0; i < data.length; i++) {
        // alert("a[i]:"+ a[i] +" key:"+ key);
        if (str == "") {
            str = data[i];
        } else {
            str = str + "," + data[i];
        }
    }
}

function logout() {
    var txt = "是否退出当前账户？";
    var option = {
        title: "提示",
        btn: parseInt("0011", 2),
        onOk: function () {
            setUserId("");
            openUrl("login.html");
        }
    }
    window.wxc.xcConfirm(txt, "custom", option);
}

function isOnline() {
    var img = new Image();
    img.id = "test_is_online";
    img.onload = function () {
        document.body.removeChild(
                document.getElementById("test_is_online"));
    };
    img.onerror = function () {
        document.body.removeChild(
                document.getElementById("test_is_online"));
        alert("请检查网络连接....");
    };
    img.src = "http://www.baidu.com/img/baidu_jgylogo3.gif";
    img.style.display = "none";
    document.body.appendChild(img);
}

function checkAppVersion() {
    //alert("checkAppVersion()");
    UpdatePlugin.checkVesion(getServerUrl() + "/chkupdate", "wms.js", "wms.apk", function (data) {
    }, function (reason) {
    });
}

function quickCheckAppVersion() {
    //alert("checkAppVersion()");
    UpdatePlugin.quitCheckVesion(getServerUrl() + "/chkupdate", "wms.js", "wms.apk", function (data) {
    }, function (reason) {
    });
}

function autoCheckAppVersion() {
    var img = new Image();
    img.id = "test_is_online";
    img.onload = function () {
        document.body.removeChild(
                document.getElementById("test_is_online"));
        quickCheckAppVersion();
    };
    img.onerror = function () {
        document.body.removeChild(
                document.getElementById("test_is_online"));
        alert("请检查网络连接....");
    };
    img.src = "http://www.baidu.com/img/baidu_jgylogo3.gif";
    img.style.display = "none";
    document.body.appendChild(img);
}

function isNumber(oNum) {
    if (!oNum)
        return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum))
        return false;
    try {
        if (parseFloat(oNum) != oNum)
            return false;
    }
    catch (ex) {
        return false;
    }
    return true;
}
function LoadJS(id, fileUrl) {
    var scriptTag = document.getElementById(id);
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");

    if (scriptTag)
        oHead.removeChild(scriptTag);

    oScript.id = id;
    oScript.type = "text/javascript";
    oScript.src = fileUrl;
    oHead.appendChild(oScript);
}


function paramInit() {
    var request;
    var url = location.search;
    request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);  //去掉?号
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return request;
};


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function RedirectPage() {
    var role = getLineRoleID();
    var strs = role.split(","); //字符分割 
    if (strs.length > 1) {
        openUrl("index.html");
    } else if (strs.length == 1) {
        var userRole = strs[0];
        //底盘投产人员，电动底盘投产人员
        if (userRole == "102038886A5F4F5890476135964D6DAB" || userRole == "102038886A5F4F5890476135964D6DA1") {
            openUrl("kitting.html");
            //底盘一般人员
        } else if (userRole == "9C405D3379124BF2875473D60C05423F") {
            openUrl("carinfo.html");
        }
            //调试接车
        else if (userRole == "B7D5F71A9B7D4933ADF7E62743FA01AF") {
            openUrl("todoreceive.html");
        }
            //入库人员
        else if (userRole == "94D90B43BBF6460FBDC22EFD7BDD20D1") {
            openUrl("return.html");
        }
            //调试一般人员
        else if (userRole == "5D7A4706DED9430C8787FB37B6534F3A") {
            openUrl("edittsprocess.html");
        } //总装，电动底盘，品管,管理员
        else //(userRole == "CA752688599145EE9CC9BF44C0C18DB8"||userRole == "CA752688599145EE9CC9BF44C0C18DB7"||userRole == "CA752688599145EE9CC9BF44C0C18DB6"||userRole == "60879BA196604452B35721283C29CC59") {
        {
            openUrl("index.html");
        }
        //

    } else {
        alert("用户未配置操作权限");
        openUrl("login.html");
    }
}

//判断是否为刷卡
function IsRFIDCode(code) {
    var ret =false;
    if(!empty(code)) {
        //if (isNumber(code) && code.length === 10) {
        //    ret = true;
        //}
        ret = true;
    }
    return ret; 
}

function KeyPress(obj, objClick) {
    obj.bind('keyup', function (a) {
        var ev = document.all ? window.event : a;
        if (ev.keyCode === 13) {
            objClick.click();
        }
    }).bind('keydown', function (a) {
        var ev = document.all ? window.event : a;
        if (ev.keyCode === 13) {
            return false;
        }
    });
}
function QueryInit(obj, objClick) {
    obj.focus(function () {
        obj.css("background-color", "#FFFFCC");
    });
   obj.focus();
    if (!empty(obj.val())) {
        objClick.click();
    }
    //回车搜索事件
    KeyPress(obj, objClick);
}

//$("#queryWoNo").bind('keyup', function (a) {
//    var ev = document.all ? window.event : a;
//    if (ev.keyCode === 13) {
//        $("#Query").click();
//    }
//}).bind('keydown', function (a) {
//    var ev = document.all ? window.event : a;
//    if (ev.keyCode === 13) {
//        return false;
//    }
//});

var option = {
    title: "提示",
    btn: parseInt("0001", 2),
    onOk: function () {
        window.location.reload();
    }
}
function getDate() {
    var myDate = new Date(); //得到时间对象

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getWeekDate() {
    var myDate = new Date(new Date().getTime() + 6 * 24 * 3600 * 1000);

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d; //串联字符串用于输入
}
function getTime() {
    var myDate = new Date(); //得到时间对象

    var y1 = myDate.getFullYear(); //获取年

    var m = myDate.getMonth() + 1; //获取月

    m = m > 9 ? m : "0" + m; //如果月份小于10,则在前面加0补充为两位数字

    var d = myDate.getDate(); //获取日

    d = d > 9 ? d : "0" + d; //如果天数小于10,则在前面加0补充为两位数字

    var h = myDate.getHours(); //获取小时

    h = h > 9 ? h : "0" + h; //如果小时数字小于10,则在前面加0补充为两位数字

    var M = myDate.getMinutes(); //获取分

    M = M > 9 ? M : "0" + M; //如果分钟小于10,则在前面加0补充为两位数字

    var s = myDate.getSeconds(); //获取秒

    s = s > 9 ? s : "0" + s; //如果秒数小于10,则在前面加0补充为两位数字

    return y1 + "-" + m + "-" + d + " " + h + ":" + M; //串联字符串用于输入
}
function getServerUrl() {
    var url = getCookie("JITMES.ServerUrl");
    if (empty(url)) {
        url = "http://api.jitmes.com/api";
    }
    return url;
}

function setServerUrl(url) {
    setCookie("JITMES.ServerUrl", url);
}


function getDeviceCode() {
    var code = getCookie("JITMES.DeviceCode");
    if (empty(code)) {
        code = "00";
    }
    return code;
}

function setDeviceCode(Code) {
    setCookie("JITMES.DeviceCode", Code);
}
function getMenuHtml() {
    var code = getCookie("JITMES.MenuHtml");
    return code;
}

function setMenuHtml(Code) {
    setCookie("JITMES.MenuHtml", Code);
}

function getUserNo() {
    var code = getCookie("JITMES.UserNo");
    if (empty(code)) {
        code = "00";
    }
    return code;
}

function setUserNo(Code) {
    setCookie("JITMES.UserNo", Code);
}
function getCid() {
    return "88888886";
}