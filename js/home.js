var imageCanvasWidth = 1100;
var imageCanvasHeight = 750;

initialize();

function initialize() {
    d3.csv("csv/tab_data.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
            console.log(data);  
            tabsData = data;
            setLayout();
            setImages();

        }
    })	
}

function setLayout() {
				
	imageCanvas = d3.select("body")
 					.append("svg")
 					.attr("id", "icons")
 					.attr("width", imageCanvasWidth)
 					.attr("height", imageCanvasHeight);	
}    

function setImages() {	
	displayImage("plane", "home_images/plane.png", 625, 30, 238, 48, "aviation.html");
	displayImage("recycle", "home_images/recycle.png", 178, 215, 60, 53, "public_works.html");
	displayImage("badge", "home_images/badge.png", 804, 220, 41, 48, "police.html");
	displayImage("tree", "home_images/parks.png", 425, 220, 157, 148, "parks.html");
	displayImage("ambulance", "home_images/ambulance.png", 100, 375, 343, 175, "medical_services.html");
	displayImage("firetruck", "home_images/firetruck.png", 600, 335, 489, 236, "fire_rescue.html");
		
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
				})
				.attr("transform", function(d) {
					var x = -xPos - imgWidth / 2;
					var y = -yPos - imgHeight / 2;
					return "translate(" + x + "," + y + "), scale(1.5, 1.5), translate(" + -(x - x / 1.5) + "," + -(y - y / 1.5) + ")";					
				})
				.transition()
				.attr("transform", function(d) {
					var x = -xPos - imgWidth *1.5 / 2;
					var y = -yPos - imgHeight * 1.5/ 2;
					return "transform", "translate(" + x + "," + y + "), scale(1.0, 1.0), translate(" + -x + "," + -y + ")";
				})
				.duration(1000)
				.delay(300);
	
}





