var banner;
var menu;



var width = 1100;
var headerHeight = 150;
var menuHeight = 50;

setLayout();

function setLayout() {
 	
	banner = d3.select("body")
				.append("svg")
				.attr("width", width)
				.attr("height", headerHeight)
				.attr("overflow", "visible");
				
	menu = d3.select("body")
				.append("svg")
				.attr("width", width)
				.attr("height", menuHeight)
				.attr("overflow", "visible");	
	console.log("hey");	
}    

function displayBanner() {
	banner.select("rect")
			.append("rect")
			
}

