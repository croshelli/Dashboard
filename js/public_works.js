



var EMSdata1;

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

start();

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
	    .attr("class", "firetruck")
	    .attr("xlink:href", "images/firetruck_blank.png")
		.attr("x", -50)
		.attr("y", 0)
		.attr("width", 530)
		.attr("height", 265);
		
	canvasDText = canvasDetails.append("text")
								.attr("x", 232)
								.attr("y", 140)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText2Line = canvasDetails.append("text")
								.attr("x", 232)
								.attr("y", 170)
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
																firetruckText(d);
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
											.on("click", function(d){firetruckText(d)});
											
				function firetruckText(d){ var month= d["MonthName"];
															var result= d["Result"];
															var target= d["Result"] - d["Target"];
															var retVal=("In " + month + ", " + result+ "% of incidents met standards.");
															var retVal2Line=("");
															if (target < 0){
																retVal2Line = (retVal2Line + target + "% below Atlanta's target rate."); }
															else if (target> 0){
																retVal2Line = (retVal2Line + target + "% above Atlanta's target rate!"); }
															else{
																retVal2Line = (retVal2Line + "meeting Atlanta's target rate!");}
															canvasDText.transition()
																			.duration(100)
																			.text(retVal);
															canvasDText2Line.transition()
																			.duration(100)
																			.text(retVal2Line);}
				function removefiretruckText(){
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
	    .attr("class", "firetruck")
	    .attr("xlink:href", "images/firetruck_blank.png")
		.attr("x", -50)
		.attr("y", 0)
		.attr("width", 530)
		.attr("height", 265);
		
	canvasDText2 = canvasDetails2.append("text")
								.attr("x", 232)
								.attr("y", 140)
								.attr("font-size","20px")
								.style("text-anchor", "middle")
								.style("font-weight", "bold")
								.text("");
	canvasDText2Line2 = canvasDetails2.append("text")
								.attr("x", 232)
								.attr("y", 170)
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
																firetruckText2(d);
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
										.on("click", function(d){firetruckText2(d)});			//have labels show up on click in blank firetrucks
														   
										
				function firetruckText2(d){ var month= d["MonthName"];
															var result= d["Result"];
															var target= d["Result"] - d["Target"];
															var retVal2=("In " + month + ", " + result+ "% of incidents met standards.");
															var retVal2Line2=("");
															if (target < 0){
																retVal2Line2 = (retVal2Line2 + target + "% below Atlanta's target rate."); }
															else if (target> 0){
																retVal2Line2 = (retVal2Line2 + target + "% above Atlanta's target rate!"); }
															else{
																retVal2Line2 = (retVal2Line2 + "meeting Atlanta's target rate!");}
															canvasDText2.transition()
																			.duration(100)
																			.text(retVal2);
															canvasDText2Line2.transition()
																			.duration(100)
																			.text(retVal2Line2);
															}
				function removefiretruckText2(){
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
	var width = 1010,
    height = 550,
    radius = Math.min(width, height) / 2;
	
    
	var svg = d3.select("div#graphs").append("svg")
					.attr("class", "graphs") 					//create svg element
					.attr("width", width+100)
					.attr("height", height+200)
					.attr("overflow", "visible")
				.append("g")    		//make a group to hold our pie chart
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	var pie = d3.layout.pie()
    .value(function(d) { return d.jan; })
    .sort(null);

	var arc = d3.svg.arc()
		.innerRadius(radius - 110)
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
    


