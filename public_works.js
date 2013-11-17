



var EMSdata1;

var svg;
var currChart=0;
var xAxis;
var yAxis;
var width = 500;
var height = 250;
var chartX = 30;
var chartY = 200;
var chartWidth = (7*50);
var padding = 30;
var rectWidth = 30;
start();

function generateGraph(dataset) {
    
	currChart++;
   var canvas = d3.select("div#graphs").append("svg")
							.attr("class", "graphs")
							.attr("x", padding)
							.attr("y", padding)
							.attr("width", width)
							.attr("height", height);
							
						
				
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
			
	var div = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0);
				
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
														//console.log( xScale(new Date(Year, Month, Day)));
														return xScale(new Date( Year, Month, Day ));})
										.attr("y", function(d) {return yScale(d["Result"])+padding;})
										.attr("fill", function(d,i) { 
															var color = "red";
															if (d["Result"]/d["Target"] < .8){
																color = "red";
																}
															else if (d["Result"]/d["Target"] < 1){
																color = "yellow";
																}
															else{
																color = "green";
																}
															return color})
										.on("mouseover", function(d){
															div.transition()
																.duration(400)
																.style("opacity", .9);
																var month= d["MonthName"];
																var result= d["Result"];
																var target= d["Result"] - d["Target"];
																var retVal=("In " + month + ", " + result+ "% of incidents met standards. ");
																if (target < 0){
																	retVal = (retVal + target + "% below Atlanta's target rate."); }
																else if (target> 0){
																	retVal = (retVal + target + "% above Atlanta's target rate!"); }
																else{
																	retVal = (retVal + "meeting Atlanta's target rate!");}
															div.html( retVal)
																.style("left", (d3.event.pageX) + "px")
																.style("top", (d3.event.pageY-28) +"px");
															})
										.on("mouseout", function(d) {
															div.transition()
																.duration(500)
																.style("opacity", 0);
															});
																
		
						
				//monthly results
				canvas.selectAll("text")
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
							.attr("text-anchor", "middle");
							
				//Line that shows target results
				canvas.data(dataset).append("line")
						.attr("x1", chartX)
						.attr("y1", function (d) {return  yScale(d["Target"])+padding;})
						.attr("x2",  chartWidth)
						.attr("y2", function(d) {return yScale(d["Target"])+padding;})
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
					.attr("transform", "translate(30," + padding+ ")")
					.call(yaxis);	
			
				canvas.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0,"+ (chartY + padding) + ")")
					.call(xaxis)
					.selectAll(".tick text")
						.style("text-anchor", "middle")
						.attr("x", rectWidth/2)
						.attr("y", 4);
		
		
		canvas.append("text")
		.data(dataset)
		.attr("x", chartWidth/2 + padding/2 )
		.attr("y", 0+padding-padding/5)
		.style("text-anchor", "middle")
		.text(function(d) {  
			var retVal;
			if(currChart==1){
				retVal= "% Garbage Pickups Collected On Schedule";
				}
			else if (currChart ==2){
				retVal="% Recycling Pickups Collected On Schedule";
				}
			else{ retVal = "no title"}
			return retVal; });


	
};





/*
 * Initializes the visualization.
 */
function start(){
    d3.csv("DPWdata1.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            DPWdata1 = data;
            generateGraph(DPWdata1);

        }
    })
	d3.csv("DPWdata2.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            DPWdata2 = data;
            generateGraph(DPWdata2);

        }
    })

    }
    


