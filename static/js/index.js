window.onload = function() {

	var sample = ['a', 3, 2.5, 8, 0.7, 7, 2.3, 1.7];
	var vis = d3.select("#thumb")
	var pi = Math.PI;

	function drawArc(x, y, sAng, eAng, opacity, radius, thickness, txt) {
		if(opacity === undefined) opacity = 1;
		var arc = d3.svg.arc()
			.innerRadius(radius - thickness)
			.outerRadius(radius)
			.startAngle(sAng * (pi/180)) //converting from degs to radians
			.endAngle(eAng * (pi/180))


		var path = vis.append("path")
			.attr("d", arc)
			.attr("stroke", "steelblue")
      .attr("stroke-width", "5")
      .attr("fill", "gray")
			.attr("opacity", opacity)
			.attr("transform", "translate(" + x + "," + y + ") scale(1,1.4)")
			.append("svg:title")
   		.text(function(d) { return txt; });

			console.log(path.style("width"));


		// var totalLength = path.node().getTotalLength();

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
			drawArc(150, 150, 0, 90, .6, start + i, 10);
			drawArc(150, 150, 90, 270, .6, start + i, 10);
			drawArc(150, 150, 270, 360, .6, start + i, 10);
		}

	}

	function normalise(value, min, max) {
		return (value - min) / (max - min) * 360;
	}

	var keys = ["very E","really E","so E",	"totally E","PM like E","PM I mean E","PM you know E","H sort of E","all sort of","all kind of","or something E","or anything E",	"and stuff E",	"all E","probably E",	"perhaps E",	"possibly E",	"maybe E"]

	function vals(ds, key) {
		var final = {};
		final["key"] = key;
		final["values"] = Object.keys( ds ).map(function ( index ) { return ds[index][key]; });
		final["max"] = Math.max.apply( null, final["values"] );
		final["min"] = Math.min.apply( null, final["values"] );
		return final;
	}


	d3.csv("./static/data/FP.csv", function(data) {
		var values = {};
		for(var i = 0; i < keys.length; i++) {
			values[keys[i]] = vals(data, keys[i]);
		}
		var sx = 500,
				sy = 500,
				person = data[0],
		    inner = 40;
		for(var index in keys) {
			  var key = keys[index];
				angle_start = 360 * Math.random();
				angle_val = normalise(person[key], values[key]["min"], values[key]["max"]);
				angle_opaq = 360 - angle_val;
				var step = inner + (20 * (parseInt(index)+1));
				if(angle_val > 0)
					drawArc(sx, sy, angle_start, angle_start + angle_val, 0.8, step, 10, key + ": " + person[key]);
				drawArc(sx, sy, 0, 360, 0.2, step, 10, key + ": " + person[key] + "(" + angle_val + ")");

		}


	});



};
