var EMSdata1;

var svg;

var xAxis;
var yAxis;
var width = 500;
var height = 250;
var chartX = 30;
var chartY = 200;
var chartWidth = (7*60);
var padding = 30;
var rectWidth = 30;
start();

function generateGraph(dataset) {
    

   var canvas = d3.select("body").append("svg")
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
														console.log( xScale(new Date(Year, Month, Day)));
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
						.attr("x2",  chartWidth+(padding/2))
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
		
			
};

/*Generate Circle Graphs*/

function generatePieCharts(data){
	var w = 490,                        //width
    h = 490,                            //height
    r = 150,                            //radius
	p = Math.PI*2;						//perimeter
    color = d3.scale.category10();     //builtin range of colors
 
	
    
	var canvas = d3.select("body").append("svg") //create svg element
					.attr("x", padding)
					.attr("y", padding)
					.attr("width", w)
					.attr("height", h);
	
	var group = canvas.append("g")    		//make a group to hold our pie chart
					.attr("transform", "translate(" + w/2+ ", " + h/2 + ")");  //translate it's center to radius
	
	var arc = d3.svg.arc()       //create arcs/ set width
				.outerRadius(r-10)
				.innerRadius(r-80)
				;
	
	var pie = d3.layout.pie()  				//make pie layout
				.value(function(d) {return d.value; })
				
	var arcs = group.selectAll(".arc")		//put arcs into pie layout by creating them according to amt of data
					.data(pie(data))
					.enter()
					.append("g")
					.attr("class", "arc");
	
	arcs.append("path")
			.attr("d", arc);
	
	 arcs.append("path")
                .attr("fill", function(d, i) { 
								retVal = "black";
								if(d.value< 30){
									retVal= "black";}
								else if(d.value<70){
									retVal="green";}
								else if(d.value<90){
									retVal="yellow";}
								else {
									retVal="red";
									}
								return retVal;}) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
      
	arcs.append("text")                                     //add a label to each slice
			.attr("transform", function(d) {                    //set the label's origin to the center of the arc
			//we have to make sure to set these before calling arc.centroid
			d.innerRadius = 0;
			d.outerRadius = r;
			return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
		})
		.attr("text-anchor", "middle")                          //center the text on it's origin
		.text(function(d, i) { return data[i].label; });
			
    arcs.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return data[0].kl; });	
	
	
	//graph titles
	canvas.append("text")
		.attr("x", w/2)
		.attr("y", h/2-r-padding)
		.style("text-anchor", "middle")
		.text(function(d) { return ("Average EMS Response Time in " +data[0].kl +""); });




 
}

/*
 * Initializes the visualization.
 */
function start(){
    d3.csv("EMSdata.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            EMSdata1 = data;
            generateGraph(EMSdata1);

        }
    })
	d3.csv("EMSdata2.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            EMSdata2 = data;
            generateGraph(EMSdata2);

        }
    })
	d3.csv("EMSdata3.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            EMSdata3 = data;
			
			var data1 = [{"label":"91", "value":91,"kl":"April"}, 
            {"label":"", "value":9, "label": ""} 
            //{"label":"three", "value":30}];
                        ];
            generatePieCharts(data1);
			var data2 = [{"label":"75", "value":75,"kl":"May"}, 
            {"label":"", "value":25, "label": ""} 
            //{"label":"three", "value":30}];
                        ];
			generatePieCharts(data2);
			var data3 = [{"label":"76", "value":76,"kl":"June"}, 
            {"label":"", "value":24, "label": ""} 
            //{"label":"three", "value":30}];
                        ];
            generatePieCharts(data3);
			var data4 = [{"label":"78", "value":78,"kl":"July"}, 
            {"label":"", "value":22, "label": ""} 
            //{"label":"three", "value":30}];
                        ];
			generatePieCharts(data4);
			
	
			

        }
    })
    
}
