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

function generatePieCharts(){
	var w = 490,                        //width
    h = 490,                            //height
    r = 150,                            //radius
    color = d3.scale.category10();     //builtin range of colors
 
    
	var data = [{"label":"76", "value":76,"kl":"June"}, 
            {"label":"", "value":24, "label": ""} 
            //{"label":"three", "value":30}];
			];
    
    var vis = d3.select("body")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
 
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r-10)
		.innerRadius(r-50);
		
 
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
 
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
        arcs.append("svg:text")                                     //add a label to each slice
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
	 
	  




 var w = 490,                        //width
    h = 490,                            //height
    r = 150,                            //radius
    color = d3.scale.category10();     //builtin range of colors
 
    
	var data = [{"label":"78", "value":78,"kl":"July"}, 
            {"label":"", "value":22, "label": ""} 
            //{"label":"three", "value":30}];
			];
    
    var vis = d3.select("body")
        .append("svg:svg")             
        .data([data])                   
            .attr("width", w)           
            .attr("height", h)
        .append("svg:g")                
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
 
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r-10)
		.innerRadius(r-50);
		
 
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
 
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
 
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
 
        arcs.append("svg:text")                                     //add a label to each slice
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
    });
    generatePieCharts();
}
