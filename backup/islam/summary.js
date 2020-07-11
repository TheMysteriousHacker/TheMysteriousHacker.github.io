var ref
var topic
var topicList = [""]
var allA = $("p a").each(function(){
	add = true;
	ref = $(this).attr("href");
	topic = ref.slice(0,ref.indexOf("/")).replace(/_/g," ");
	for (i = 0; i < topicList.length; i++){
		if (topicList[i] == topic){
			add = false;
		}
	}
	if (add == true){
		topicList.push(topic);
		$(this).parent().before("<h2>" + topic + "</h2>");
	}
})

var sectionChildren = document.getElementById("section").childNodes;
var curChild;
var pText;
for (i = 0; i < sectionChildren.length;i++){
	if (sectionChildren[i].tagName == "P"){
		curChild = sectionChildren[i].childNodes[0];
		curChild.target = "_blank";
		pText = curChild.textContent;
		if (pText.indexOf("SB ") != -1){
			$(curChild).html(pText.replace(/SB /g,''));
			$(curChild).before('<i class="fa fa-file-text" title="summarized book"></i>');
		}
	}
}

var parent;
var input;
var pElement;
function searchclicked(){
	$('#section').children().show();
	input = (document.getElementById("sinput").value).toLowerCase().trim();
	$('#section h2').each(function(){
		parent = $(this);
		if (parent.text().toLowerCase().indexOf(input) == -1){
			parent.hide();
			parent.nextUntil('h2').each(function(){
				pElement = $(this);
				pElement.hide();
				if (pElement.text().toLowerCase().indexOf(input) != -1){
					pElement.show();
					parent.show();
					$('#section h3').hide();
				}
			})
		}
		else{
			$('#section h3').hide();
		}
	})
}