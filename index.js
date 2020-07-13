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

var bEl = document.getElementById("bline");
function bottom(){
	bodyh = document.getElementById("body").offsetHeight;
	bEl.style.top = (bodyh - 10) + "px";
}
bottom();

function changeImgHeight(){
	$("#images").css("height",$("#images img")[0].offsetHeight);
	$(".changeSlide").css("height",$("header")[0].clientHeight);
}

window.onresize = function(){
	bottom();
	changeImgHeight();
};

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
			scrollLeft: parseInt($($("#images img")[0]).css("width"))
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
		$("#images").scrollLeft(parseInt($($("#images img")[0]).css("width")));
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

var menuCounter = 0;
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
		$(".changeSlide").show(1000);
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
	changeImgHeight();
	colorcorrect();
	nextSlideVar = window.setTimeout(changeslide, 4000);
}