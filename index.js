var link
var name
var position
var endp
var subject
var subjects = ['algebra','astronomy','chemistry','biology','geometry','dismaths','calculus','electricity','trigonometry','mechanics']
function colorcorrect(){
	for (i = 1; i < 9; i ++){
		name = 'menu' + i;
		link = document.getElementById(name).href;
		for (j = 0; j < subjects.length; j ++){
			position = link.search(subjects[j]);
			if (position  != -1){
				endp = link.indexOf('/', position);
				subject = link.slice(position, endp);
			}
		}
		change = document.getElementById(name).parentElement;
		if (subject == 'algebra'){
			document.getElementById(name).style.color = '#663300';
			change.style.borderLeftColor = '#663300';
			change.style.backgroundColor = '#FBE39B';
		}
		if (subject == 'astronomy'){
			document.getElementById(name).style.color = '#88AABB';
			change.style.borderLeftColor = '#DD0000';
			change.style.backgroundColor = '#666666';
		}
		if (subject == 'geometry'){
			document.getElementById(name).style.color = 'green';
			change.style.borderLeftColor = 'green';
			change.style.backgroundColor = '#CCFF99';
		}
		if (subject == 'dismaths'){
			document.getElementById(name).style.color = '#FF6600';
			change.style.borderLeftColor = '#FF6600';
			change.style.backgroundColor = '#FFEEAA';
		}
		if (subject == 'calculus'){
			document.getElementById(name).style.color = '#005555';
			change.style.borderLeftColor = '#005555';
			change.style.backgroundColor = '#88DFDF';
		}
		if (subject == 'ps'){
			document.getElementById(name).style.color = '#550055';
			change.style.borderLeftColor = '#550055';
			change.style.backgroundColor = '#EEAADD';
		}
		if (subject == 'chemistry'){
			document.getElementById(name).style.color = '#993366';
			change.style.borderLeftColor = '#993366';
			change.style.backgroundColor = '#FFBBFF';
		}
		if (subject == 'biology'){
			document.getElementById(name).style.color = '#FF6655';
			change.style.borderLeftColor = '#FF6655';
			change.style.backgroundColor = '#FFDD99';
		}
		if (subject == 'trigonometry'){
			document.getElementById(name).style.color = '#000099';
			change.style.borderLeftColor = '#000099';
			change.style.backgroundColor = '#99CCFF';
		}
		if (subject == 'electricity'){
			document.getElementById(name).style.color = '#535353';
			change.style.borderLeftColor = '#535353';
			change.style.backgroundColor = '#F4F4F4';
		}
		if (subject == 'mechanics'){
			document.getElementById(name).style.color = '#600000';
			change.style.borderLeftColor = '#600000';
			change.style.backgroundColor = '#FFEEAA';
		}}
}

function changeImgHeight(){
	$("#images").css("height",$("#images img")[0].offsetHeight);
	$(".changeSlide").css("height",$("header")[0].clientHeight);
}

window.onresize = changeImgHeight;

imgArray = ['<img src="pictures/slideshow1.png">',
			'<img src="pictures/slideshow2.png">',
			'<img src="pictures/slideshow3.png">',
			'<img src="pictures/slideshow4.png">']
refArray = ['astronomy/geocentric/geocentric.html',
			'astronomy/heliocentric/De revolutionibus orbium coelestium.html',
			'dismaths/factorials_and_permutation/factorials_and_permutations.html',
			'chemistry/medieval/phlogiston_theory.html']

var slideShowIndex = 1;
var prevIndex = imgArray.length - 1;
var nextSlideVar;
var enableSlide = true;
function changeslide(){
	if (enableSlide == true){
		enableSlide = false;
		$("#images").append(imgArray[slideShowIndex]);
		$("#images").animate({
			scrollLeft: parseInt($("#images").css("width"))
		},500,function(){
			$($("#images img")[0]).remove();
			$("#images").attr("href",refArray[slideShowIndex]);
			if (slideShowIndex == imgArray.length-1){
				slideShowIndex = 0;
			}
			else{
				slideShowIndex++;
			}
			if (prevIndex == imgArray.length-1){
				prevIndex = 0;
			}
			else{
				prevIndex++;
			}
			enableSlide = true;
			nextSlideVar = window.setTimeout(changeslide, 4000);
		});
	}
}
function rightSlideNow(){
	clearTimeout(nextSlideVar);
	changeslide();
}
function leftSlideNow(){
	if (enableSlide == true){
		enableSlide = false;
		clearTimeout(nextSlideVar);
		$("#images").prepend(imgArray[prevIndex]);
		$("#images").scrollLeft(parseInt($("#images").css("width")));
		$("#images").animate({
			scrollLeft: 0
		},500,function(){
			$($("#images img")[1]).remove();
			$("#images").attr("href",refArray[prevIndex]);
			if (slideShowIndex == 0){
				slideShowIndex = imgArray.length-1;
			}
			else{
				slideShowIndex--;
			}
			if (prevIndex == 0){
				prevIndex = imgArray.length-1;
			}
			else{
				prevIndex--;
			}
			enableSlide = true;
			nextSlideVar = window.setTimeout(changeslide, 4000);
		});
	}
}

$("#sideborder").hide();

if (window.location.href.indexOf("emailSent") != -1){
	$("#recommended").html('<b>Thank You For Your Submission</b><br/>Make sure to check you email for our reply</span>').css("text-align","center");
}

var mouseOutVar;
var SOEl = $("#searchOptions");
function mouseOutSearch(){
	mouseOutVar = window.setTimeout(function(){SOEl.hide()},1500);
}

var topicName;
var dataEl;
var fileName;
var rootFile;
function optionsClicked(event){
	topicName = $(event.target).text();
	$("#pageOptions").empty();
	$("#topicSelect").html('<i class="fa fa-caret-down"></i>'+topicName);
	$("#searchBox").attr({"disabled":false,placeholder:"Search " + topicName + " ..."});
	$("#searchBox").val("");
	fileName = $(event.target).attr("value");
	rootFile = fileName.substring(0,fileName.indexOf("/")+1);
	$.get( fileName,function(data){
		for(dataEl of $(data)){
			if($(dataEl).prop("tagName") == "P"){
				$("#pageOptions").append('<div class="poptions"><a href="' + rootFile + $($(dataEl).children("a")[0]).attr("href") + '" target="_blank">' + $($(dataEl).children("a")[0]).text() + '</a></div>');
			}
		}
	},"html");
}

var optionsIndex = 0;
$(".imginfo").each(function(){
	optionsIndex++;
	SOEl.append('<div class="options" id="option' + optionsIndex + '" onclick="optionsClicked(event)" value="' + $($(this).parent("a")).attr("href") + '">'+ this.getAttribute("alt") + '</div>');
});

function searchClicked(){
	if (SOEl.css("display") == "none"){
		SOEl.show();
	}
	else{
		SOEl.hide();
	}
	$("#pageOptions").hide();
}

function whileLoading(){
	if ($("#forline img")[0].complete){
		document.getElementById("continue").disabled = false;
		$("#continue").css("cursor","pointer");
		$("#continue").text("continue");
	}
	else{
		alert("Please make sure that images are enabled in your browser!");
		$("#continue").text("please enable images");
	}
}
window.onload = function(){window.setTimeout(whileLoading,1000)};

function imgHover(){
	$("#pageOptions").hide();
	$("#searchBox").blur();
}

var menuCounter = 0;
var poptionIdx;
var searchBoxEl;
var popEl;
var popAvailable;
function afterLoading(){
	document.getElementById("continue").setAttribute("disabled","disabled");
	$("#sideborder").show();
	$("body").css({"overflow-y":"scroll"});
	$("#loading").slideUp(1000,function(){
		$("#body").css({
			"border-top-style":"solid",
			"border-top-color": "#663300",
			"border-width":"5px"
		});
		$("#searchdiv, .changeSlide").animate({opacity:1},800);
	});
	$("#bline").css({"border-bottom-style":"solid"});
	$("a").attr('target',"_blank")
	$("#tableadded tr td a").each(function(){
		menuCounter += 1;
		$(this).attr({"class":"menu","id":"menu"+menuCounter});
	})
	$("#tableedit tr td a").each(function(){
		menuCounter += 1;
		$(this).attr({"class":"menu","id":"menu"+menuCounter});
	})
	$("#searchSelection").attr({onmouseleave:"mouseOutSearch()",onmouseenter:"clearTimeout(mouseOutVar)"});
	$(document).on("click", function (event) {
		if(event.target.id != 'searchBox'){
			$("#pageOptions").hide();
		}
		if(event.target.id != 'topicSelect'){
			SOEl.hide();
		}
	});
	searchBoxEl = $("#searchBox");
	searchBoxEl.on('focus',function(){
		SOEl.hide();
		if ($("#pageOptions").children().length > 0){
			$("#pageOptions").show();
		}
		else{
			$("#searchBox").attr({placeholder:"Sorry, there are no pages for this topic"});
		}
	});
	searchBoxEl.on('keyup',function(){
		popAvailable = false;
		popEl = $(".poptions");
		for(poptionIdx = 0; poptionIdx < popEl.length;poptionIdx++){
			popElInner = $(popEl[poptionIdx]);
			if ((popElInner.text()).toLowerCase().indexOf(searchBoxEl.val().toLowerCase()) == -1){
				popElInner.hide();
			}
			else{
				popElInner.show();
				popAvailable = true;
			}
		}
		if (popAvailable == false){
			$("#pageOptions").hide();
		}
		else{
			$("#pageOptions").show();
		}
	})
	$(".imginfo").attr({onmouseenter:'imgHover()'});
	changeImgHeight();
	colorcorrect();
	nextSlideVar = window.setTimeout(changeslide, 4000);
}