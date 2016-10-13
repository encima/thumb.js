window.onload = function() {

	var config = {
		'keys':["very E","really E","so E",	"totally E","PM like E","PM I mean E","PM you know E","H sort of E","all sort of","all kind of","or something E","or anything E",	"and stuff E",	"all E","probably E",	"perhaps E",	"possibly E",	"maybe E"],
		'normaliseRange': 720,
		'delay': 3000,
		'arc': {
			'startX': 500,
			'startY': 600,
			'scaleX': 0.7,
			'scaleY': 1.4
		}
	}

	var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g")

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
		    .attr("fill", "steelblue")
				.style("opacity", 0)
				.attr("transform", "translate(" + x + "," + y + ") scale(" + scaleX + ", " + scaleY + ")")

				thumb_arc.append("svg:title").text(function(d) { return txt; });

		if(delay > 0) {
				thumb_arc.transition().duration(delay).style("opacity", opacity).delay(function(d, i) { return i * delay })
		}else{
				thumb_arc.style("opacity", opacity)
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


	function normalise(value, min, max, scale) {
		return (value - min) / (max - min) * scale;
	}


	function vals(ds, key) {
		var final = {};
		final["key"] = key;
		final["values"] = ds.map(function(a) {return a[key];});
		final["max"] = Math.max.apply( null, final["values"] );
		final["min"] = Math.min.apply( null, final["values"] );
		return final;
	}

	d3.csv("./static/data/FP.csv", function(data) {

		var keys = config.keys;
		var values = {};

		for(var i = 0; i < keys.length; i++) {
			values[keys[i]] = vals(data, keys[i]);
		}

		function clicked(e) {
			Array.prototype.forEach.call(document.getElementsByClassName('selected'), function(el, index) {
				el.className = "";
			});
			var index = data.findIndex(x => x["character"]==e.target.innerHTML);
			g.remove();
			g = svg.append("g");
			e.target.className = 'selected';
			drawPerson(data[index]);
		}

		for(var i = 0; i < data.length; i++) {
			var list = document.getElementById("list");
			var item = document.createElement('li');
			item.onclick = clicked;
			item.innerHTML = data[i]["character"];
			list.appendChild(item);
		}

		var pIndex = getURLParameter("name") != null ? getURLParameter("name") : 0,
				sx = config.arc.startX,
				sy = config.arc.startY,
				person = data[pIndex],
		    inner = 30;

		document.getElementsByTagName('li')[pIndex].className = "selected";

		function drawPerson(person) {
			for(var index in keys) {
				  var key = keys[index];
					angle_start = 360 * Math.random();
					angle_val = normalise(person[key], values[key]["min"], values[key]["max"], 1440);
					angle_opaq = 360 - angle_val;
					var step = inner + (20 * (parseInt(index)+1));
					drawArc(sx, sy, 0, 360, 0.2, step, 10, key + ": " + person[key] + "(" + angle_val + ")", config.arc.scaleX, config.arc.scaleY, 0);
					if(angle_val > 0)
							drawArc(sx, sy, angle_start, angle_start + angle_val, 0.8, step, 10, key + ": " + person[key], config.arc.scaleX, config.arc.scaleY, config.delay);

			}
		}
		drawPerson(person);

	});



};
