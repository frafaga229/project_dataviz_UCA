//Spiralchart
class SpiralChart {
    constructor(_parentElement, _variable) {
		this.parentElement = _parentElement

		this.initVis()
	}
    initVis() {
        const vis = this

        vis.MARGIN = { LEFT: 5, RIGHT: 50, TOP: 50, BOTTOM: 30 }
        vis.WIDTH = 500 - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
        vis.HEIGHT = 500 - vis.MARGIN.TOP - vis.MARGIN.BOTTOM
        vis.START = 0
        vis.END = 2.25
        vis.NUMSPIRALS = 2

        vis.svg = d3.select(vis.parentElement).append("svg")
            .attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
            .attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

        vis.g = vis.svg.append("g")
            .attr("transform", `translate(${vis.MARGIN.LEFT + (vis.WIDTH / 2)},
        ${vis.MARGIN.TOP + (vis.HEIGHT / 2)})`)

        // Tooltip
        const tip = d3.tip()
          .attr('class', 'd3-tip')
            .html(d => {
                let text = `<strong>Date:</strong> <span style='color:red;text-transform:capitalize'>${d.date}</span><br>`
		        text += `<strong>Artists:</strong> <span style='color:red;text-transform:capitalize'>${d.value}</span><br>`
                return text
            })
        vis.g.call(tip)

        var theta = function(r) {
            return vis.NUMSPIRALS * Math.PI * r;
        };

        // var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var color = d3.scaleOrdinal()
      .domain([1, 20])
      // .range(['#1383EC', '#EC7C13']);
        .range(['#7AD5FF', '#FFA57A']);
        var r = d3.min([vis.WIDTH, vis.HEIGHT]) / 2 - 40;

        var radius = d3.scaleLinear()
            .domain([vis.START, vis.END])
            .range([40, r]);

        var points = d3.range(vis.START, vis.END + 0.001, (vis.END - vis.START) / 1000);

        var spiral = d3.radialLine()
            .curve(d3.curveCardinal)
            .angle(theta)
            .radius(radius);

        var path = vis.g.append("path")
            .datum(points)
            .attr("id", "spiral")
            .attr("d", spiral)
            .style("fill", "none")
            .style("stroke", "steelblue");

        var spiralLength = path.node().getTotalLength(),
            N = 137,
            barWidth = (spiralLength / N) - 1;

        var someData = [{"date":1880,"value":1,"group":1},{"date":1881,"value":1,"group":1},{"date":1882,"value":6,"group":1},{"date":1883,"value":3,"group":1},{"date":1884,"value":4,"group":1},{"date":1885,"value":3,"group":1},{"date":1886,"value":5,"group":1},{"date":1887,"value":6,"group":1},{"date":1888,"value":6,"group":1},{"date":1889,"value":7,"group":1},{"date":1890,"value":10,"group":2},{"date":1891,"value":15,"group":2},{"date":1892,"value":9,"group":2},{"date":1893,"value":15,"group":2},{"date":1894,"value":16,"group":2},{"date":1895,"value":22,"group":2},{"date":1896,"value":18,"group":2},{"date":1897,"value":20,"group":2},{"date":1898,"value":27,"group":2},{"date":1899,"value":19,"group":2},{"date":1900,"value":21,"group":3},{"date":1901,"value":29,"group":3},{"date":1902,"value":27,"group":3},{"date":1903,"value":31,"group":3},{"date":1904,"value":33,"group":3},{"date":1905,"value":25,"group":3},{"date":1906,"value":33,"group":3},{"date":1907,"value":34,"group":3},{"date":1908,"value":43,"group":3},{"date":1909,"value":35,"group":3},{"date":1910,"value":41,"group":4},{"date":1911,"value":33,"group":4},{"date":1912,"value":32,"group":4},{"date":1913,"value":53,"group":4},{"date":1914,"value":55,"group":4},{"date":1915,"value":52,"group":4},{"date":1916,"value":35,"group":4},{"date":1917,"value":51,"group":4},{"date":1918,"value":39,"group":4},{"date":1919,"value":46,"group":4},{"date":1920,"value":55,"group":5},{"date":1921,"value":55,"group":5},{"date":1922,"value":60,"group":5},{"date":1923,"value":58,"group":5},{"date":1924,"value":74,"group":5},{"date":1925,"value":87,"group":5},{"date":1926,"value":75,"group":5},{"date":1927,"value":78,"group":5},{"date":1928,"value":93,"group":5},{"date":1929,"value":91,"group":5},{"date":1930,"value":79,"group":6},{"date":1931,"value":75,"group":6},{"date":1932,"value":96,"group":6},{"date":1933,"value":84,"group":6},{"date":1934,"value":101,"group":6},{"date":1935,"value":96,"group":6},{"date":1936,"value":107,"group":6},{"date":1937,"value":119,"group":6},{"date":1938,"value":127,"group":6},{"date":1939,"value":154,"group":6},{"date":1940,"value":174,"group":7},{"date":1941,"value":178,"group":7},{"date":1942,"value":188,"group":7},{"date":1943,"value":201,"group":7},{"date":1944,"value":219,"group":7},{"date":1945,"value":226,"group":7},{"date":1946,"value":241,"group":7},{"date":1947,"value":278,"group":7},{"date":1948,"value":247,"group":7},{"date":1949,"value":233,"group":7},{"date":1950,"value":216,"group":8},{"date":1951,"value":220,"group":8},{"date":1952,"value":235,"group":8},{"date":1953,"value":229,"group":8},{"date":1954,"value":197,"group":8},{"date":1955,"value":224,"group":8},{"date":1956,"value":245,"group":8},{"date":1957,"value":211,"group":8},{"date":1958,"value":237,"group":8},{"date":1959,"value":240,"group":8},{"date":1960,"value":241,"group":9},{"date":1961,"value":241,"group":9},{"date":1962,"value":311,"group":9},{"date":1963,"value":273,"group":9},{"date":1964,"value":335,"group":9},{"date":1965,"value":311,"group":9},{"date":1966,"value":347,"group":9},{"date":1967,"value":386,"group":9},{"date":1968,"value":417,"group":9},{"date":1969,"value":459,"group":9},{"date":1970,"value":467,"group":10},{"date":1971,"value":389,"group":10},{"date":1972,"value":451,"group":10},{"date":1973,"value":428,"group":10},{"date":1974,"value":423,"group":10},{"date":1975,"value":464,"group":10},{"date":1976,"value":507,"group":10},{"date":1977,"value":543,"group":10},{"date":1978,"value":563,"group":10},{"date":1979,"value":606,"group":10},{"date":1980,"value":585,"group":11},{"date":1981,"value":600,"group":11},{"date":1982,"value":549,"group":11},{"date":1983,"value":518,"group":11},{"date":1984,"value":494,"group":11},{"date":1985,"value":539,"group":11},{"date":1986,"value":576,"group":11},{"date":1987,"value":552,"group":11},{"date":1988,"value":536,"group":11},{"date":1989,"value":657,"group":11},{"date":1990,"value":568,"group":12},{"date":1991,"value":603,"group":12},{"date":1992,"value":669,"group":12},{"date":1993,"value":710,"group":12},{"date":1994,"value":773,"group":12},{"date":1995,"value":805,"group":12},{"date":1996,"value":838,"group":12},{"date":1997,"value":818,"group":12},{"date":1998,"value":834,"group":12},{"date":1999,"value":818,"group":12},{"date":2000,"value":782,"group":13},{"date":2001,"value":826,"group":13},{"date":2002,"value":801,"group":13},{"date":2003,"value":866,"group":13},{"date":2004,"value":833,"group":13},{"date":2005,"value":802,"group":13},{"date":2006,"value":653,"group":13},{"date":2007,"value":522,"group":13},{"date":2008,"value":411,"group":13},{"date":2009,"value":324,"group":13},{"date":2010,"value":260,"group":13},{"date":2011,"value":220,"group":13},{"date":2012,"value":132,"group":13},{"date":2013,"value":86,"group":13},{"date":2014,"value":32,"group":13},{"date":2015,"value":15,"group":13},{"date":2016,"value":1,"group":13}]

        var timeScale = d3.scaleTime()
            .domain(d3.extent(someData, function(d){
                return d.date;
            }))
            .range([0, spiralLength]);

        // yScale for the bar height
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(someData, function(d){
                return d.value;
            })])
            .range([0, (r / vis.NUMSPIRALS) - 30]);

        vis.g.selectAll("rect")
            .data(someData)
            .enter()
            .append("rect")
              .attr("x", function(d,i){

                var linePer = timeScale(d.date),
                    posOnLine = path.node().getPointAtLength(linePer),
                    angleOnLine = path.node().getPointAtLength(linePer - barWidth);

                d.linePer = linePer; // % distance are on the spiral
                d.x = posOnLine.x; // x postion on the spiral
                d.y = posOnLine.y; // y position on the spiral

                d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

                return d.x;
              })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
                .attr("y", function(d){
                return d.y;
              })
              .attr("width", function(d){
                return barWidth;
              })
              .attr("height", function(d){
                return yScale(d.value);
              })
              .style("fill", function(d){return color(d.group);})
              .style("stroke", "none")
              .attr("transform", function(d){
                return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
              });
            // add date labels
        vis.g.selectAll("text")
          .data(someData)
          .enter()
          .append("text")
          .attr("dy", 10)
          .style("text-anchor", "start")
          .style("font", "10px arial")
          .append("textPath")
          // only add for the first of each month
          .filter(function(d){
            if (d.date % 10 == 0) {
                return true;
            }
            return false;
          })
          .text(function(d){
            return d.date;
          })
          // place text along spiral
          .attr("xlink:href", "#spiral")
          .style("fill", "grey")
          .attr("startOffset", function(d){
            return ((d.linePer / spiralLength) * 100) + "%";
          })
    }

}