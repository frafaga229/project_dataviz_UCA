//donutChart.js
class DonutChart {
	constructor(_parentElement, _variable) {
		this.parentElement = _parentElement
		this.variable = _variable

		this.initVis()
	}

	initVis() {
    const vis = this

		vis.MARGIN = { LEFT: 40, RIGHT: 100, TOP: 80, BOTTOM: 10 }
		vis.WIDTH = 550 - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = 400 - vis.MARGIN.TOP - vis.MARGIN.BOTTOM
    vis.RADIUS = Math.min(vis.WIDTH, vis.HEIGHT) / 2
		
		vis.svg = d3.select(vis.parentElement).append("svg")
			.attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
			.attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)
		
		vis.g = vis.svg.append("g")
      .attr("transform", `translate(${vis.MARGIN.LEFT + (vis.WIDTH / 2)},
        ${vis.MARGIN.TOP + (vis.HEIGHT / 2)})`)

    vis.pie = d3.pie()
      .padAngle(0.03)
      .value(d => d.count)
      .sort(null)
    
    vis.arc = d3.arc()
      .innerRadius(vis.RADIUS - 15)
      .outerRadius(vis.RADIUS)

    vis.myData = ["United States", "England", "Canada", "United Kingdom", "Finland", "Italy", "Other", "Australia", "France", "Germany", "Sweden"]
    vis.color = d3.scaleOrdinal()
      .domain(vis.myData)
      .range(['#36a447', '#43c156', '#5bc96c', '#74d183', '#8dd999', '#a1e0aa', '#afe5b7', '#c1ebc8', '#d0efd5', '#d9f2dd', '#eaf8ec']);

    vis.addLegend()

		vis.wrangleData()
	}

	wrangleData() {
		const vis = this

    const sizeNest = d3.nest()
      .key(d => d.company_size)
      .entries(calls)
    vis.dataFiltered = sizeNest.map(size => {
      return {
        value: size.key,
        count: size.values.length
      }
    })

		vis.updateVis()
	}

	updateVis() {
    const vis = this
    // vis.color = d3.scaleQuantize([d3.min(d.data.count), d3.max(d.data.count)], d3.schemeBlues[9])
    vis.t = d3.transition().duration(750)

    vis.sum_all = d3.sum(vis.dataFiltered, d => {
      var vals = d3.keys(d).map(key => key !== 'value' ? d[key] : 0)
      return d3.sum(vals)
    })
    vis.sum_final = d3.sum(vis.dataFiltered, d => {
      return vis.sum_all
    })
    vis.path = vis.g.selectAll("path")
      .data(vis.pie(vis.dataFiltered))

    vis.path.transition(vis.t)
      .attrTween("d", arcTween)

    // Tooltip
    vis.tip = d3.tip()
      .attr('class', 'd3-tip')
        .html(d => {
            let text = `<strong>Country:</strong> <span style='color:red;text-transform:capitalize'>${d.data.value}</span><br>`
            text += `<strong>Artists:</strong> <span style='color:red;text-transform:capitalize'>${d.data.count*3}</span><br>`
            return text
        })
    vis.g.call(vis.tip)

    vis.path.enter().append("path")
        .on("mouseover", vis.tip.show)
        .on("mouseout", vis.tip.hide)
      .attr("fill", d => vis.color(d.data.value))
      .transition(vis.t)
        .attrTween("d", arcTween)



    function arcTween(d) {
      const i = d3.interpolate(this._current, d)
      this._current = i(1)
      return (t) => vis.arc(i(t))
    }


  }

  addLegend() {
	  const vis = this

    const legend = vis.g.append("g")
      .attr("transform", "translate(180, -30)")
vis.myData = ["United States", "England", "Canada", "United Kingdom", "Finland", "Italy", "Other", "Australia", "France", "Germany", "Sweden"]
    const legendArray = [
    	{ label: "United States", color: vis.color("United States") },
    	{ label: "England", color: vis.color("England") },
        { label: "Canada", color: vis.color("Canada") },
        { label: "United Kingdom", color: vis.color("United Kingdom") },
        { label: "Finland", color: vis.color("Finland") },
    	{ label: "Italy", color: vis.color("Italy") },
        { label: "Other", color: vis.color("Other") },
        { label: "Australia", color: vis.color("Australia") },
        { label: "France", color: vis.color("France") },
        { label: "Germany", color: vis.color("Germany") },
    	{ label: "Sweden", color: vis.color("Sweden") }
	  ]

    const legendRow = legend.selectAll(".legendRow")
      .data(legendArray)
      .enter().append("g")
        // .on("mouseover", tip.show)
        // .on("mouseout", tip.hide)
        .attr("class", "legendRow")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`)
        
    // legendRow.append("rect")
    //   .attr("class", "legendRect")
    //   .attr("width", 10)
    //   .attr("height", 10)
    //     .attr("x", -140)
    //     .attr("y", -65)
    //   .attr("fill", d => d.color)

    legendRow.append("text")
      .attr("class", "legendText")
      .attr("x", -180)
      .attr("y", -55)
      .attr("text-anchor", "middle")

      .text(d => d.label) 
  }
}
