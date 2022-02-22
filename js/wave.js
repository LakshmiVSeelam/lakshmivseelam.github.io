
// sn = import('https://unpkg.com/simplex-noise/dist/esm/simplex-noise.js')

var fetchRes = fetch('https://unpkg.com/simplex-noise/dist/esm/simplex-noise.js')
const {SimplexNoise} = require('https://unpkg.com/simplex-noise/dist/esm/simplex-noise.js');

// fetchRes.then(res => {
//     simplex = res.SimplexNoise()
//     drawWaves()
// })
simplex = res.SimplexNoise()


drawWaves()
function drawWaves(){
    width = 848
height = 500,
background="#000000",
strokeWidth = 20
preset = {
    animate: true,
    background: "#000000",
    mixBlendMode: "difference",
    strokeWidth: 20,
    amplitude: 10,
    curve: "Natural",
    palette: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
    speed: 4,
    waves: 10,
    frequency: 5
  }


xsAbsolute = d3.range(0, width + 1, width / (preset.frequency - 1)).map(Math.round);
ysNormalized = (waves) => Array.from({length: waves}, (_, i) => (2 * i + 1) / (2 * waves));

line = d3.line().curve(d3["curve" + preset.curve])
// takes a xsAbsolute, amplitude, time
// returns a function that takes yNormalized and returns an SVG path string
// that can be used inside a path d attribute
path = (xsAbsolute, amplitude, time) => (yNormalized) =>
line(
  wave(
    xsAbsolute,
    yNormalized * height, // === yAbsolute
    yNormalized,
    amplitude,
    time,
  )
)



scene = ({
    preset,
    background: preset.background,
    palette: preset.palette,
    mixBlendMode : preset.mixBlendMode,
    waves : preset.waves,
    strokeWidth : preset.strokeWidth,
    curve: preset.curve,
    frequency : preset.frequency,
    // a = 1 => stay w/i half available space per wave
    amplitude: preset.amplitude * height / 2 / preset.waves,
    speed : preset.speed,
    animate : preset.animate,
    xsAbsolute 
  })

// takes xsAbsolute, yAbsolute, yNormalized, amplitude, time
// returns list of absolute points for a single wave, ready for d3.line()
wave = (xsAbsolute, yAbsolute, yNormalized, amplitude, time) =>
xsAbsolute.map
(
  (xAbsolute, step) => 
  [
    xAbsolute,
    yAbsolute + amplitude * simplex.noise3D(step, yNormalized, time)
  ]
)

time = preset.animate
? d3.now() * preset.speed / 1e4
// ? 17
: 0

update = ({sketch, scene, time} = {}) =>
{
  const {amplitude, strokeWidth, palette, waves, mixBlendMode, xsAbsolute} = scene;
  sketch.selectAll("path")
    .data(ysNormalized(waves))
    .join(
      (pad) => pad
      .append("path") 
      .attr("stroke", (_, i) => palette[i % palette.length])
      .attr("stroke-width", strokeWidth)
      .attr("d",    path(xsAbsolute, amplitude, time))
      .style("mix-blend-mode",  mixBlendMode)
    );
}

sensitize = ({sketch} = {}) => {

    sketch.attr("cursor", "pointer");
  
    // sketch.on("mousemove", (event) => {
    //   const p = d3.pointer(event);
    //   set(frequency, 50 * p[0] / width);
    //   set(amplitude, 10 * (height - p[1]) / height);
    // })
    // console.log(sketch)
    return sketch;
  }

const sketch = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", background)
      .style("fill", "none")
      .style("stroke-width", strokeWidth)
      .style("stroke-linecap", "round")
      .style("mix-blend-mode",  preset.mixBlendMode)

    update({sketch, scene, time});
    return sensitize({sketch}).node();
}
