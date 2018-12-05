var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
d3.csv("assets/data/data.csv").then(function(stateData, error) {
    if (error) return console.warn(error);
	console.log(stateData);
	
	stateData.forEach(function(data){
		data.poverty = +data.poverty;
		data.povertyMoe = +data.povertyMoe;
		data.age = +data.age;
		data.ageMoe = +data.ageMoe;
		data.income = +data.income;
		data.incomeMoe = +data.incomeMoe;
		data.healthcare = +data.healthcare;
		data.healthcareLow = +data.healthcareLow;
		data.healthcareHigh = +data.healthcareHigh;
		data.obesity = +data.obesity;
		data.obesityLow = +data.obesityLow;
		data.obesityHigh = +data.obesityHigh;
		data.smokes = +data.smokes;
		data.smokesLow = +data.smokesLow;
		data.smokesHigh = +data.smokesHigh;
	});
    
	var xLinearScale = d3.scaleLinear()
      .domain([d3.min(stateData, d => d.poverty)-1, d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.healthcare)+2])
      .range([height, 0]);
	  
	var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
	
	chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
	
	var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".5");
	
	var labels = chartGroup.selectAll("text")
	.data(stateData)
	.enter()
	.append("text")
	.text(d => d.abbr)
	.attr("x", d => xLinearScale(d.poverty)-10)
	.attr("y", d => yLinearScale(d.healthcare)+4)
	.attr("fill","white");
	
	
	
	
	chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
      .attr("class", "axisText")
      .text("Poverty (%)");

	
	
  });

  
  
  


