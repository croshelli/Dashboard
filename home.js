var ambulance;
var firetruck;
var recycle;
var badge;
var plane;
var tree;
var imageCanvasWidth = 1100;
var imageCanvasHeight = 750;
var canvas;


var banner;
var menu;
var tabsData;

var headWidth = 1100;
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
            displayBanner();
            generateTabs();
            setImages();

        }
    })	
}

function setLayout() {
 	
	banner = d3.select("body")
				.append("svg")
				.attr("class", "head")
				.attr("id", "banner")
				.attr("width", headWidth)
				.attr("height", headerHeight)
				.attr("overflow", "visible");
				
	menu = d3.select("body")
				.append("svg")
				.attr("class", "head")
				.attr("id", "svgmenu")
				.attr("width", headWidth)
				.attr("height", menuHeight)
				.attr("overflow", "visible");	
				
	imageCanvas = d3.select("body")
 					.append("svg")
 					.attr("id", "icons")
 					.attr("width", headWidth)
 					.attr("height", imageCanvasHeight);	
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
        		.on("click", function(d) {
        			d3.selectAll(".tab")
        				.attr("fill", "#7709b2");
        			d3.select(this).select(".tab")
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
	
	banner.append("image")
			.attr("xlink:href", "home_images/banner.png")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", 100)
			.attr("width", 1100);
}

function setImages() {	
	displayImage("firetruck", "home_images/firetruck.png", 600, 400, 596, 286);
	displayImage("recycle", "home_images/recycle.png", 95, 270, 70, 63);
	displayImage("badge", "home_images/badge.png", 860, 270, 47, 56);
	displayImage("tree", "home_images/tree.png", 350, 240, 113, 145);
	displayImage("ambulance", "home_images/ambulance.png", 0, 400, 414, 209);
		
}    

function displayImage(id, file, xPos, yPos, imgWidth, imgHeight) {
	
	imageCanvas.append("image")
	displayImage("plane", "home_images/plane.png", 700, 30, 286, 56, "aviation.html");
	displayImage("recycle", "home_images/recycle.png", 95, 270, 70, 63, "public_works.html");
	displayImage("badge", "home_images/badge.png", 860, 270, 47, 56, "police.html");
	displayImage("tree", "home_images/tree.png", 350, 240, 113, 145, "public_works.html");
	displayImage("ambulance", "home_images/ambulance.png", 0, 400, 414, 209, "medical_services.html");
	displayImage("firetruck", "home_images/firetruck.png", 600, 400, 596, 286, "fire_rescue.html");
		
}    

function displayImage(id, file, xPos, yPos, imgWidth, imgHeight, link) {
	
	imageCanvas.append("a")
				.attr("xlink:href", link)
				.append("image")
				.attr("id", id)
				.attr("xlink:href", file)
				.attr("x", xPos)
				.attr("y", yPos)
				.attr("width", imgWidth)
				.attr("height", imgHeight)
				.on("mouseover", function(d) {
					var x = -xPos - imgWidth / 2;
					var y = -yPos - imgHeight / 2;
					var xCenter = xPos + imgWidth / 2;
					var yCenter = yPos + imgHeight / 2;
					var xScaled = x * 1.2;
					var yScaled = y * 1.2;
					var xNew = xCenter - imgWidth * 1.2;
					var yNew = yCenter - imgHeight * 1.2; 
					
					d3.select(this)
						//.attr("transform", "translate(" + x + "," + y + "), scale(1.2, 1.2), translate(" + (xScaled + imgWidth * 1.2 / 2 + xNew) + "," + (yScaled + imgHeight * 1.2 / 2 + yNew) + ")");
						.attr("transform", "translate(" + x + "," + y + "), scale(1.5, 1.5), translate(" + -(x - x / 1.5) + "," + -(y - y / 1.5) + ")");
				})
				.on("mouseout", function(d) {
					d3.select(this)
					var x = -xPos - imgWidth *1.5 / 2;
					var y = -yPos - imgHeight * 1.5/ 2; 
					d3.select(this)
						//.attr("transform", "translate(" + x + "," + y + "), scale(1.0, 1.0), translate(" + (- x  - imgWidth  / 2) + "," + (-y  - imgHeight  2)+ ")");
						.attr("transform", "translate(" + x + "," + y + "), scale(1.0, 1.0), translate(" + -x + "," + -y + ")");
				});
	
}



