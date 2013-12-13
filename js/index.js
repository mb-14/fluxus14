// (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))window.location=b})(navigator.userAgent||navigator.vendor||window.opera,'http://flux.src/mobile');
// if(window.innerWidth<800) window.open('http://flux.src/mobile','_self');

var preloadimgs = [
	'img/gateclosed.png',
	'img/gateopen.png',
	'img/sidebarbg.png',
	'img/sidebarbg2.png'
]
var imgs = [];
for (var i = 0; i < preloadimgs.length; i++) {
	imgs.push(new Image());
	imgs[i].src=preloadimgs[i];
};

var gateevent = function(event) {
	if(event.pageY>72*window.innerHeight/100){
		$("#gate")[0].src = "img/gateopen.png";
		animateOnce('#loading','tada');
	}
	else $("#gate")[0].src = "img/gateclosed.png";
};
$(window).on("mousemove",gateevent);

$('#content > div').hide();
$('#modals > div').hide();
var teams = $(".teamtop .details").children();
for(var i=0;i<teams.length;i++){
    $(teams[i]).height(500);
}
//$('.teamtop .details > div').hide();
//$('.teamtop .details div[data-id="0"]').show();
$($(".teamtop .sidebar ul li")[0]).addClass('evt-sel');

window.onload = function(){
	$('#home').show();
	$('#loading').fadeOut(function(){
		$('#loading').text('ENTER');
		$('#loading').click(function(){
			$('#confetti').prependTo('#home');
			$('#preloader').fadeOut(200);
			$(window).off("mousemove",gateevent);
		});
		$('#navbar ul li').click(function(){openCntPg($(this)[0].dataset.name); });
	});
	$(document).keyup(function(e){if(e.which==27){animateOnce('#modals > div','bounceOut',function(){$('#modals > div').hide();});} });
	$('.modal-close').click(function(e){animateOnce('#modals > div','bounceOut',function(){$('#modals > div').hide();});});
	$('#loading').fadeIn();
};

var animateOnce = function(a,b,c){
	$(a).addClass('animated '+b).one('animationend webkitAnimationEnd oAnimationEnd', function(){
		$(this).removeClass('animated '+b);
		if(c!=undefined) c();
	});
};

var topic = function(titletext,name,img,hoverimg){
	this.titletext = titletext;
	this.name = name;
	this.img = new Image();
	this.img.src = "img/topics/"+img;
	// this.hoverimg = new Image();
	// this.hoverimg.src = "img/topics/"+hoverimg;
	this.x = 0;
	this.y = 0;
	this.dom = document.createElement("div");
	this.dom.id = this.name+"topic";
	this.dom.className = "topic";
	this.dom.src = this.img.src;

	this.idom = document.createElement("div");
	this.idom.className = "topic-imgdiv";
	this.idomimg = document.createElement("img");
	this.idomimg.src = this.img.src;

	this.title = document.createElement("div");
	this.title.className = "topic-title";
	$(this.title).text(this.titletext);
	
	this.idom.appendChild(this.idomimg);
	this.dom.appendChild(this.idom);
	this.dom.appendChild(this.title);
	
	var self = this;
	this.setImg = function(y){$("#"+self.dom.id+" img")[0].src = y; }
	this.setX = function(x){$("#"+self.dom.id)[0].style.left = x; }
	this.setY = function(y){$("#"+self.dom.id)[0].style.top = y-35; }
	this.dom.onmouseenter = function(e) {
		// $("#"+self.dom.id+" img")[0].src = self.hoverimg.src;
		animateOnce("#"+self.dom.id+" img",'flip');
		$("#"+self.dom.id+" .topic-title")[0].style.color = "#000";
	};
	this.dom.onmouseleave = function(e) {
		// $("#"+self.dom.id+" img")[0].src = self.img.src;
		$("#"+self.dom.id+" .topic-title")[0].style.color = "#555";
	};
	this.dom.onclick = function(e) {
		animateOnce("#"+self.dom.id,'bounceOutUp',function(){
			$(this).hide();
			openCntPg(self.name);
			$(this).show(1000);
		});
	};
	$(this.dom).appendTo("#home");
}
var topics = [
	new topic("Team Fluxus","team","team.png","teamhover.png"),
	new topic("Social Cause","social","social.png","socialhover.png"),
	new topic("Culturals","cult","cult.png","culthover.png"),
	new topic("Pro Shows","proshows","proshows.png","proshowshover.png"),
	new topic("Technicals","tech","tech.png","techhover.png"),
	new topic("Workshops","workshop","workshop.png","workshophover.png"),
	new topic("The Desi Carnival","theme","theme.png","themehover.png")
];
var updateTopicPos = function(){
	var sa = 39*Math.PI/180;
	var n = topics.length;
	var st = (sa*(n-1)/2)-90*Math.PI/180;
	var cx = window.innerWidth/2-75;
	var rx = window.innerWidth*0.24-40;
	var cy = window.innerHeight*0.46;
	var ry = window.innerHeight*0.34;
	for(var i=0;i<n;i++){
		topics[i].setX(cx+(rx)*Math.cos(st-i*sa));
		topics[i].setY(cy+(ry)*Math.sin(st-i*sa));
	};
}
updateTopicPos();

var chnginCnt = false;
function openCntPg(a){
	if(!chnginCnt&&events.current!=a){
		chnginCnt = true;
		$("#events .img")[0].src=null;
		$("#events .abst").html('');
		$("#events .title").html('');
		switch(a){
			case "register":
				$("#register").show();
				animateOnce("#register",'bounceIn');
				break;
			case "tech":
			case "cult":
			case "workshop":
			// case "proshows":
				events.open(a);
				break;
			default:
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
		
					animateOnce("#events .sidebar",'slideOutLeft',function(){
						events.load(a);
						$("#events .sidebar")[0].style.cssFloat='left';
						$("#events .details")[0].style.cssFloat='right';
						$("#events .sidebar")[0].style.backgroundImage = 'url(img/sidebarbg.png)';
						animateOnce("#events .sidebar",'slideInLeft');
					});
			}
		}else{
			events.current = -1;
			$("#content > div").fadeOut(500);
			$("#events").show(0);
			events.load(a);
				$("#events .sidebar")[0].style.cssFloat='left';
				$("#events .details")[0].style.cssFloat='right';
				$("#events .sidebar")[0].style.backgroundImage = 'url(img/sidebarbg.png)';
				animateOnce("#events .sidebar",'slideInLeft');
		}
		events.current=a;
	},
	load: function(a){
		var jsonfile = '';
		switch(a){
			case "proshows":
				$("#events")[0].style.background="rgba(5,10,0,0.85)";
				jsonfile='https://googledrive.com/host/0BzIWIU3qCj3beUxNVHNyQ1lOdWs/proshows.json'
				//jsonfile = 'new/data/proshows.json';
				break;
			case "tech":
				$("#events")[0].style.background="rgba(5,10,10,0.85)";
				jsonfile='https://googledrive.com/host/0BzIWIU3qCj3beUxNVHNyQ1lOdWs/tech.json'
				//jsonfile = 'new/data/tech.json';
				break;
			case "workshop":
				$("#events")[0].style.background="rgba(5,0,10,0.85)";
				jsonfile='https://googledrive.com/host/0BzIWIU3qCj3beUxNVHNyQ1lOdWs/workshop.json'
				//jsonfile = 'new/data/workshop.json';
				break;
			case "cult":
				$("#events")[0].style.background="rgba(15,0,0,0.85)";
				jsonfile='https://googledrive.com/host/0BzIWIU3qCj3beUxNVHNyQ1lOdWs/cult.json'
				// jsonfile = 'https://googledrive.com/host/0B7gpUuZnCjpdVHRwWVgzZGt2bWM/events.json';
				//jsonfile = 'new/data/cult.json';
				break;
		}
		$("#events .sidebar").html("<ul></ul>");
		// $("#events .sidebar ul").append('<li class=".evt-sel">asdasdasd</li>');
		$.ajax({
			dataType: "json",
			url: jsonfile,
			data: {},
			success: function(data){
				events.currentJSON=data;
				for(var i=0;i<data.length;i++){
					$("#events .sidebar ul").append('<li data-id="'+i+'">'+data[i].title+'</li>');
				};
				fillDetails(0);
				$($("#events .sidebar ul li")[0]).addClass('evt-sel');
				$("#events .sidebar ul li").click(function(){
					$("#events .sidebar ul li").removeClass('evt-sel');
					var t = $(this);
					
					console.log(t);
					fillDetails(t[0].dataset.id);
					t.addClass('evt-sel');
					// $(".evt-sel").animate({marginTop: t.style.top});
				
				});
			}
		});
	}
};

$('.teamtop li[data-id]').click(function(){
	$(".teamtop .sidebar ul li").removeClass('evt-sel');
	var a=$(this)[0].dataset.id;
	var t=$(this);
	t.addClass('evt-sel');
	$('.teamtop .details').animate({scrollTop: 500*a}, 'slow');
	//$('.teamtop .details div[data-id='+a+']').show()
});
$('.teamtop .details').scroll(function(){
$(".teamtop .sidebar ul li").removeClass('evt-sel');
var index = Math.floor(($('.teamtop .details').scrollTop()+100)/500);
$($(".teamtop .sidebar ul li")[index]).addClass('evt-sel');
});
$(window).resize(function(){
	if(window.innerWidth<800) window.open('http://flux.src/mobile','_self');
	updateTopicPos();
});

$("#regForm").submit(function(){
	$.post('ajax/register.php', $(this).serializeArray(), function(data) {
		alert(data);
	});
	return false;
});

//confetti/snow
var cnv = document.getElementById('confetti');
var context = cnv.getContext('2d');
cnv.width  = window.innerWidth;
cnv.height = window.innerHeight;
var atoms = [];
var natoms = 50;
var atomspeed = 1;
function atom(x,y,r){
	this.x = x;
	this.y = y;
	this.sx = 0;
	this.sy = 0;
	this.r = r;
	this.color = {r:0,g:0,b:0};
	this.draw = function(context){
		context.beginPath();
		context.fillStyle="hsla("+this.color+",90%,35%,0.3)";
		context.arc(this.x+3,this.y+3,this.r,0,2*Math.PI);
		context.fill();
	}
}

function fillDetails(index){
var w = events.currentJSON[index];
	animateOnce("#events .details",'slideOutUp',function(){
						$("#events .title").html(w.title);
						$("#events .img")[0].src = "http://lorempixel.com/700/300/technics";
						$("#events .abst").html(w.abstract);
						if(w.rules)
							$("#events .abst").append('<br><br><div style="font: 120% Carnevalee;">RULES</div>'+w.rules);
						$("#events .abst").append(w.etc);
						animateOnce("#events .imgdiv",'slideInLeft');
						animateOnce("#events .abst",'slideInRight');
					});
}
function update(){
    for(var i=0;i<natoms;i++){
		atoms[i].x+=atoms[i].sx;
		atoms[i].y+=atoms[i].sy;
		if(atoms[i].x>cnv.width) atoms[i].x=0;
		else if(atoms[i].x<0) atoms[i].x=cnv.width;
		if(atoms[i].y>cnv.height) atoms[i].y=0;
		else if(atoms[i].y<0) atoms[i].y=cnv.height; //never happens but check anyway
    };
}
function render(){
	context.clearRect(0,0,cnv.width,cnv.height);
    for(var i=0;i<natoms;i++){atoms[i].draw(context);};
}
function loop(){
	update();
	render();
	requestAnimationFrame(loop, cnv);
};
function initialize(){
	for(var i=0;i<natoms;i++){
		var t = new atom(Math.random()*cnv.width,Math.random()*cnv.height,2+Math.random()*3);
		t.sx = Math.random()*atomspeed*2-atomspeed;
		t.sy = Math.random()*atomspeed+atomspeed;
		t.color = parseInt(Math.random()*360);
		atoms[i]=t;
	};
}
function main(){
	initialize();
	loop();
}
main();
