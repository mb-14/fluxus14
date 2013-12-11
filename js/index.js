// (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b})(navigator.userAgent||navigator.vendor||window.opera,'http://flux.src/mobile');
// if(window.innerWidth<800) window.open('http://flux.src/mobile','_self');

$("#content > div").hide();
$("#modals > div").hide();
window.onload = function(){
	$("#home").show();
	$("#jpreButton").fadeOut(function(){
		$("#jpreButton").text("ENTER");
		$("#jpreButton").click(function(){
			$(window).off("mousemove",gateevent);
		});
		$("#navbar ul li").click(function(){
			openCntPg($(this)[0].dataset.name);
		});
	});
	$(document).keyup(function(e){if(e.which==27){animateOnce("#modals > div",'rotateOut',function(){$("#modals > div").hide();});} });
	$(".modal-close").click(function(e){$("#modals > div").hide(200);});
	$("#jpreButton").fadeIn();
};

var animateOnce = function(a,b,c){
	$(a).addClass('animated '+b).one('animationend webkitAnimationEnd oAnimationEnd', function(){
		$(this).removeClass('animated '+b);
		if(c!=undefined) c();
	});
};
var chnginCnt = false;
function openCntPg(a){
	if(!chnginCnt){
		chnginCnt = true;
		$("#evt-img")[0].src='';
		$("#evt-abst").html('');
		$("#evt-title").html('');
		switch(a){
			case "register":
				$("#register").show();
				animateOnce("#register",'rotateIn');
				break;
			case "tech":
			case "cult":
			case "proshows":
				$("#register").hide(200);
				events.open(a);
				break;
			default:
				$("#register").hide(200);
				events.current = 0;
				$("#content > div").fadeOut(500);
				setTimeout(function(){$("#"+a).fadeIn(500);},510);
		}
		chnginCnt = false;
	}
}
var events = {
	current: '',
	currentJSON: '',
	open: function (a){
		if(events.current){
			if(events.current!=a){
				if($("#evt-sidebar")[0].style.float=='left'){
					$("#evt-sidebar").addClass('animated slideOutLeft').one('animationend webkitAnimationEnd oAnimationEnd', function(){
						$(this).removeClass('animated slideOutLeft');
						events.load(a);
						$("#evt-sidebar")[0].style.float='right';
						$("#evt-details")[0].style.float='left';
						animateOnce("#evt-sidebar",'slideInRight');
					});
				} else {
					$("#evt-sidebar").addClass('animated slideOutRight').one('animationend webkitAnimationEnd oAnimationEnd', function(){
						$(this).removeClass('animated slideOutRight');
						events.load(a);
						$("#evt-sidebar")[0].style.float='left';
						$("#evt-details")[0].style.float='right';
						animateOnce("#evt-sidebar",'slideInLeft');
					});
				}
			}
		}else{
			events.current = -1;
			$("#content > div").fadeOut(500,function(){events.load(a); });
			$("#events").show(0);
			events.load(a);
			if($("#evt-sidebar")[0].style.float=='left'){
				$("#evt-sidebar")[0].style.float='right';
				$("#evt-details")[0].style.float='left';
				animateOnce("#evt-sidebar",'slideInRight');
			} else {
				$("#evt-sidebar")[0].style.float='left';
				$("#evt-details")[0].style.float='right';
				animateOnce("#evt-sidebar",'slideInLeft');
			}
		}
		events.current=a;
	},
	load: function(a){
		var jsonfile = '';
		switch(a){
			case "proshows":
				jsonfile = '';
				break;
			case "tech":
				jsonfile = '';
				break;
			case "cult":
				// jsonfile = 'https://googledrive.com/host/0B7gpUuZnCjpdVHRwWVgzZGt2bWM/events.json';
				jsonfile = 'events.json';
				break;
		}
		$("#evt-sidebar").html("<ul></ul>");
		$.ajax({
			dataType: "json",
			url: jsonfile,
			data: {},
			success: function(data){
				events.currentJSON=data;
				for (var i = 0; i < data.length; i++) {
					$("#evt-sidebar ul").append('<li data-id="'+i+'"">'+data[i].title+'</li>');
				};
				$("#evt-sidebar ul li").click(function(){
					var w = $(this)[0].dataset.id;
					$("#evt-details").addClass('animated slideOutUp').one('animationend webkitAnimationEnd oAnimationEnd', function(){
						$(this).removeClass('animated slideOutUp');
						$("#evt-title").html(events.currentJSON[w].title);
						$("#evt-img")[0].src = "http://lorempixel.com/700/300/technics";
						$("#evt-abst").html(events.currentJSON[w].abstract);
						$("#evt-abst").append(events.currentJSON[w].rules);
						$("#evt-abst").append(events.currentJSON[w].etc);
						animateOnce("#evt-imgdiv",'slideInLeft');
						animateOnce("#evt-abst",'slideInRight');
					});
				});
			}
		});
	}
};
var gateevent = function(event) {
	if(event.pageY>72*window.innerHeight/100){
		$("#gate")[0].src = "img/gateopen.png";
		animateOnce('#jpreButton','tada');
	}
	else $("#gate")[0].src = "img/gateclosed.png";
};
$(window).on("mousemove",gateevent);

var topic = function(titletext,name,img,hoverimg){
	this.titletext = titletext;
	this.name = name;
	this.img = new Image();
	this.img.src = "img/topics/"+img;
	this.hoverimg = new Image();
	this.hoverimg.src = "img/topics/"+hoverimg;
	this.x = 0;
	this.y = 0;
	this.dom = document.createElement("div");
	this.dom.id = this.name+"topic";
	this.dom.className = "topic";
	this.dom.src = this.img.src;
	this.dom.style.position = "absolute";
	this.dom.style.width = "80px";
	this.dom.style.height = "80px";
	this.dom.style.left = 0;
	this.dom.style.top = 0;

	this.idom = document.createElement("img");
	this.idom.src = this.img.src;
	this.idom.style.width = "100%";

	this.title = document.createElement("div");
	this.title.className = "topic-title";
	this.title.style.textAlign = "center";
	this.title.style.fontSize = "140%";
	this.title.style.fontFamily = "Carnevalee";
	this.title.style.color = "#DDD";
	$(this.title).text(this.titletext);
	
	this.dom.appendChild(this.idom);
	this.dom.appendChild(this.title);
	
	var self = this;
	this.setImg = function(y){$("#"+self.dom.id+" img")[0].src = y; }
	this.setX = function(x){$("#"+self.dom.id)[0].style.left = x-35; }
	this.setY = function(y){$("#"+self.dom.id)[0].style.top = y-35; }
	this.dom.onmouseenter = function(e) {
		$("#"+self.dom.id+" img")[0].src = self.hoverimg.src;
		animateOnce("#"+self.dom.id+" img",'pulse');
		$("#"+self.dom.id+" .topic-title")[0].style.color = "#ffd700";
	};
	this.dom.onmouseleave = function(e) {
		$("#"+self.dom.id+" img")[0].src = self.img.src;
		$("#"+self.dom.id+" .topic-title")[0].style.color = "#DDD";
	};
	this.dom.onclick = function(e) {
		$("#"+self.dom.id).addClass('animated bounceOutUp').one('animationend webkitAnimationEnd oAnimationEnd', function(){
			$(this).hide();
			$(this).removeClass('animated bounceOutUp');
			openCntPg(self.name);
			$(this).show(1000);
		});
	};
	// $("#home")[0].appendChild(t);
	$(this.dom).appendTo("#home");
}
var topics = [
	new topic("Team Fluxus","team","team.png","teamhover.png"),
	new topic("Sponsors","sponsors","sponsors.png","sponsorshover.png"),
	new topic("Culturals","cult","cult.png","culthover.png"),
	new topic("Pro Shows","proshows","proshows.png","proshowshover.png"),
	new topic("Technicals","tech","tech.png","techhover.png"),
	new topic("Workshops","workshop","workshop.png","workshophover.png"),
	new topic("theme","theme","theme.png","themehover.png")
];
for (var i = 0; i < topics.length; i++) {
	topics[i].setX(window.innerWidth/2+(window.innerWidth*0.35)*Math.cos(-(i+1.5)*Math.PI/(topics.length+2)));
	topics[i].setY(window.innerHeight+(window.innerHeight*0.8)*Math.sin(-(i+1.5)*Math.PI/(topics.length+2)));
};

$(window).resize(function(){
	if(window.innerWidth<800) window.open('http://flux.src/mobile','_self');
	for (var i = 0; i < topics.length; i++) {
		topics[i].setX(window.innerWidth/2+(window.innerWidth*0.35)*Math.cos(-(i+1.5)*Math.PI/(topics.length+2)));
		topics[i].setY(window.innerHeight+(window.innerHeight*0.8)*Math.sin(-(i+1.5)*Math.PI/(topics.length+2)));
	};
});

$("#regForm").submit(function(){
	$.post('ajax/register.php', $(this).serializeArray(), function(data) {
		alert(data);
	});
	return false;
});

function render(){
	requestAnimationFrame(render);
}
requestAnimationFrame(render);
