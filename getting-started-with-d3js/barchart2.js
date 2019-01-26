var dataset = [80, 100, 56, 20, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300, padding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", (item) => {
      return svgHeight - item;
    })
    .attr("height", (itemHeight) => {
      return itemHeight
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