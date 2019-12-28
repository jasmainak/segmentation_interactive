var data = [];

d3.json("./tsne.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  scatter_tsne();
});

function scatter_tsne(){

    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 550 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;
    
    var x = d3.scale.linear()
              .domain([d3.min(data['x']), d3.max(data['x'])])
              .range([ 0, width ]);
    
    var y = d3.scale.linear()
            .domain([d3.min(data['y']), d3.max(data['y'])])
            .range([ height, 0 ]);

    var table_tr = d3.select('body').append('table').append('tr');

    var chart = table_tr.append('td')
  .append('svg:svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'chart')

    var main = chart.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .attr('width', width)
  .attr('height', height)
  .attr('class', 'main')   
        
    // draw the x axis
    var xAxis = d3.svg.axis()
  .scale(x)
  .orient('bottom');

    main.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .attr('class', 'main axis date')
  .call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
  .scale(y)
  .orient('left');

    main.append('g')
  .attr('transform', 'translate(0,0)')
  .attr('class', 'main axis date')
  .call(yAxis);

    var g = main.append("svg:g"); 
    
    var image = table_tr.append('td').insert('div').attr('id', 'image');

    g.selectAll("scatter-dots")
      .data(data['x'])
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d3.format(".2f")(data['x'][i])); } )
          .attr("cy", function (d,i) { return y(d3.format(".2f")(data['y'][i])); } )
          .attr("r", 4)
          .attr("id", function(d, i){ return i;})
          .on("mouseover", function(d, i){
           var img_html = "<img src ='https://raw.githubusercontent.com/jasmainak/segmentation_interactive/master/jpeg-mias/" + data['fnames'][i] + "' width='200'></img>"
           document.getElementById('image').innerHTML = img_html;
           });

    // Added this to load all the images first so that response is not sluggish
    // when hovering over the points
    var preloader = d3.select('body').insert('div', ':first-child').attr('id', 'preloader');
    data['fnames'].forEach(function(d, i){
      preloadImage('./jpeg-mias/' + d);
      document.getElementById('preloader').innerHTML = '<h4> Preloading images ... ' + (i + 1).toString() + ' (' + d + ') </h4>';
    });
}

function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
