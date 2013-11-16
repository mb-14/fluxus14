var cnv = document.getElementById('cnv');
var context = cnv.getContext('2d');
cnv.width  = window.innerWidth;
cnv.height = window.innerHeight;

var atoms = [];
var natoms = 250;
var atomspeed = 1.7;
function atom(x,y,rx,ry){
	this.x = x;
	this.y = y;
	this.sx = 0;
	this.sy = 0;
	this.rx = rx;
	this.ry = ry;
	this.color = {r:0,g:0,b:0};
	this.draw = function(context){
		context.beginPath();
		context.fillStyle="rgba("+this.color.r+","+this.color.g+","+this.color.b+",0.6)";
		context.arc(this.x+3,this.y+3,this.rx,0,2*Math.PI);
		context.fill();
	}
}

function update(){
    for (var i = 0; i < natoms; i++) {
		atoms[i].x+=atoms[i].sx;
		atoms[i].y+=atoms[i].sy;
		if(atoms[i].x>cnv.width) 
			atoms[i].x=0;
		else if(atoms[i].x<0) 
			atoms[i].x=cnv.width;
		if(atoms[i].y>cnv.height) 
			atoms[i].y=0;
		else if(atoms[i].y<0) //never happens but check anyway
			atoms[i].y=cnv.height;
    };
}

function render(){
    context.clearRect(0,0,cnv.width,cnv.height);
    for (var i = 0; i < natoms; i++) {
    	atoms[i].draw(context);
    };
}

function loop(){
	update();
	render();
	requestAnimationFrame(loop, cnv);
};

function initialize(){
	for (var i = 0; i < natoms; i++) {
		var t = new atom(Math.random()*cnv.width,Math.random()*cnv.height,1+Math.random()*5,1+Math.random()*5);
		t.sx = Math.random()*atomspeed*2-atomspeed;
		t.sy = Math.random()*atomspeed+atomspeed;
		t.color = {r:parseInt(Math.random()*70+120),
					g:parseInt(Math.random()*70+120),
					b:parseInt(Math.random()*70+120)}
		atoms[i]=t;
	};
}
document.getElementById("reset").onclick = function(){
	initialize();
}

function main(){
	initialize();
	loop();
}

main();