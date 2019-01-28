const diameter = 960,
    format = d3.format(",d"),
    color = d3.scale.category20c();


const bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");
    
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");

d3.json("data2.json", (error, root) => {
  const node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter( d => { 
        return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => { 
        return "translate(" + d.x + "," + d.y + ")"; 
      });

  node.append("circle")
      .attr("r", d => { 
        return d.r; })
      .style("fill", d => { return color(d.packageName); })
      .on("mouseover", d => {
              tooltip.text(d.className + ": " + format(d.value));
              tooltip.style("visibility", "visible");
      })
      .on("mousemove", () => {
          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      })
      .on("mouseout", () => {return tooltip.style("visibility", "hidden");});

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .text( d => { return d.className.substring(0, d.r / 3); });
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
const classes = root => {
  var classes = [];

const recurse = (name, node) => {
    if (node.children) node.children.forEach( child => { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");