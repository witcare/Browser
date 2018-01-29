
function getLineRoleID() {
    return getCookie("jitmes.user.LineRoleID");
}
function setLineRoleID(role) {
    setCookie("jitmes.user.LineRoleID", role);
}
function getLineMenu() {
     var menulist=getCookie("jitmes.user.LineMenu");
     return JSON.parse(menulist);
}
function setLineMenu(url) {
    setCookie("jitmes.user.LineMenu", url);
}
function setPlatform(p) {
	setCookie("jitmes.platform", p);
}
function getPlatform() {
	getCookie("jitmes.platform");
}
//人员ID
function getUserId() {
	return getCookie("jitmes.user.UID");
}
function setUserId(uid) {
	setCookie("jitmes.user.UID", uid);
}
//人员姓名
function getUserName() {
	return getCookie("jitmes.user.NAME");
}
function setUserName(name) {
	setCookie("jitmes.user.NAME", name);
}
//人员编号
function getUserNO() {
    return getCookie("jitmes.user.NO");
}
function setUserNO(no) {
    setCookie("jitmes.user.NO", no);
}
function setUserCid(cid) {
    setCookie("jitmes.user.CID", cid);
}
function getUserCid() {
    return getCookie("jitmes.user.CID");
}
function setCurrentWk(no) {
    setCookie("jitmes.user.WK", no);
}

function getCurrentWk() {
    return getCookie("jitmes.user.WK");
}
function setUserProcedure(no) {
    setCookie("jitmes.user.Procedure", no);
}

function getUserProcedure() {
    return getCookie("jitmes.user.Procedure");
}
function setProductLine(no) {
    setCookie("jitmes.user.ProductLine", no);
}

function getProductLine() {
    return getCookie("jitmes.user.ProductLine");
}

function setWorkCenter(workCenter) {
    setCookie("jitmes.user.WORKCENTER", workCenter);
}
function getWorkCenter() {
    return getCookie("jitmes.user.WORKCENTER");
}
//当前用户所在工位
function getUserProcess() {
	return getCookie("jitmes.user.PROCESS");
}
function setUserProcess(processCode) {
	setCookie("jitmes.user.PROCESS", processCode);
}
function getUserProcessID() {
    return getCookie("jitmes.user.PROCESSID");
}
function setUserProcessID(processId){
    setCookie("jitmes.user.PROCESSID", processId);
    //记录设备的登录用户
    updateDeviceHoldUser(processId);
}
function getUserProcessList() {
      var pliststr=getCookie("jitmes.user.PROCESS_LIST");
      if(empty(pliststr)) {
          return false;   
      } else {
         return JSON.parse(pliststr);
      }
}
function setUserProcessList(ProcessList) {
    setCookie("jitmes.user.PROCESS_LIST", ProcessList);
}

function updateDeviceHoldUser(deviceId) {
    var userId = getUserId();
    var url = getApiServerUrl() + "/api/System/Device/UpdateHoldUser";
    $.ajax({
        type: 'get',
        url: url,
        dataType: "JSON",
        data: {
            "id": deviceId,
            "holdUserId": userId 
        },
        success: function (obj) {
            if (obj.IsSuccessful) {
                return true;
            }
            return false;
        }
    });
}