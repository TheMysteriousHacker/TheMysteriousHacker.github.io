var timer;
var timer2;
$("head").append("<Link href=\"../../page1.css\" type=\"text/css\" rel=\"stylesheet\">");
$("head").append('<link href="../../background/logo.png" rel="icon">');
$("head").append("<meta content=\"width=device-width, initial-scale=1\">");
$("head").append("<Link href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\">");
$("#content").prepend('<div class="BorderMT"></div>');
$("#content").prepend('<div id="aside_container"><div id="source_block"><a target="_blank">click here for the source</a></div><div id="aside"><div id="loading-image"></div></div></div>');
$("#content").append('<div class="BorderMT"></div>');
$("#content").after('<div id="footer"></div>');
$("#footer").append("<p id=\"footerp\"></p>");
$("#body").prepend('<header id="header">\
					<div id="leftB" class="sideB" onclick="leftClick()" onmouseenter="timer = setInterval(scrollToLeft,10)" onmouseout="clearInterval(timer)"><i class="fa fa-angle-left"></i></div>\
					<div id="rightB" class="sideB" onclick="rightClick()" onmouseenter="timer2 = setInterval(scrollToRight,10)" onmouseout="clearInterval(timer2)"><i class="fa fa-angle-right"></i></div>\
					</header>\
					<div id="skipTop"><a href="#header"><i class="fa fa-chevron-up"></i></a></div>\
					')

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
							addText += (tempText + "&#1757; ");
						}
						$(MulverseEl.children()[0]).html(addText + ' <span>' + curVerse + '</span>');
					}
					addVerses(verseCounter + 1);
				}
			})
		}
		else{
			tempText = verseEl.text().replace(/,/g,"&#1757;");
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
	supText = document.getElementsByTagName("sup");
	for (var k = 0;k < supText.length;k++){
		add = document.createElement("a");
		add.href = "#line";
		add.appendChild(document.createTextNode(k+1))
		supText[k].appendChild(add);
	}
	totalVerses = $(".arabic[verse]").length;
	$(".arabic").attr("lang","arabic");
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
		$("body").css("padding-bottom",$("#footer").outerHeight(true));
		if (resizeAgain == true){
			resizeAgain = false;
			setmtH(100);
		}
		canResize = true;
	});
}

var chapSelected = '';
var canClick = true;
var PButton = "";
var CButton;
var PSelection;
var BText = "";
var Sindex = 0;
var topic;
var chapList = [];
var chapExist;
var loadSize;
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
		$("#aside button").css({"visibility":"hidden","cursor":"default"});
		$(".ImageButton").css({"borderStyle":"ridge","cursor":"default"});
		event.target.style.borderStyle = "groove";
		$("#aside button").remove();
		chapSelected = this.id.substring(9,this.id.length);
		topic = chapList[chapSelected-1];
		loadSize = ($("#aside").width())/4 + "px";
		loadSize2 = (3*($("#aside").width())/8) + "px";
		$("#loading-image").css({"box-sizing":"border-box","margin-left":loadSize2,"width":loadSize,"height":loadSize,"border-radius":loadSize,"visibility":"visible"});
		$("#maintext").animate({height:"0px"},550,function(){
			$("#loading-image").css({"visibility":"hidden"});
			$("#maintext").empty();
			for (var i = 1; i <= (topic.length); i++){
				BText = topic[i-1];
				if(BText.length > 40){
					Sindex = BText.indexOf(" ",30);
					if(Sindex != -1){
						BText = BText.substring(0,Sindex) + "...";
					}
				}
				$("#aside").append("<button id='button" + i + "'><p>" + BText + "</p></button>");
				$("#button" + i).attr("title",topic[i-1]);
				document.getElementById("button" + i).addEventListener("click", titleClicked);
			}
			$.ajax({
				url:("../../page.php?ref=" + islamFile2 + "&chpt=" + chapSelected),
				method:"get",
				success:function(data){
					if (data.indexOf("introExists") == -1){
						$("#aside button").css({"visibility":"visible"});
						setTimeout(function(){
							$("#aside button").css({"cursor":"pointer"});
							$("#aside button").css({"cursor":"pointer"});
							$("#aside button p").on("mouseover",function(){$(this).css("padding-left","10px")});
							$("#aside button p").on("mouseleave",function(){$(this).css("padding-left","3px")});
						},600);
						canClick = true;
						canResize = true;
					}
					else{
						data = data.replace("introExists","");
						$("#maintext").load(fileLoc + "/chpt" + chapSelected + "/0.html",function(){
							$("#maintext").ready(function(){
								setTimeout(function(){
									textFormat(600);
									$("#aside button").css({"visibility":"visible"});
									setTimeout(function(){
										$("#aside button").css({"cursor":"pointer"});
										$("#aside button p").on("mouseover",function(){$(this).css("padding-left","10px")});
										$("#aside button p").on("mouseleave",function(){$(this).css("padding-left","3px")});
									},600);
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
					$(".ImageButton").not('\"#' + event.target.id + '\"').css({"cursor":"pointer"});
				}
			})
		});
		PButton = CButton; 
	}
}


var headWidth;
var bodyWidth;
var headerPos;
function buttonSet(){
	headWidth = document.getElementById("header").scrollWidth;
	bodyWidth = document.getElementById("body").scrollWidth;
	if ((headWidth == bodyWidth)){
		$(".sideB").css("display","none");
	}
	else{
		function innerButtonFunc(){
			headerPos = $("#header").scrollLeft();
			if (headerPos == 0){
				$("#leftB").css("display","none");
			}
			else{
				$("#leftB").css("display","block");
				if (headerPos == (headWidth-$("#header").width()-40)){
					$("#rightB").css("display","none");
				}
				else{
					$("#rightB").css("display","block");
				}
			}
			document.cookie = 'scroll='+headerPos;
		}
		innerButtonFunc();
		$("#header").on('scroll',innerButtonFunc);
	}
}

window.onresize = function(){
					buttonSet();
					if (canResize == true){
						setmtH(800);
					}
					else{
						resizeAgain = true;
					}
				  };

var subChapNum = '';
var add;
var CSelection = "";
var ElSelected;
var fileChosen;
function titleClicked(event){
	if(canClick == true){
		ElSelected = $(event.currentTarget);
		subChapNum = this.id.substring(6,this.id.length);
		CSelection = (chapSelected + " " + subChapNum);
		if(PSelection != CSelection){
			canClick = false;
			canResize = false;
			$("#aside button").css({"cursor":"default"});
			$("#aside button p").off("mouseover");
			$("#aside button p").off("mouseleave");
			ElSelected.siblings().css({"margin-top":"22px"});
			ElSelected.css({"margin-top":"12px"});
			ElSelected.children("p:first-child").css({"padding-bottom":"10px","padding-left":"10px"});
			$(ElSelected.siblings()).children("p:first-child").css({"padding-bottom":"0px","padding-left":"3px"});
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
															setTimeout(function(){
																$("#aside button").not(ElSelected).css({"cursor":"pointer"});
																$("#aside button p").on("mouseover",function(){$(this).css("padding-left","10px")});
																$("#aside button p").not(ElSelected.children("p:first-child")).on("mouseleave",function(){$(this).css("padding-left","3px")});
															},1055);					
														});
													}
				    							})
							    			}
							    			else{
							    				setmtH(600);												setTimeout(function(){
													$("#aside button").not(ElSelected).css({"cursor":"pointer"});
													$("#aside button p").on("mouseover",function(){$(this).css("padding-left","10px")});
													$("#aside button p").not(ElSelected.children("p:first-child")).on("mouseleave",function(){$(this).css("padding-left","3px")});
												},600);	
							    			}
							    		}
							    		else{
											setmtH(600);
											setTimeout(function(){
												$("#aside button").not(ElSelected).css({"cursor":"pointer"});
												$("#aside button p").on("mouseover",function(){$(this).css("padding-left","10px")});
												$("#aside button p").not(ElSelected.children("p:first-child")).on("mouseleave",function(){$(this).css("padding-left","3px")});
											},600);
										}
									})
		}
		PSelection = CSelection;
		timerToZero = 850;
	}
}

var myContent;
var xhttp;
var x;
var myCounter = 1;
var doc;
var scrollNum;
var cookie;
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
				$("#source_block").css('display','block');
				$("#aside_container").css('margin-top','30px');
				$("#aside_container #source_block a").attr("href",myContent["SOURCE"][0]);
			}
		}
		$("#footerp").append("<a href='../../summary.html'>Back To Home Page</a>\
							<a href='../../problem.html'>Contact Us</a>");
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

function scrollToLeft(){
	$("#header").scrollLeft($("#header").scrollLeft() - 4);
	if ($("#header").scrollLeft() == 0){
		$("#leftB").css("display","none");
	};
	$("#rightB").css("display","block");
}
function leftClick(){
	$("#header").scrollLeft($("#header").scrollLeft() - 50);
}

function scrollToRight(){
	$("#header").scrollLeft($("#header").scrollLeft() + 4);
	if ($("#header").scrollLeft() == (headWidth-$("#header").width()-40)){
		$("#rightB").css("display","none");
	};
	$("#leftB").css("display","block");
}
function rightClick(){
	$("#header").scrollLeft($("#header").scrollLeft() + 50);
}