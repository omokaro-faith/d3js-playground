var dataset = [1, 2, 3, 4, 5];

var svgWidth = 500, svgHeight = 300, padding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Working with scale
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([0, svgHeight]);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", (item) => {
      return svgHeight - yScale(item);
    })
    .attr("height", (itemHeight) => {
      return yScale(itemHeight)
    })
    .attr("width", barWidth - padding)
    .attr("transform", (item, index) => {
      var translate = [barWidth * index, 0]
      return "translate("+ translate + ")";
    })
    .attr("fill", "teal")


svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((item) => {
    return item;
  })
  .attr("y", (d) => {
    return svgHeight - d - 2;
  })
  .attr("x", (d, index) => {
    return barWidth * index;
  })
  .attr("fill", "#A64C38");
