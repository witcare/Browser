var process = getUserProcess();
var name = getUserName();
var  procedure= getUserProcedure();
function writePageHeadderIndexWithoutMenu(text) {
    //document.write('   <header class="bg-primary dker nav-bar nav-bar-fixed-top">' 
    //    +'<a href="Index.html" class="btn btn-link pull-left"> <i class="fa fa-home fa-2x"></i></a>'
    //    + '<a href="#" class="nav-brand">' + text + '</a>'
    //    + '<span class="pull-right">&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</span>'
    //    + '<span class="pull-right">' + process + '</span></a>'
    //    + '<a href="#" onclick="logout();" class="btn btn-link pull-right"> <i class="fa fa-times fa-2x"></i></a>'    
    //    + '</header>');
    document.write('   <header class="bg-primary dker nav-bar nav-bar-fixed-top">' +
      '<a href="Index.html" class="btn btn-link pull-left"> <i class="fa fa-home fa-2x"></i></a> <a href="#" class="nav-brand">' + text
      //+ '<span class="pull-right">' + name + '&nbsp;&nbsp;&nbsp;' + process + '</span></a>'
      + '<a href="#" onclick="logout();" class="btn btn-link pull-right"> <i class="fa fa-times fa-2x"></i></a>'
      + '</header>');
}

function writePageHeadderWithoutMenu(text) {
    //document.write('   <header class="bg-primary dker nav-bar nav-bar-fixed-top">' +
    //    '<a href="index.html" class="btn btn-link pull-left"> <i class="fa fa-home fa-2x"></i></a> <a href="#" class="nav-brand">' + text
    //    + '<span class="pull-right">&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</span>'
    //    + '<span class="pull-right">' + procedure + '[' + process + ']</span></a>'
    //    + '</header>');
    document.write('   <header class="bg-primary dker nav-bar nav-bar-fixed-top">' +
       '<a href="index.html" class="btn btn-link pull-left"> <i class="fa fa-home fa-2x"></i></a> <a href="#" class="nav-brand">' + text
       + '<span class="pull-right">&nbsp;&nbsp;&nbsp;&nbsp;' + name + '</span>'
       + '</a>'
       + '</header>');
}


function writePageHeader(t) {
    return "";
    if (empty(t)) {
        t = "智能云车间";
    }
    var strKitting = "";
    if (getUserProcess() == "DP01" || getUserProcess() == "DDDP01") {
        strKitting = '<li><a href="kitting.html"> <i class="fa fa-tag"></i> <span>车辆投产</span></a></li>';
    }
    var strRecovery = "";
    if (getUserProcess() == "TS09") {
        strRecovery = '<li><a href="return.html"> <i class="fa fa-dropbox"></i> <span>交车入库</span></a></li>';
    }
    document.write('<aside class="bg-primary aside-sm" id="nav">'
            + '<section class="vbox">'
            + '<header class="dker nav-bar nav-bar-fixed-top">'
            + '<a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen" data-target="#nav"> <i class="fa fa-bars"></i></a>'
            + '<a href="#" class="nav-brand">智能云车间</a> <a href="index.html" class="btn btn-link visible-xs"> <i class="fa fa-home"></i></a>'
            + '</header>'
            + '<section>'
            + '<!-- nav -->'
            + '<nav class="nav-primary hidden-xs">'
            + '<ul class="nav">'
            + '<li class="active"><a href="index.html"> <i class="fa fa-home"></i> <span>首页</span></a></li>'
            //+ '<li><a href="kitting.html"> <i class="fa fa-tag"></i> <span>车辆投产</span></a></li>'
            + strKitting
            + '<li><a href="editcarinfo.html"> <i class="fa fa-book"></i> <span>基础信息录入</span></a></li>'
            + '<li><a href="writewip.html"> <i class="fa fa-pencil-square-o"></i> <span>制程信息补录</span></a></li>'
            //+ '<li><a href="editcarprocess.html"> <i class="fa fa-pencil-square-o"></i> <span>车辆状态登记</span></a></li>'
            //+ '<li><a href="examine.html"> <i class="fa fa-credit-card"></i> <span>检验卡登记</span></a></li>'
            + '<li><a href="carinfo.html"> <i class="fa fa-search"></i> <span>当前工位车辆</span></a></li>'
            + '<li><a href="othercarinfo.html"> <i class="fa fa-search"></i> <span>其他车辆查询</span></a></li>'
            + '<li><a href="selectprocess.html"> <i class="fa fa-exchange"></i> <span>切换当前工位</span></a></li>'
            + '<li><a href="selectcar.html"> <i class="fa fa-exchange"></i> <span>切换当前车辆</span></a></li>'
            + '<li><a href="chgtag.html"> <i class="fa fa-tags"></i> <span>更换标签</span></a></li>'
            //+ '<li><a href="return.html"> <i class="fa fa-dropbox"></i> <span>交车入库</span></a></li>'
            + strRecovery
            + '<li><a href="#"> <i class="fa fa-cogs"></i> <span>系统设置</span></a></li>'
            + '<li><a href="#" onclick="logout();"> <i class="fa fa-times"></i> <span>注销</span></a></li>'
            + '</ul>'
            + '</nav>'
            + '<!-- / nav -->'
            + '</section>'
            + '</section>'
            + '</aside>');
}

function writePageFooter(t) {
    document.write('<footer id="footer">'
            + '<div class="text-center clearfix">'
            + '<small style="color:#ffffff"><strong>Copyright &copy; 2015~2016 </strong></small>'
            + '</div>'
            + '</footer>');
}