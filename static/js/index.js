window.onload = function() {

	var sample = ['a', 3, 2.5, 8, 0.7, 7, 2.3, 1.7];
/*	var canvas = document.getElementById('plots');

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'blue';
	ctx.lineWidth = 5;
	var offset = 10;
	var startX = (canvas.width / 2) + offset;
	var startY = (canvas.height / 2) + offset;
	console.log(startX);*/
	var vis = d3.select("svg")
	var pi = Math.PI;

	function drawArc(x, y, sAng, eAng, opacity, radius, thickness) {
		if(opacity === undefined) opacity = 1;
		var arc = d3.svg.arc()
			.innerRadius(radius - thickness)
			.outerRadius(radius)
			.startAngle(sAng * (pi/180)) //converting from degs to radians
			.endAngle(eAng * (pi/180)) //just radians

		console.log(arc);
			
		vis.append("path")
			.attr("d", arc)
			.attr("opacity", opacity)
			.attr("transform", "translate(" + x + "," + y + ")")
	}

	function pureDrawArc() {
		var x = canvas.width / 2,
			y =canvas.height / 2,
			sAngle = 50;
		for(var i = 1; i < 9; i++) {
			ctx.beginPath();
			//ctx.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI);
			ctx.ellipse(x, y, sAngle * i, sAngle * i-50, 1.571, 2*Math.PI, 0);
			ctx.stroke();
		}
	}

	function sampleDrawPrint() {
	
		drawArc(150, 150, 0, 90, .2, 60, 10);
		drawArc(150, 150, 90, 270, .4, 60, 10);
		drawArc(150, 150, 180, 360, .2, 60, 10);	

		drawArc(150, 150, 0, 360, .2, 80, 10);

		drawArc(150, 150, 0, 360, .2, 100, 10);

		drawArc(150, 150, 0, 180, .4, 120, 10);
		drawArc(150, 150, 180, 360, .8, 120, 10);

	}

	sampleDrawPrint();

	//drawArc(150, 150, 180, 90, .8);
	/*ctx.beginPath();
	ctx.arc(175, 175, 50, 0, 2* Math.PI);
	ctx.stroke();*/
/*	for(var i = 1; i < sample.length; i++) {
		var feature = sample[i];
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.arcTo(startX, startY, startX + feature, startY + feature, 100);
		ctx.stroke();
	}	*/

};
