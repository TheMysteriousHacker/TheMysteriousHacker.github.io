$("head").append("<Link href=\"../../page2.css\" type=\"text/css\" rel=\"stylesheet\">");
$("head").append('<link href="../../background/logo.png" rel="icon">');
$("head").append("<meta content=\"width=device-width, initial-scale=1\">");
$("head").append("<Link href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\">");
$("#content").prepend('<div class="BorderMT"></div>');
$("#content").append('<div class="BorderMT"></div>');
$("#content").after('<div id="footer"></div>');
$("#footer").append("<p id=\"footerp\"></p>");
$("#body").prepend('\
	<header id="header">\
		<div id="leftB" class="sideB">&lt;--</div>\
		<div id="rightB" class="sideB">--&gt;</div>\
	</header>\
	<div id="aside">\
		<div id="selectionText">Subchapter:</div>\
		<div id="selection" onclick="selectionClicked()">\
			<div id="first"></div>\
		</div>\
		<div id="optionsContainer"></div>\
	</div>\
	<div id="skipTop"><a href="#header"><i class="fa fa-chevron-up"></i></a></div>\
');

var headWidth;
var bodyWidth;
var halfHead;
var headerPos;
function buttonSet(){
	headWidth = document.getElementById("header").scrollWidth;
	bodyWidth = document.getElementById("body").scrollWidth;
	if ((headWidth == bodyWidth)){
		$(".sideB").css("display","none");
	}
	else{
		function innerButtonFunc(){
			$(".sideB").css("display","block");
			headerPos = $("#header").scrollLeft();
			if (headerPos < bodyWidth+1000){
				$("#leftB").css("display","none");
			}
			else{
				if (headerPos > (headWidth-bodyWidth-1000)){
					$("#rightB").css("display","none");
				}
			}
			document.cookie = 'scroll='+headerPos;
		}
		$("#rightB").on("click",function(){$("#header").scrollLeft(headWidth-bodyWidth);innerButtonFunc()});
		$("#leftB").on("click",function(){$("#header").scrollLeft(0);innerButtonFunc()});
		innerButtonFunc();
		$("#header").on('scroll',innerButtonFunc);
	}
}

var verseCounter;
var verseArray;
var fileURL = window.location.href;
var fileLoc = fileURL.slice(0,fileURL.lastIndexOf("/"));
var islamFile = fileLoc.slice(0,fileLoc.indexOf("/islam/")+7);
var islamFile2 = fileLoc.slice(fileLoc.indexOf("/islam/")+6);
var surahFile =  islamFile + "surah";
var totalVerses;
var curVerse;
var surahNo;
var verseNum;
var tempText;
var startV;
var lastV;
var tempV;
var addText;
var MulverseEl;
var verseEl;
function addVerses(verseCounter){
	if (verseCounter < totalVerses){
		verseEl = $($(".arabic[verse]")[verseCounter]);
		curVerse = (verseEl.attr("verse"));
		if(verseEl.text() == ""){
			surahNo = curVerse.slice(0,curVerse.indexOf(":"));
			verseNum = curVerse.slice(curVerse.indexOf(":")+1,curVerse.length);
			$.ajax({
				url: surahFile + "/" + "surah_" + surahNo + ".json",
				success:function(data){
					if (verseNum.indexOf("-") == -1){
						tempText = (data.verse["verse_" + verseNum]).replace(/۞ /g,"");
						verseEl.html('<span class="arabicText">' + tempText + '&#1757; <span>' + curVerse + '</span></span>');
					}
					else{
						addText = "";
						startV = verseNum.slice(0, verseNum.indexOf("-"));
						lastV = verseNum.slice(verseNum.indexOf("-") + 1, verseNum.length);
						MulverseEl = verseEl.html('<span class="arabicText"></span>');
						for(tempV = startV; tempV <= lastV; tempV++){
							tempText = (data.verse["verse_" + tempV]).replace(/۞ /g,"");
							addText += (tempText + '&#1757; ');
						}
						$(MulverseEl.children()[0]).html(addText + ' <span>' + curVerse + '</span>');
					}
					addVerses(verseCounter + 1);
				}
			})
		}
		else{
			tempText = verseEl.text().replace(/,/g,'&#1757;');
			verseEl.html('<span class="arabicText">' + tempText + '&#1757; <span>' + curVerse + '</span></span>');
			addVerses(verseCounter + 1);
		}
	}
	else{
		setmtH(855);
	}
}

var supText;
var containsArabic;
function textFormat(settimer){
	$("#maintext p:not(.arabic),h3").each(function(){
		tempText = $(this).html();
		tempText = tempText.replace(/pbuh/ig,'<span style="font-size:30px;vertical-align:bottom">&#xFDFA</span>')
		$(this).html(tempText);
	})
	$("#reference").before("<h4>Footnotes:</h4>");
	$("h4").before("<div id='line'></div>");
	$("li span").siblings("span").not("span:first-child").before("<br style='margin-top:5px;display:block;content:\"  \"'/>");
	supText = document.getElementsByTagName("sup");
	for (var k = 0;k < supText.length;k++){
		add = document.createElement("a");
		add.href = "#line";
		add.appendChild(document.createTextNode(k+1))
		supText[k].appendChild(add);
	}
	totalVerses = $(".arabic[verse]").length;
	if(totalVerses > 0){
		addVerses(0);
	}
	else{
		setmtH(settimer);
	}
}

var mtHeight;
var currentH;
var delay;
var currentmtH;
var canResize = true;
var resizeAgain = false;
function setmtH(delay){
	canResize = false;
	mtHeight = $("#maintext").css('height','auto').height() + 20;
	if ((delay == 855) || (delay == 600)){
		$("#maintext").css('height',"0px");
	}
	else{
		$("#maintext").css('height',currentmtH);
	}
	$("#maintext").animate({height:mtHeight + "px"},delay,function(){
		canClick = true;
		currentmtH = mtHeight;
		$("body").css("padding-bottom",$("#footer").outerHeight()+50);
		if (resizeAgain == true){
			resizeAgain = false;
			setmtH(100);
		}
		canResize = true;
	});
}

function selectionClicked(){
	$("#optionsContainer").toggle();
}

var chapSelected = '';
var canClick = true;
var PButton = "";
var CButton;
var PSelection;
var BText = "";
var topic;
var chapList = [];
var chapExist;
var timerToZero;
var filesList;
function buttonClicked(event){
	CButton = $(this).attr("id");
	PSelection = "";
	if ((canClick == true) && (PButton != CButton)){
		canClick = false;
		canResize = false;
		chapExist = false;
		timerToZero = 200;
		$(".ImageButton").css({"borderStyle":"ridge","cursor":"pointer"});
		event.target.style.borderStyle = "groove";
		event.target.style.cursor = "default";
		$("#optionsContainer").hide().empty();
		$("#first").text("|");
		chapSelected = this.id.substring(9,this.id.length);
		topic = chapList[chapSelected-1];
		$("#maintext").animate({height:"0px"},550,function(){
			$("#maintext").empty();
			for (var i = 1; i <= (topic.length); i++){
				BText = topic[i-1];
				$("#optionsContainer").append("<div class='options' onclick='optionClicked(" + i + ")' id='option" + i + "'>" + BText +"</div>");
			}
			$.ajax({
				url:("../../page.php?ref=" + islamFile2 + "&chpt=" + chapSelected),
				method:"get",
				success:function(data){
					if (data.indexOf("introExists") == -1){
						canClick = true;
						canResize = true;
						if (topic.length > 0){
							$("#aside").slideDown(800);
						}
					}
					else{
						data = data.replace("introExists","");
						$("#maintext").load(fileLoc + "/chpt" + chapSelected + "/0.html",function(){
							$("#maintext").ready(function(){
								setTimeout(function(){
									textFormat(855);
									if (topic.length > 0){
										$("#aside").slideDown(800);
									}
									timerToZero = 850;							
								},100)
							})
						});
					}
					if (data != "no"){
						filesList = (JSON.parse(data));
						chapExist = true;
					}
					else{
						$("#maintext").html("<p id='construction'>page is under construction</p>");
						setmtH(600);
					}
				}
			})
		});
		PButton = CButton; 
	}
}

window.onresize = function(){
					if (canResize == true){
						setmtH(800);
					}
					else{
						resizeAgain = true;
					}
				  };

var input;
var subChapNum;
function optionClicked(subChapNum){
	$("#first").text($("#option" + subChapNum).text());
	$("#optionsContainer").hide();
	CSelection = (chapSelected + " " + subChapNum);
	if(canClick == true){
		if(PSelection != CSelection){
			canClick = false;
			canResize = false;
			$("#maintext").animate({height:"0px"},
									timerToZero,
									function(){
										$("#maintext").html("<p id='construction'>page is under construction</p>");
										if (chapExist == true){
											if (filesList.indexOf(subChapNum + ".html") != -1){
												fileChosen = fileLoc + "/chpt" + chapSelected + "/" + subChapNum + ".html";
												$.ajax({
													dataType: "html",
													url: fileChosen,
													success: function(){
														$("#maintext").load(fileChosen + "?randNum=" + Math.random(),function(){
															setTimeout(function(){
																textFormat(855);
															},200);																
														});
													}
												})
											}
											else{
												setmtH(600);
											}
										}
										else{
											setmtH(600);
										}
									})
		}
		PSelection = CSelection;
		timerToZero = 850;
	}
}

var footerarray = [["Back To Home Page","../../summary.html"],["Contact Us","../../problem.html"]];
for (var j = 0; j < footerarray.length; j++){
	$("#footerp").append("<a href='"+ footerarray[j][1] + "' id='footera" + j + "' target='_blank'>" +footerarray[j][0]+"</a>");
}

var myContent;
var xhttp;
var x;
var myCounter = 1;
var doc;
var footerp;
xhttp =  new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		myContent = JSON.parse(this.responseText);
		for(x in myContent){
			if (x != "SOURCE"){
				$("#header").append("<button class='ImageButton' id='ButtonNum" + (myCounter) + "'>" + x.replace(/_/g, " ") + "</button>")
				$($("#header").children()[myCounter+1]).on("click",buttonClicked);
				chapList.push(myContent[x]);
				myCounter++;
			}
			else{
				footerp = $("#footerp");
				footerp.css('grid-template-columns', '32% 32% 32%');
				footerp.append("<a href='"+ myContent["SOURCE"][0] + "' id='footera" + $("#footerp a").length+1 + "' target='_blank'>the source for this book</a>");
			}
		}
		$("#header").append('<div style="font-size:1px">&nbsp;</div>');
		$(document).ready(function(){
			$("body").css({"visibility":"visible","padding-bottom":$("#footer").outerHeight(true)});
			cookie = document.cookie;
			scrollNum = cookie.indexOf('scroll');
			if (scrollNum != -1){
				$("#header").scrollLeft(cookie.substring(scrollNum+7,cookie.indexOf(";")));
			}
			else{
				document.cookie = "scroll=0";
			}
			doc = $(document);
			(doc).scroll(function(){
				if (doc.scrollTop() > 1000){
					$("#skipTop").css('display','block');
				}
				else{
					$("#skipTop").css('display',"none");
				}
			});
		});
		$("#header").ready(function(){
			buttonSet();
		})
	}
};
xhttp.open("GET", fileLoc + "/content.json", true);
xhttp.send();