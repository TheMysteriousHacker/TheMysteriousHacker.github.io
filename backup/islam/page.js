var newScript = document.createElement('script');
newScript.type = 'text/javascript';
if(screen.height < screen.width) {
	newScript.src = '../../page1.js';
}
else{
	newScript.src = '../../page2.js';
}
document.getElementsByTagName('head')[0].appendChild(newScript);