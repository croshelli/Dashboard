var banner;
var menu;
var tabsData;



var width = 1100;
var headerHeight = 100;
var menuHeight = 50;

initialize();

function initialize() {
    d3.csv("tab_data.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            tabsData = data;
            setLayout();
            generateTabs();

        }
    })	
}

function setLayout() {
 	
	banner = d3.select("body")
				.append("svg")
				.attr("id", "banner")
				.attr("width", width)
				.attr("height", headerHeight)
				.attr("overflow", "visible");
				
	menu = d3.select("body")
				.append("svg")
				.attr("id", "svgmenu")
				.attr("width", width)
				.attr("height", menuHeight)
				.attr("overflow", "visible");		
}    

function generateTabs() {
	tabs = menu.selectAll("g")
				.data(tabsData)
				.enter()
				.append("a")
				.attr("xlink:href", function(d) {
					return d.url;
				})
				.append("g")
				.attr("class", function(d) {
					return d.class;
				})
				.attr("x", function(d) {
        			return d.x_position;
        		})
        		.attr("y", 0)
		        .attr("width", function(d) {
		        	return d.tab_width;
		        })
		        .attr("height", menuHeight)
		        .on("mouseover", function(d) {
        			d3.select(this).select("rect")
        			.attr("fill", "#5d088a");	
        		})
       		 	.on("mouseout", function(d) {
        			d3.select(this).select("rect")
        			.attr("fill", "#7709b2");	
        		});
	
	tabs.append("rect")
        .attr("x", function(d) {
        	return d.x_position;
        })
        .attr("y", 0)
        .attr("width", function(d) {
        	return d.tab_width;
        })
        .attr("height", menuHeight)
        .attr("fill", "#7709b2");
  
  
  
	var xOffset = 20;
	var yOffset = 6;
	        
    tabs.append("text")
        .attr("x", function(d, i){
			return Number(d.x_position) + xOffset;
		})
		.attr("y", menuHeight / 2 + yOffset)
        .attr("text-anchor", "start")
        .text(function(d) { 
        	return d.name; 
        })
        .attr("font-family", "Arial")
        .attr("font-size", "21px")
        .attr("font-weight", "bold")
        .attr("fill", "white");	
           
}

function displayBanner() {

}

