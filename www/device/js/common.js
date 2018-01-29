function wt_str_to_date_time(str)
{ 
	return new Date(Date.parse(str.replace(/-/g, "/")));  
} 

function wt_date_time_add_second(start_time,sec) {
	return new Date(start_time.getTime()+sec*1000);
}

function wt_format_date_time(now)
{ 
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day + " ";
   
    if(hh < 10)
        clock += "0";
       
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    
    clock += mm + ":";
    
    if (ss < 10) clock += '0'; 
    clock += ss; 
    
    return(clock); 
} 

function wt_current_date_time()
{ 
	return wt_format_date_time(new Date());
} 

function wt_current_date()
{ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day;
    
    return(clock); 
} 
function wt_current_time()
{ 
    var now = new Date();
   
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
   
    var clock = "";
   
     
    if(hh < 10)
        clock += "0";
       
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    
    clock += mm + ":";
    //clock += mm; 
    
    if (ss < 10) clock += '0'; 
    clock += ss; 
    
    return(clock); 
} 


function wt_current_time2()
{ 
    var now = new Date();
   
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();          //秒
    var ms = now.getMilliseconds();     //毫秒
   
    var clock = "";
   
     
    if(hh < 10)
        clock += "0";
       
    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    
    clock += mm + ":";
    //clock += mm; 
    
    if (ss < 10) clock += '0'; 
    clock += ss+"."; 
    
    if(ms<100){
    	clock += '0'; 
    } 
    if(ms<10){
    	clock += '0'; 
    } 
    clock += ms; 
    return(clock); 
} 

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = (d + Math.random()*16)%16 | 0;
	  d = Math.floor(d/16);
	  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
	};