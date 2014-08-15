window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame 	||
	window.webkitRequestAnimationFrame 		||
	window.mozRequestAnimationFrame    		||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};
})();

var canvas 	  = document.getElementById('canvas'),
	ctx       = canvas.getContext('2d'),
	ww        = window.innerWidth,
	wh        = window.innerHeight,
	size 	  = 50,
	height    = wh*(size/75),
	x         = ww/2,
	y         = (wh-height)/2-(height/7),
	triangles = 30,
	colors    = [],
	colorD 	  = [60, 20, 80],
	start     = true,
	speed     = 40,
	g         = [x, y+(height*2/3)],
	invert	  = -1,
	border 	  = "#ffffff";

canvas.width  = ww;
canvas.height = wh;
ctx.lineWidth   = 1;

//Set the shading colors
function setColor(){
	for (var i=1;i<=triangles;i++){
		colors[i] = "rgba("+(colorD[0]+(i*(triangles/6)))+","+(colorD[1]+(i*(triangles/6)))+","+(colorD[2]+(i*(triangles/6)))+",1)";
	}
}
setColor();

var j = 0, k = 0;
function draw(){

	ctx.clearRect(0,0,ww,wh);
	for (var i=1;i<=triangles;i++){
		var nHeight = height-(height/triangles)*i;

		ctx.fillStyle = colors[i];
		ctx.strokeStyle = border;

		ctx.save();
		ctx.translate( g[0],g[1] );
		ctx.rotate(invert*i*j/(-speed*6));
		ctx.translate( -g[0],-g[1] );

		ctx.beginPath();
		ctx.moveTo(g[0],g[1]-nHeight*2/3);
		ctx.lineTo(g[0]+nHeight/Math.sqrt(3), g[1]+nHeight*1/3);
		ctx.lineTo(g[0]-nHeight/Math.sqrt(3), g[1]+nHeight*1/3);
		ctx.lineTo(g[0],g[1]-nHeight*2/3);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		
		ctx.restore();
	};

	j++;
}


(function animloop(){
  requestAnimFrame(animloop);
  if(start)draw();
})();


document.getElementById("speed").addEventListener("change", function(){
	speed = Math.round(101-this.value);
});
document.getElementById("triangles").addEventListener("change", function(){
	triangles = Math.round(this.value);
});
document.getElementById("invert").addEventListener("change", function(){
	invert = document.getElementById("invert").checked;
	if(invert)invert=1;
	else invert = -1;
});
document.getElementById("size").addEventListener("change", function(){
	size	= this.value;
	height	= wh*(size/75);
});
document.getElementById("color").addEventListener("change", function(){
	colorD = [];
	colorD[0] = parseInt(this.value.slice(1,3), 16);
    colorD[1] = parseInt(this.value.slice(3,5), 16);
    colorD[2] = parseInt(this.value.slice(5,8), 16);
    setColor();
});
document.getElementById("border").addEventListener("change", function(){
    border = this.value;
});
document.getElementById("pause").addEventListener("click", function(){
	start = !start;
	if(start)document.getElementById("pause").innerHTML = "Pause";
	else document.getElementById("pause").innerHTML = "Play";
});
document.getElementById("download").addEventListener("click", function(){
	document.getElementById("download").href = canvas.toDataURL();
	document.getElementById("download").download = "Triangles.png";
});