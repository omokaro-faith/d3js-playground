const data = [
  {
    "id": 1,
    "income": "5000",
    "date": "2018-12-1"
  },
  {
    "id": 2,
    "income": "7000",
    "date": "2018-12-5"
  },
  {
    "id": 3,
    "income": "3000",
    "date": "2018-12-7"
  },
  {
    "id": 4,
    "income": "9000",
    "date": "2018-12-8"
  },
  {
    "id": 5,
    "income": "6800",
    "date": "2018-12-10"
  },
  {
    "id": 6,
    "income": "5500",
    "date": "2018-12-12"
  },
  {
    "id": 7,
    "income": "4000",
    "date": "2018-12-14"
  },
  {
    "id": 8,
    "income": "10000",
    "date": "2018-12-18"
  }
]

let svg = d3.select('svg');

const color = d3.schemeCategory20c;

let padding = { top: 200, right: 30, bottom: 30, left: 100 };

const chartArea = {
  "width": parseInt(svg.style("width")) - padding.left - padding.right,
  "height": parseInt(svg.style("height")) - padding.top - padding.bottom
};

const yScale = d3.scaleLinear()
                  .domain([ 0, d3.max(data, (d, i) => {
                    return d.income
                  })])
                  .range([chartArea.height, 0]).nice();

const xScale = d3.scaleBand()
                  .domain(data.map((d) => { return d.date }))
                  .range([ 0, chartArea.width ])
                  .padding(.2);

const xAxis = svg.append("g")
                .classed("xAxis", true)
                .attr(
                  'transform', 'translate(' + padding.left + ',' + (chartArea.height + padding.top) + ')'
                )
                .call(d3.axisBottom(xScale));

const yAxisFn = d3.axisLeft(yScale);
const yAxis = svg.append("g")
                  .classed("yAxis", true)
                  .attr(
                    'transform', 'translate(' + padding.left + ',' + padding.top + ')'
                  );

yAxisFn(yAxis);

//bars
let rectGrp = svg.append("g").attr(
  'transform', 'translate('+padding.left + ',' + padding.top + ')'
);

rectGrp.selectAll("rect").data(data)
                         .enter()
                         .append("rect")
                         .attr("width", xScale.bandwidth())
                         .attr("height", (d) => {
                           return chartArea.height - yScale(d.income);
                         })
                         .attr("x", (d) => {
                           return xScale(d.date);
                         })
                         .attr("y", (d) => {
                           return yScale(d.income)
                         })
                         .attr("fill", (d, i) => {
                           return color[i];
                         });