var today = new Date()
var start_date = new Date(1993,11,23)

var all_years = generateYearsBetween(start_date.getFullYear(), today.getFullYear())
var years;
var svg = d3.select('.svg_container svg')


var svg_width = svg.node().getBoundingClientRect().width
var svg_height = svg.node().getBoundingClientRect().height

svg.attr('viewBox', `0 0 ${svg_width} ${svg_height}`)

var pathpoints = []

createPath()


function createPath(){

    const group = svg.append("g")
  
    const lineGenerator = d3.line()
            .curve(d3.curveCardinal);

    const path_pitchx = 20
    const path_pitchy = 20

    let wave_turns = 6
    let space = svg_width/wave_turns
    for (let turns = 0; turns < wave_turns; turns++) {
        let check = turns % 2
        
        if (check == 0) {
            pathpoints.push([turns * space + path_pitchx, 500])
            pathpoints.push([turns * space + 150 + path_pitchy, 500])
        }
        else {
            pathpoints.push([turns * space + path_pitchx, 100])
            pathpoints.push([turns * space + 150 + path_pitchy, 100])
        }
    }
    pathpoints[0][1] = pathpoints[0][1] + 50
    pathpoints[pathpoints.length - 1][1] = pathpoints[pathpoints.length - 1][1] - 50

    const pathData = lineGenerator(pathpoints);
    group
        .append('path')
        .attr('d', pathData)
        .style('stroke-width', 20)
        .style("opacity", .3)
        .style("fill", "none")
        .style("stroke", d3.rgb(100, 100, 100));

}

function chooseRandom(arr, num = 1) {
    const res = [];
    for(let i = 0; i < num; i++){
    //    const random = Math.floor(Math.random() * arr.length);
       if(res.indexOf(arr[i + 2]) !== -1){
          continue;
       };
       res.push({x: arr[i + 2][0], y: arr[i + 2][1]});
    };
    res.sort((a, b) => a.x - b.x);

    return res;
 };


$.getJSON('js/journey.json', function(data) {         
    years = getYears(data)
    let points = chooseRandom(pathpoints, 8)
    console.log(points)
    let nodes = years.map((a, i) => {
        const year_present = years.indexOf(a)
        const r = d3.randomInt(1, 10)()
        console.log(points[i],i)
        return {
          x: points[i]['x'],
          y: points[i]['y'],
          r: years.indexOf(a) < 0 ? 5 : 30 ,
          year : a,
          stage : year_present
        };
      });
    
    createCircles(nodes)
});

function createCircles(nodes){

    let n = nodes.length
        svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .style("stroke", "gray")
        .style("fill", d => {return d.stage < 0 ? 'black': 'gray'})
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.r)

        svg.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .text(d => d.year)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
}


function getYears(data){
    let years = []
    for (var i = 0; i < data.length; i++) {
        years.push(new Date(data[i]['toDate']).getFullYear());
      }
      return years;
}


function generateYearsBetween(startYear, endYear) {
    const endDate = endYear
    let years = [];
    for (var i = startYear; i <= endDate; i++) {
      years.push(startYear);
      startYear++;
    }
    return years;
  }