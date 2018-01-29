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

function exitFromApp()
{
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
    UpdatePlugin.checkVesion(getUpdateUrl() + "/chkupdate", "update.js", "witcare.purity.apk", function (data) {
    }, function (reason) {
    });
}

function quickCheckAppVersion() {
    //alert("checkAppVersion()");
    UpdatePlugin.quitCheckVesion(getUpdateUrl() + "/chkupdate", "update.js", "witcare.purity.apk", function (data) {
    }, function (reason) {
    });
}
function getUpdateUrl() {
	var url= getCookie("JITMES.UpdateUrl");
	if(empty(url)) {
		url="http://api.jitmes.com";
	}
	return url;
}

function setUpdateUrl(url) {
	setCookie("JITMES.UpdateUrl", url);
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

function isNumber(oNum)
{
    if (!oNum)
        return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum))
        return false;
    try {
        if (parseFloat(oNum) != oNum)
            return false;
    }
    catch (ex)
    {
        return false;
    }
    return true;
}
function LoadJS(id, fileUrl)
{
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

function getCid()
{
  return "88888886";
}
function getServerUrl() {
	var url= getCookie("JITMES.ServerUrl");
	if(empty(url)) {
		url="http://api.jitmes.com/api";
	}
	return url;
}

function setServerUrl(url) {
	setCookie("JITMES.ServerUrl", url);
}

function getSyncTimeUrl() {
	var url= getCookie("JITMES.SyncTimeUrl");
	if(empty(url)) {
		url="http://api.jitmes.com/api/gettime";
	}
	return url;
}

function setSyncTimeUrl(url) {
	setCookie("JITMES.SyncTimeUrl", url);
}

function getDeviceCode() {
	var code= getCookie("JITMES.DeviceCode");
	if(empty(code)) {
		code="00";
	}
	return code;
}

function setDeviceCode(Code) {
	setCookie("JITMES.DeviceCode", Code);
}


function getMenuHtml() {
	var code= getCookie("JITMES.MenuHtml");
	return code;
}

function setMenuHtml(Code) {
	setCookie("JITMES.MenuHtml", Code);
}

function getUserNo() {
	var code= getCookie("JITMES.UserNo");
	if(empty(code)) {
		code="00";
	}
	return code;
}
	
function setUserNo(Code) {
	setCookie("JITMES.UserNo", Code);
}


function setProductLine(Code) {
    setCookie("JITMES.ProductLine", Code);
}

function getProductLineS() {
    var code = getCookie("JITMES.ProductLine");
    return code;
}