var DPWdata1,DPWdata2,DPWdata3;

var svg;
var currChart=0;
var xAxis;
var yAxis;
var width = 500;
var height = 300;
var chartX = 30;
var chartY = 200;
var chartWidth = (7*50);
var padding = 30;
var rectWidth = 30;
var formatting = d3.format(".2f");
var isTiltedRight = false;

start();

function generateAnimations() {
	svg = d3.select("div#animatedIcons")
		  	.append("svg")
			.attr("width", 1100)
			.attr("height", 750);
	svg.append("image")
		.attr("xlink:href", "images/street.png")
		.attr("x", 0)
		.attr("y", 352)
		.attr("width", 1100)
		.attr("height", 98);
	
	displayImage("animatedRecycle", "home_images/recycle.png", 520, 120, 60, 53);
	displayImage("animatedTrash", "images/trash.png", 505, 220, 94, 82);
	displayImage("animatedStop", "images/stop_sign.png", 500, 480, 100, 99);
	displayImage("animatedTrafficLight", "images/traffic_light.png", 524, 620, 52, 114);
}

function displayImage(id, file, xPos, yPos, imgWidth, imgHeight) {
	var xCenter = xPos + imgWidth / 2;
					var yCenter = yPos + imgHeight / 2;
	svg.append("image")
				.attr("id", id)
				.attr("xlink:href", file)
				.attr("x", xPos)
				.attr("y", yPos)
				.attr("width", imgWidth)
				.attr("height", imgHeight)
				.on("mouseover", function(d) {
					var xCenter = xPos + imgWidth / 2;
					var yCenter = yPos + imgHeight / 2; 
					if (!isTiltedRight) {
						isTiltedRight = true;
						d3.select(this)
							.transition()
							.duration(1000)
							.delay(200)
							.attr("transform", "translate(0 0) rotate(15 " + xCenter + " " + yCenter + ")");
					}
					else {
						isTiltedRight = false;
						d3.select(this)
							.transition()
							.duration(1000)
							.delay(200)
							.attr("transform", "translate(0 0) rotate(-15 " + xCenter + " " + yCenter + ")");			
					}
				})
				.on("mouseout", function(d) {			
					d3.select(this)
						.transition()
						.duration(0)
						.attr("transform", "translate(0 0) rotate(0 " + xCenter + " " + yCenter + ")");
				});
}

function generateGraph1(dataset) {
   
   //moves the bar graph up or down
   var graphShift = 25;
   
   var canvas = d3.select("div#graphs").append("svg")
							.attr("class", "graphs")
							.attr("width", width*2)
							.attr("height", height+10+graphShift)
							.attr("overflow", "visible");
	
	var canvasDetails = canvas.append("svg:svg")
								.attr("class", "details")
								.attr("width",width-10)
								.attr("height", height)
								.attr("x", width)
								.attr("y", 0)
								.attr("overflow", "visible");
								
	canvasDetails.append("image")
	    .attr("class", "recyclebin")
	    .attr("xlink:href", "images/recyclebin.png")
		.attr("x", -130)
		.attr("y", 10)
		.attr("width", 540)
		.attr("height", 270);
		
	canvasDText = canvasDetails.append("text")
								.attr("x", 142)
								.attr("y", 85)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText2Line = canvasDetails.append("text")
								.attr("x", 142)
								.attr("y", 105)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText3Line = canvasDetails.append("text")
								.attr("x", 142)
								.attr("y", 135)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
				
	//barchart for results of EMSdata1
	var yScale = d3.scale.linear()
				.domain([ 0, 100])
				.range([ 200,0 ]);
				
	var xScale = d3.time.scale()
				.domain([new Date(2013, 0,1), new Date(2013, 6, 31)])
				.range([0+padding, chartWidth]);
	
	var xaxis = d3.svg.axis()
				.scale(xScale)
				//.ticks(d3.time.months)
				.orient("bottom")
				.tickSize(0)
				.tickFormat(d3.time.format("%b"));

	var yaxis = d3.svg.axis()
					.ticks(5)
					.scale(yScale)
					.orient("left");
				
				//bars in graph				
				var bars = canvas.selectAll("rect")
									.data(dataset)
									.enter()
										.append("rect")
										.attr("width", rectWidth)
										.attr("height", function(d) {return chartY - yScale(d["Result"]) ;})
										.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
																	console.log(d["Result"]);
															return xScale(new Date( Year, Month, Day ));})
										.attr("y", function(d) {return yScale(d["Result"])+padding +graphShift;})
										.attr("fill", function(d,i) { 
															var color = "#D95541";
															if (d["Result"]/d["Target"] < .8){
																color = "#D95541";
																}
															else if (d["Result"]/d["Target"] < 1){
																color = "#F2E96B";
																}
															else{
																color = "#89BD4A";
																}
															return color})
										.on("mouseover", function(d){
															d3.select(this).transition()
																.attr("width", rectWidth+10)
																.attr("height",function(d) {return (chartY - yScale(d["Result"])+10) ;})
																.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
																	return (xScale(new Date( Year, Month, Day ))-5);})
																.attr("y", function(d) {return (yScale(d["Result"])+padding-10+graphShift);});
																recyclebinText(d);
																})
										.on("mouseout", function(d) {
														d3.select(this).transition()
																.attr("width", rectWidth)
																.attr("height",function(d) {return (chartY - yScale(d["Result"])) ;})
																.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
																return xScale(new Date( Year, Month, Day ));})
																.attr("y", function(d) {return yScale(d["Result"])+padding+graphShift;});
																})
											.on("click", function(d){recyclebinText(d)});
											
				function recyclebinText(d){ var month= d["MonthName"];
															var result= d["Result"];
															var target= d["Result"] - d["Target"];
															target = formatting(target);
															var retVal=("In " + month + ", " + result+ "% of incidents");
															var retVal2Line=("met standards.");
															var retVal3Line=("");
															if (target < 0){
																retVal3Line = (retVal3Line + target + "% below Atlanta's target rate."); }
															else if (target> 0){
																retVal3Line = (retVal3Line + target + "% above Atlanta's target rate!"); }
															else{
																retVal3Line = (retVal3Line + "meeting Atlanta's target rate!");}
															canvasDText.transition()
																			.duration(100)
																			.text(retVal);
															canvasDText2Line.transition()
																			.duration(100)
																			.text(retVal2Line);
															canvasDText3Line.transition()
																				.duration(100)
																				.text(retVal3Line);}
				function removerecyclebinText(){
								canvasDText.transition()
											.duration(100)
											.text("");
							canvasDText2Line2.transition()
											.duration(100)
											.text("");
							canvasDText3Line2.transition()
												.duration(100)
												.text("");}												
										
						
				//monthly results
				/*canvas.selectAll("text")
						.data(dataset)
						.enter()	
							.append("text") 
							.text(function(d) {
								console.log(d["Result"]);
								return "" + d["Result"];})
							.attr("x", function(d, i) { var Year = d["Year"];
														var Month =d["Month"];
														var Day = d["Day"];
														return (xScale(new Date( Year, Month, Day )) + rectWidth/2);})
							.attr("y", function(d) {return  yScale(d["Result"]) + 10 +padding;})
							.attr("fill", "black")
							.attr("font-family", "sans-serif")
							.attr("font-size", "11px")
							.attr("text-anchor", "middle");*/
							
				//Line that shows target results
				canvas.data(dataset).append("line")
						.attr("x1", chartX)
						.attr("y1", function (d) {return  yScale(d["Target"])+padding+graphShift;})
						.attr("x2",  chartWidth+(padding/2))
						.attr("y2", function(d) {return yScale(d["Target"])+padding+graphShift;})
						.attr("stroke", "black")
						.attr("stroke-width", 1)
						    .on("mouseover", function(d) {      
								div.transition()        
									.duration(400)   
									.style("opacity", .9);      
									var retVal = "Target Rate of: " + d["Target"];
								div .html(retVal)  
									.style("left", (d3.event.pageX) + "px")     
									.style("top", (d3.event.pageY - 28) + "px");    
								})                  
							.on("mouseout", function(d) {       
								div.transition()        
									.duration(500)      
									.style("opacity", 0);   
							});

						
									
			    canvas.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(30," +( padding +graphShift)+ ")")
					.call(yaxis);	
			
				canvas.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0,"+ (chartY + padding+graphShift) + ")")
					.call(xaxis)
					.selectAll(".tick text")
						.style("text-anchor", "middle")
						.attr("x", rectWidth/2)
						.attr("y", 4);
		
			canvas.append("text")
		.data(dataset)
		.attr("x", chartWidth/2 + padding/2 )
		.attr("y", 0+padding)
		.style("text-anchor", "middle")
		.style("font-weight", "bold")
		.attr("font-size","18px")
		.text( "% EMS Incidents Meeting Standards - ALS");
};
function generateGraph2(dataset) {
    
   //moves the bar graph up or down
   var graphShift = 25;
   var canvas2 = d3.select("div#graphs").append("svg")
							.attr("class", "graphs")
							.attr("width", width*2)
							.attr("height", height+10+graphShift)
							.attr("overflow", "visible");
	
	var canvasDetails2 = canvas2.append("svg:svg")
								.attr("class", "details")
								.attr("width",width-10)
								.attr("height", height)
								.attr("x", width)
								.attr("y", 0)
								.attr("overflow", "visible");
								
	canvasDetails2.append("image")
	    .attr("class", "recyclebin")
	    .attr("xlink:href", "images/recyclebin.png")
		.attr("x", -130)
		.attr("y", 10)
		.attr("width", 540)
		.attr("height", 270);
		
	canvasDText2 = canvasDetails2.append("text")
								.attr("x", 142)
								.attr("y", 85)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText2Line2 = canvasDetails2.append("text")
								.attr("x", 142)
								.attr("y", 105)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText3Line2 = canvasDetails2.append("text")
								.attr("x", 142)
								.attr("y", 135)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
				
	//barchart for results of EMSdata1
	var yScale = d3.scale.linear()
				.domain([ 0, 100])
				.range([ 200,0 ]);
				
	var xScale = d3.time.scale()
				.domain([new Date(2013, 0,1), new Date(2013, 6, 31)])
				.range([0+padding, chartWidth]);
	
	var xaxis = d3.svg.axis()
				.scale(xScale)
				//.ticks(d3.time.months)
				.orient("bottom")
				.tickSize(0)
				.tickFormat(d3.time.format("%b"));

	var yaxis = d3.svg.axis()
					.ticks(5)
					.scale(yScale)
					.orient("left");
				
				//bars in graph				
				var bars2 = canvas2.selectAll("rect")
									.data(dataset)
									.enter()
										.append("rect")
										.attr("width", rectWidth)
										.attr("height", function(d) {return chartY - yScale(d["Result"]) ;})
										.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
															return xScale(new Date( Year, Month, Day ));})
										.attr("y", function(d) {return yScale(d["Result"])+padding+graphShift;})
										.attr("fill", function(d,i) { 
															var color = "#D95541";
															if (d["Result"]/d["Target"] < .8){
																color = "#D95541";
																}
															else if (d["Result"]/d["Target"] < 1){
																color = "#F2E96B";
																}
															else{
																color = "#89BD4A";
																}
															return color})
											.on("mouseover", function(d){
															d3.select(this).transition()
																.attr("width", rectWidth+10)
																.attr("height",function(d) {return (chartY - yScale(d["Result"])+10) ;})
																.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
																	return (xScale(new Date( Year, Month, Day ))-5);})
																.attr("y", function(d) {return (yScale(d["Result"])+padding-10+graphShift);});
																recyclebinText2(d);
																})
										.on("mouseout", function(d) {
														d3.select(this).transition()
																.attr("width", rectWidth)
																.attr("height",function(d) {return (chartY - yScale(d["Result"])) ;})
																.attr("x", function(d, i) { var Year = d["Year"];
																	var Month =d["Month"];
																	var Day = d["Day"];
																return xScale(new Date( Year, Month, Day ));})
																.attr("y", function(d) {return yScale(d["Result"])+padding+graphShift;});
																
																})
										.on("click", function(d){recyclebinText2(d)});			//have labels show up on click in blank recyclebins
														   
										
				function recyclebinText2(d){ var month= d["MonthName"];
															var result= d["Result"];
															var target= d["Result"] - d["Target"];
															target = formatting(target);
															var retVal2=("In " + month + ", " + result+ "% of incidents");
															var retVal2Line2=("met standards.");
															var retVal3Line2=("");
															if (target < 0){
																retVal3Line2 = (retVal3Line2 + target + "% below Atlanta's target rate."); }
															else if (target> 0){
																retVal3Line2 = (retVal3Line2 + target + "% above Atlanta's target rate!"); }
															else{
																retVal3Line2 = (retVal3Line2 + "meeting Atlanta's target rate!");}
															canvasDText2.transition()
																			.duration(100)
																			.text(retVal2);
															canvasDText2Line2.transition()
																			.duration(100)
																			.text(retVal2Line2);
															canvasDText3Line2.transition()
																				.duration(100)
																				.text(retVal3Line2);}
				function removerecyclebinText2(){
								canvasDText2.transition()
											.duration(100)
											.text("");
							canvasDText2Line2.transition()
											.duration(100)
											.text("");
							canvasDText3Line2.transition()
												.duration(100)
												.text("");}
				
				//monthly results
				/*canvas2.selectAll("text")
						.data(dataset)
						.enter()	
							.append("text") 
							.text(function(d) {return "" + d["Result"];})
							.attr("x", function(d, i) { var Year = d["Year"];
														var Month =d["Month"];
														var Day = d["Day"];
														return (xScale(new Date( Year, Month, Day )) + rectWidth/2);})
							.attr("y", function(d) {return  yScale(d["Result"]) + 10 +padding;})
							.attr("fill", "black")
							.attr("font-family", "sans-serif")
							.attr("font-size", "11px")
							.attr("text-anchor", "middle");*/
							
				//Line that shows target results
				canvas2.data(dataset).append("line")
						.attr("x1", chartX)
						.attr("y1", function (d) {return  yScale(d["Target"])+padding+graphShift;})
						.attr("x2",  chartWidth+(padding/2))
						.attr("y2", function(d) {return yScale(d["Target"])+padding+graphShift;})
						.attr("stroke", "black")
						.attr("stroke-width", 1);

						
									
			    canvas2.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(30," + (padding+graphShift)+ ")")
					.call(yaxis);	
			
				canvas2.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0,"+ (chartY + padding+graphShift) + ")")
					.call(xaxis)
					.selectAll(".tick text")
						.style("text-anchor", "middle")
						.attr("x", rectWidth/2)
						.attr("y", 4);
		
			canvas2.append("text")
		.data(dataset)
		.attr("x", chartWidth/2 + padding/2 )
		.attr("y", 0+padding)
		.style("text-anchor", "middle")
		.style("font-weight", "bold")
		.attr("font-size","18px")
		.text("% EMS Incidents Meeting Standards - BLS");
};

/*Generate Circle Graphs*/

function generatePieCharts(data){
	var width = 400,
    height = 800,
    radius = Math.min(width, height) / 2;
	
    
	var svg = d3.select("div#pie").append("svg")
					//create svg element
					.attr("class", "pie")
					.attr("width", width)
					.attr("height", 700)
					.attr("overflow", "visible")
				.append("g")    		//make a group to hold our pie chart
					.attr("transform", "translate(" + radius  + "," + radius + ")");
	
	var pie = d3.layout.pie()
    .value(function(d) { return d.jan; })
    .sort(null);

	var arc = d3.svg.arc()
		.innerRadius(radius - 80)
		.outerRadius(radius );
					
	var titleText = svg.append("text")
		.attr("x", 0)
		.attr("y", -10)
		.style("font-weight", "bold")
		.style("text-anchor", "middle")
		.text(  "Amount of garbage collected" );
	var timeText=svg.append("text")
			.attr("x", 0)
			.attr("y", 25)
			.attr("font-size","34px")
			.style("text-anchor", "middle")
			.style("font-weight", "bold")
			.text(  "" );
						
					
	var path = svg.datum(data).selectAll("path")
				  .data(pie)
				  .enter().append("path")
				  //.attr("fill", function(d, i) { return color(i); })
				  .attr("fill", function(d, i) { 
									retVal = "black";
									if(d.value< 6000){
										retVal= "black";}
									else if(d.value<9000){
										retVal="green";}
									else if(d.value<11000){
										retVal="yellow";}
									else {
										retVal="red";
										}
									return retVal;}) //set the color for each slice to be chosen from the color function defined above
												 //this creates the actual SVG path using the associated data (pie) with the arc drawing function
				  .attr("d", arc)
				  .each(function(d) { this._current = d; }); // store the initial angles

		  d3.selectAll("input")
			  .on("change", change);

		  var timeout = setTimeout(function() {
			d3.select("input[value=\"jan\"]").property("checked", true).each(change);
		  }, 2000);

		  function change() {
			var value = this.value;
			var id = this.id;
			var titles = this.title;
			console.log(id);
			clearTimeout(timeout);
			pie.value(function(d) { return d[value]; }); // change the value function
			path = path.data(pie); // compute the new angles
			path.transition().duration(750).attrTween("d", arcTween) // redraw the arcs
				.attr("fill", function(d, i) { 
									retVal = "black";
									if(d.value< 6000){
										retVal= "black";}
									else if(d.value<9000){
										retVal="green";}
									else if(d.value<11000){
										retVal="yellow";}
									else {
										retVal="red";
										}
									return retVal;})
			titleText.transition().duration(100).text(function(d) { return "Amount of garbage collected in " + titles+":";})
			timeText.transition().duration(100).text(function(d) {return (""+id+ " Tons");});
			
		  }
		
               
      


	function type(d) {
	  d.jan = +d.jan;
	  d.feb = +d.feb;
	  d.march = +d.march;
	  d.april = +d.april;
	  d.may = +d.may;
	  d.june = +d.june;
	  d.july = +d.july;
	  return d;
	}


	// Store the displayed angles in _current.
	// Then, interpolate from _current to the new angles.
	// During the transition, _current is updated in-place by d3.interpolate.
	function arcTween(a) {
	  var i = d3.interpolate(this._current, a);
	  this._current = i(0);
	  return function(t) {
	  return arc(i(t));
	  };
	}

 
}



/*
 * Initializes the visualization.
 */
function start(){
d3.tsv("csv/DPWdata3.tsv",  function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            DPWdata3 = data;
			generateAnimations()
			generatePieCharts(DPWdata3);
        }
    })
    d3.csv("csv/DPWdata1.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            DPWdata1 = data;
            generateGraph1(DPWdata1);

        }
    })
	d3.csv("csv/DPWdata2.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            DPWdata2 = data;
            generateGraph2(DPWdata2);

        }
    })

    }
    


