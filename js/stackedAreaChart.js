// stackedAreaChart.js
class StackedAreaChart {
  constructor(_parentElement) {
    this.parentElement = _parentElement

    this.initVis()
  }

  initVis() {
    const vis = this

    vis.MARGIN = { LEFT: 80, RIGHT: 100, TOP: 50, BOTTOM: 40 }
    vis.WIDTH = 1000 - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = 370 - vis.MARGIN.TOP - vis.MARGIN.BOTTOM

    vis.svg = d3.select(vis.parentElement).append("svg")
      .attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
      .attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

    vis.g = vis.svg.append("g")
      .attr("transform", `translate(${vis.MARGIN.LEFT}, ${vis.MARGIN.TOP})`)

    vis.color = d3.scaleOrdinal(d3.schemeSet3)

    vis.x = d3.scaleTime().range([0, vis.WIDTH])
    vis.y = d3.scaleLinear().range([vis.HEIGHT, 0])

    vis.yAxisCall = d3.axisLeft()
    vis.xAxisCall = d3.axisBottom()
      .ticks(4)
    vis.xAxis = vis.g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${vis.HEIGHT})`)
    vis.yAxis = vis.g.append("g")
      .attr("class", "y axis")

    vis.stack = d3.stack()
      .keys(["Rock", "Pop", "Country", "HipHop", "Folk",  "RnB", "Metal", "Blues", "Electronic", "Chanson", "Other"])

    vis.area = d3.area()
      .x(d => vis.x(parseTime(d.data.date)))
      .y0(d => vis.y(d[0]))
      .y1(d => vis.y(d[1]))

    vis.addLegend()
    vis.wrangleData()
  }

  wrangleData() {
    const vis = this

    vis.variable = $("#var-select").val()
    vis.dayNest = d3.nest()
      .key(d => formatTime(d.date))
      .entries(calls)

    vis.dataFiltered = vis.dayNest
      .map(day => day.values.reduce(
        (accumulator, current) => {
            accumulator.date = day.key
            accumulator[current.team] = accumulator[current.team] + current[vis.variable]
            return accumulator
        }, {
          "Rock": 0,
          "Pop": 0,
          "Country": 0,
          "HipHop": 0,
          "Folk": 0,
          "RnB": 0,
          "Metal": 0,
          "Blues": 0,
          "Electronic": 0,
          "Chanson": 0,
          "Other": 0
        }
      ))

    vis.updateVis()
  }

  updateVis() {
    const vis = this

    vis.t = d3.transition().duration(750)

    vis.maxDateVal = d3.max(vis.dataFiltered, d => {
      var vals = d3.keys(d).map(key => key !== 'date' ? d[key] : 0)
      return d3.sum(vals)
    })

    vis.sum_f = d3.sum(vis.dataFiltered, d => {
      var vals = d3.keys(d).map(key => key !== 'date' ? d[key] : 0)
      return d3.sum(vals)
    })

    // update scales
    vis.x.domain(d3.extent(vis.dataFiltered, (d) => parseTime(d.date)))
    vis.y.domain([0, vis.maxDateVal])

    // update axes
    vis.xAxisCall.scale(vis.x)
    vis.xAxis.transition(vis.t).call(vis.xAxisCall)
    vis.yAxisCall.scale(vis.y)
    vis.yAxis.transition(vis.t).call(vis.yAxisCall)

    vis.teams = vis.g.selectAll(".team")
      .data(vis.stack(vis.dataFiltered))
    
    // update the path for each team
    vis.teams.select(".area")
      .attr("d", vis.area)

    // Tooltip
    vis.tip = d3.tip()
      .attr('class', 'd3-tip')
        .html(d => {
          let text = `<strong>Genre:</strong> <span style='color:red;text-transform:capitalize'>${d.key}</span><br>`
          // text += `<strong>Count:</strong> <span style='color:red;text-transform:capitalize'>${vis.sum_f}</span><b>`
            return text
        })
    vis.g.call(vis.tip)

    vis.teams.enter().append("g")
      .attr("class", d => `team ${d.key}`)
      .append("path")
        .on("mouseover", vis.tip.show)
        .on("mouseout", vis.tip.hide)
        .attr("class", "area")
        .attr("d", vis.area)
        .style("fill", d => vis.color(d.key))
        .style("fill-opacity", 0.7)

    //     // What to do when one group is hovered
    // vis.highlight = function(d){
    //   console.log(d)
    //   // reduce opacity of all groups
    //   vis.teams.select(".area").style("opacity", .1)
    //   // expect the one that is hovered
    //   vis.teams.select("."+d).style("opacity", 1)
    // }
    //
    // // And when it is not hovered anymore
    // vis.noHighlight = function(d){
    //   vis.teams.select(".area").style("opacity", 1)
    // }
  }

  addLegend() {
    const vis = this

    const legend = vis.g.append("g")
      .attr("transform", "translate(800, -60)")

    const legendArray = [
      { label: "Rock", color: vis.color("Rock") },
      { label: "Pop", color: vis.color("Pop") },
      { label: "Country", color: vis.color("Country") },
      { label: "HipHop", color: vis.color("HipHop") },
      { label: "Folk", color: vis.color("Folk") },
      { label: "RnB", color: vis.color("RnB") },
      { label: "Metal", color: vis.color("Metal") },
      { label: "Blues", color: vis.color("Blues") },
      { label: "Electronic", color: vis.color("Electronic") },
      { label: "Chanson", color: vis.color("Chanson") },
      { label: "Other", color: vis.color("Other")}
    ]

    const legendRow = legend.selectAll(".legendRow")
      .data(legendArray)
      .enter().append("g")
        .attr("class", "legendRow")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)


    legendRow.append("rect")
      .attr("class", "legendRect")
      .attr("width", 10)
      .attr("height", 10)
        .attr("x", 30)
        .attr("y", 90)
      .attr("fill", d => d.color)
      .attr("fill-opacity", 0.7)


    legendRow.append("text")
      .attr("class", "legendText")
      .attr("x", 50)
      .attr("y", 100)
      .attr("text-anchor", "start")
      .text(d => d.label)

  }
}