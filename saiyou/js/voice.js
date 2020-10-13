$('.voice-bttn .voice-tab').on('click', function() {
    if(!$(this).is('active')) {
        $('.voice-bttn .voice-tab').removeClass('active');
        $('.trans-tap .voice-main').removeClass('active')
        $(this).addClass('active');
        $('.trans-tap .voice-main').eq($(this).data('order')).addClass('active');
        // console.log($(this).data('order'));
    }
})


// not run browser internet explorer

let dataColor = ['#b0dd1e', '#f2e54a', '#008ea0', '#ff8a16', '#ae5291', '#ed43ac', '#a3588e']
var pie = d3.pie().value(function(d){return d;}).sort(null);

class createPie {
    constructor(id, radius, data) {
        this._radius = radius;
        this._id = id;
        this._data = data;
        this._arc = d3.arc().innerRadius(0).outerRadius(radius);
        this._svg = (()=>{
            return d3.select('#' + this._id).style('width', this._radius * 2).style('height', this._radius * 2).attr('viewBox', '0 0 ' + this._radius * 2 + ' ' + this._radius * 2).append('g').attr('class', this._id + '_chart').attr('transform', 'translate(' + this._radius + ',' + this._radius + ')');
        })();
        this._draw = (()=>{
            return this._svg.selectAll('.arc')
            .data(pie(this._data))
            .enter()
            .append('g')
            .lower()
            .attr('class', function(d,i) {
                return 'arc' + i;
            }).append('path')
            .style('fill', function(d,i) {
                return dataColor[i];
            });
        })();
    }
    add_text(img, tranx, trany) {
        this._svg.append('g')
            .attr('transform','translate(' + (tranx - this._radius) + ',' + (trany - this._radius) + ')')
            .attr('class',' group-img')
            .append('image')
            .attr('href', img)
            .style('opacity', 0)
            // .attr('transform','translate(' + (tranx - this._width) + ',' + (trany - this._height) + ')')
            .attr('transform', 'translate(0, 20)')
    }
    pathTween() {
        this._svg.selectAll('path')
            .transition()
            .attrTween('d', (d) => {
                var i = d3.interpolate(0, d.endAngle);
                return (t)=>{
                    d.startAngle = 0;
                    d.endAngle = i(t);
                    return this._arc(d);
                };
            }).duration(1500)
            .end();
        this._svg.selectAll('.group-img image')
            .transition()
            .duration(1000)
            .delay(800)
            .style('opacity', 1)
            .attr('transform', 'translate(0, 0)')
    }
}

class createBarChart {
    constructor(width, height, id) {
        this._width = width;
        this._height = height; 
        this._id = id;
        this._Bar = (()=>{
            return d3.select('#' + this._id).style('width', this._width).style('height', this._height).attr('viewBox', '0 0 ' + this._width + ' ' + this._height).append('g').attr('class', this._id + '_chart');
        })();
    }
    setX_Y(data_Y) {
        this._yScale = (()=> {
            return d3.scaleLinear()
                .domain([d3.min(data_Y), d3.max(data_Y)])
                .range([this._height - 115, 0]);
        })();
        var y_axis = d3.axisLeft()
            .scale(this._yScale)
            .ticks(5);
        this._Bar.append('g')
            .attr('class', 'y_axis')
            .attr("transform", "translate(50, 10)")
            .call(y_axis);
        // this._Bar.append('g')
        //     .attr("transform", "translate(50, 10)").attr("transform", "translate(50," + (this._height - 105) + ")")
        //     .attr('class', 'x_axis')
        //     .call(x_axis);
        this._Bar.append('g')
            .attr("transform", "translate(50, 10)")
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(this._yScale)
                .ticks(5)
                .tickSize(-this._width, 0, 0)
                .tickFormat(''))
        this._Bar.selectAll('.domain')
            .attr('opacity', 0)
        this._Bar.select('.y_axis').selectAll('.tick line')
            .attr('opacity', 0)
        this._Bar.select('.y_axis')
            .attr('font-size', '16px')
            .attr('font-family', '"Noto Sans JP", sans-serif')
    }
    draw(data) {
        this._X = data;
        this._xScale = (()=>{
            return d3.scaleBand()
                .range([0, this._width - 190])
                .domain(this._X)
                .padding(0.2);
        })();
        this._Bar.append('g')
            .attr('class', 'group-react')
            .attr("transform", "translate(80, 0)")
            .selectAll('rect')
            .data(this._X)
            .enter()
            .append('rect')
            .attr('fill', '#b0dd1e')
            .attr('x', (d,i) => {return this._xScale.step() * i})
            .attr('y', (d) => {return this._yScale(d)})
            .attr('width', this._xScale.bandwidth())
            .attr('height', (d) => this._height - 105 - this._yScale(d))
    }
    add_text(img, tranx, trany) {
        this._Bar.append('g')
            .attr('transform','translate(' + tranx + ',' + trany + ')')
            .attr('class',' group-img')
            .append('image')
            .attr('href', img)
            // .style('opacity', 0)
            // .attr('transform','translate(' + (tranx - this._width) + ',' + (trany - this._height) + ')')
            .attr('transform', 'translate(0, 20)')
    }
}


let diagram1 = new createPie('diagram1', 150, [38, 11]);
diagram1.add_text('../..//images/voice/voice1/img_text_pie1.png', 55, 55)
diagram1.pathTween();

let diagram2 = new createPie('diagram2', 150, [36, 13]);
diagram2.add_text('../..//images/voice/voice1/img_text_pie2.png', 55, 55)
diagram2.pathTween();

let diagram3 = new createPie('diagram3', 150, [9, 6, 11, 7, 3, 13]);
diagram3.add_text('../..//images/voice/voice1/img_text_pie3.png', 12, 55)
diagram3.pathTween();

let diagram4 = new createPie('diagram4', 250, [64, 12, 10, 4, 10]);
diagram4.add_text('../..//images/voice/voice1/img_text_pie4.png', 35, 30)
diagram4.pathTween();

let diagram6 = new createPie('diagram6', 250, [74, 13, 13]);
diagram6.add_text('../..//images/voice/voice1/img_text_pie5.png', 40, 48)
diagram6.pathTween();

let diagram7 = new createBarChart(640, 415, 'diagram7');
diagram7.setX_Y([0, 10, 20, 30, 40]);
diagram7.draw([34, 27, 21, 16, 13, 11, 8, 8, 8, 7, 1]);
diagram7.add_text('../../images/voice/voice1/img_text_chart2.png', 89, 295);