window.onload = function() {

	var sample = ['a', 3, 2.5, 8, 0.7, 7, 2.3, 1.7];
	// var vis = d3.select("#thumb")
	var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g")
		// .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var pi = Math.PI,
		  tau = 2 * pi;

	function drawArc(x, y, sAng, eAng, opacity, radius, thickness, txt, scaleX, scaleY, delay) {
		scaleX = scaleX !== undefined ? scaleX : 1;
		scaleY = scaleY !== undefined ? scaleY : 1;
		opacity = opacity !== undefined ? opacity : 1;
		delay = delay !== undefined ? delay : 0;

		 var arc = d3.arc()
	 		.innerRadius(radius - thickness)
	 		.outerRadius(radius)
	 		.startAngle(sAng * (pi/180)) //converting from degs to radians
	 		.endAngle(eAng * (pi/180))

			var thumb_arc = g.append("path")
				.attr("d", arc)
				.attr("stroke", "steelblue")
		    .attr("stroke-width", "5")
		    .attr("fill", "gray")
				.style("opacity", 0)
				.attr("transform", "translate(" + x + "," + y + ") scale(" + scaleX + ", " + scaleY + ")")
				.text(function(d) { return txt; });

		if(delay > 0) {
				// thumb_arc.transition().duration(delay).style("opacity", opacity).delay(function(d, i) { return i * delay })
				thumb_arc.transition().duration(delay).style("opacity", opacity).delay(function(d, i) { return i * delay })
		}else{
				thumb_arc.style("opacity", opacity)
		}


function arcTween(newAngle) {
  return function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  };
}

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

	function getURLParameter(name) {
  	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
	}

	function selectArcs() {
    d3.selectAll("g.arc > path")
        .each(arcTween);
}

function arcTween(){
    d3.select(this)
        .transition().duration(1000)
        .attrTween("d", tweenArc({ value : 0 }));
}

function tweenArc(b) {
    return function(a) {
        var i = d3.interpolate(a, b);
        for (var key in b) a[key] = b[key]; // update data
        return function(t) {
            return arc(i(t));
        };
    };
}


	function normalise(value, min, max, scale) {
		return (value - min) / (max - min) * scale;
	}

	var keys = ["very E","really E","so E",	"totally E","PM like E","PM I mean E","PM you know E","H sort of E","all sort of","all kind of","or something E","or anything E",	"and stuff E",	"all E","probably E",	"perhaps E",	"possibly E",	"maybe E"]

	function vals(ds, key) {
		var final = {};
		final["key"] = key;
		final["values"] = ds.map(function(a) {return a[key];});
		final["max"] = Math.max.apply( null, final["values"] );
		final["min"] = Math.min.apply( null, final["values"] );
		return final;
	}

	d3.csv("./static/data/FP.csv", function(data) {
		var values = {};
		for(var i = 0; i < keys.length; i++) {
			values[keys[i]] = vals(data, keys[i]);
		}
		var pIndex = getURLParameter("name") != null ? getURLParameter("name") : 0,
				sx = 500,
				sy = 600,
				person = data[pIndex],
		    inner = 30;

		for(var index in keys) {
			  var key = keys[index];
				angle_start = 360 * Math.random();
				angle_val = normalise(person[key], values[key]["min"], values[key]["max"], 1440);
				angle_opaq = 360 - angle_val;
				var step = inner + (20 * (parseInt(index)+1));
				drawArc(sx, sy, 0, 360, 0.2, step, 10, key + ": " + person[key] + "(" + angle_val + ")", 0.7, 1.4, 0);
				if(angle_val > 0)
						drawArc(sx, sy, angle_start, angle_start + angle_val, 0.8, step, 10, key + ": " + person[key], 0.7, 1.4, 4000);

		}


	});



};
