// Javascript file for the homepage.
var svgWidth = 1100;
var svgHeight = 50;

var tabs = ["Home", "Aviation", "Fire Rescue", "Medical Services", "Parks", "Police", "Public Works"];
var pages = ["aviation.html", "fire_rescue.html", "medical_services.html", "parks.html", "police.html", "public_works.html"];

var dataset = [ 25, 7, 5, 26, 11 ];

//displayMenu();

//function displayMenu(){
var svg = d3.select("body")
            .append("svg")
            .attr("width", 500)
            .attr("height", 50);
            
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");
    
circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
       .attr("cy", h/2)
       .attr("r", function(d) {
            return d;
       });

//}
