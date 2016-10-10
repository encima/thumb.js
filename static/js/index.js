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


		var path = vis.append("path")
			.attr("d", arc)
			.attr("stroke", "steelblue")
      .attr("stroke-width", "5")
      .attr("fill", "gray")
			.attr("opacity", opacity)
			.attr("transform", "translate(" + x + "," + y + ")")

		var totalLength = path.node().getTotalLength();

		// vis.on("click", function() {
		// 	path
		// 		.attr("stroke-dasharray", totalLength + " " + totalLength)
		// 		.attr("stroke-dashoffset", totalLength)
		// 		.transition()
		// 		.duration(2000)
		// 		.ease("linear")
		// 		.attr("stroke-dashoffset", 0);
		// });


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
		var sx = 150,
		    sy = 150,
				start = 60;
		for (var i = 10; i <= 60; i+=20) {
			// array[i]
			// for (var j = 0; j < 8; j++) {
			drawArc(150, 150, 0, 90, .6, start + i, 10);
			drawArc(150, 150, 90, 270, .6, start + i, 10);
			drawArc(150, 150, 270, 360, .6, start + i, 10);
			// }
		}

		// drawArc(150, 150, 0, 90, .6, 60, 10);
		// drawArc(150, 150, 0, 90, .6, 80, 10);
		// drawArc(150, 150, 0, 90, .6, 100, 10);

		// drawArc(150, 150, 0, 90, .2, 60, 10);
		// drawArc(150, 150, 90, 270, .4, 60, 10);
		// drawArc(150, 150, 180, 360, .2, 60, 10);
		//
		// drawArc(150, 150, 0, 360, .2, 80, 10);
		//
		// drawArc(150, 150, 0, 360, .2, 100, 10);
		//
		// drawArc(150, 150, 0, 180, .4, 120, 10);
		// drawArc(150, 150, 180, 360, .8, 120, 10);

	}

	function normalize(value, min, max) {
		return normalized = (value - min) / (max - min) * 360;
	}


	d3.csv("./static/data/FP.csv", function(data) {
		sampleDrawPrint();
		console.log(data);
		var maybe = Object.keys( data ).map(function ( key ) { return data[key]["all E"]; });
		var max = Math.max.apply( null, maybe );
		var min = Math.max.apply( null, maybe );
		console.log(max);
		for (var index in data) {
			for(var key in data[index]) {
				if(key.endsWith("E")) {

				}
			}
		}

	});



};
