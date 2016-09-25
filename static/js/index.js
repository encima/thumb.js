window.onload = function() {

	var sample = ['a', 3, 2.5, 8, 0.7, 7, 2.3, 1.7];
	var vis = d3.select("#thumb")
	var pi = Math.PI;

	function drawArc(x, y, sAng, eAng, opacity, radius, thickness) {
		if(opacity === undefined) opacity = 1;
		var arc = d3.svg.arc()
			.innerRadius(radius - thickness)
			.outerRadius(radius)
			.startAngle(sAng * (pi/180)) //converting from degs to radians
			.endAngle(eAng * (pi/180)) //just radians

			
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

	 function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

	   return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	   };
	  }

	 function describeArc(x, y, radius, startAngle, endAngle){

		var start = polarToCartesian(x, y, radius, endAngle);
		var end = polarToCartesian(x, y, radius, startAngle);

		var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

		var d = [
			"M", start.x, start.y, 
			"A", radius, radius, 1, arcSweep, 0, end.x, end.y,
			"L", x,y,
			"L", start.x, start.y,
			"innerRadius", 100,
			"outerRadius", 50,
			].join(" ");

		   return d;       
	  }

	d3.select("#arc1").append("path").attr("d", describeArc(200, 200, 100, 0, 90));
};
