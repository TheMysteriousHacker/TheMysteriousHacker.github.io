var newScript = document.createElement('script');
newScript.type = 'text/javascript';
var newCSS = document.createElement('link');
newCSS.type = 'text/css';
newCSS.rel = 'stylesheet';
var bodyID = document.getElementsByTagName('body')[0].id;
if (screen.height < screen.width){
	if (bodyID == 'body1'){
		newScript.src = '../desktop.js';
		$("head").append('<link rel="stylesheet" type="text/css" href="../formatmain.css"></link>');
	}
	else{
		newScript.src = '../../desktop.js';
		$("head").append('<link rel="stylesheet" type="text/css" href="../../formatmain.css"></link>');
	}
}
else{
	if (bodyID == 'body1'){
		newScript.src = '../phone.js';
		$("head").append('<link rel="stylesheet" type="text/css" href="../formatmain2.css"></link>');
	}
	else{
		newScript.src = '../../phone.js';
		$("head").append('<link rel="stylesheet" type="text/css" href="../../formatmain2.css"></link>');
	}
}
document.getElementsByTagName('head')[0].appendChild(newScript);