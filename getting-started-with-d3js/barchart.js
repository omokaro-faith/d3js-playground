var svg = d3.select('svg');
const data = [80, 120, 60, 150, 200];
var barHeight = 20;

svg.selectAll('rect')
   .data(data)
   .enter()
   .append('rect')
   .attr('x', 500)
   .attr('y', 50)
   .attr('width', (item) => {
     return item;
   })
   .attr('height', barHeight - 1)
   .attr('transform', (item, index) => {
     return "translate(0," + index * barHeight + ")";
   });
