$("#main-nav li a[href^='#']").on('click', function (e) {
    console.log(e)
    // This sets the hash
    var target;
    target = this.hash;

    // Prevent default anchor click behavior
    e.preventDefault();

    // Animate The Scroll
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top
    }, 800, function () {

        // Adds hash to end of URL
        return window.history.pushState(null, null, target);

    });

});


$('#curTime').text(moment().format('MMM, DD YYYY'))

var birthDate = moment('12/23/1993', 'MM/DD/YYYY')
// render vega
var view;
fetch('../js/charts/timeline.json')
    .then(res => res.json())
    .then(spec => render(spec))
    .catch(err => console.error(err));

new vega.expressionFunction('calcAge', function (date) {
    let age = moment(date).diff(birthDate, 'years', false)
    return age
})

function render(spec) {
    let el = "#timeline_chart"
    $.getJSON('../js/charts/timeline_data.json').then(function (data) {
        console.log($(el).height())
        let chart_data = prepare_chart_data(data)
        _.find(spec.data, ['name', 'data']).values = chart_data
        var view = new vega.View(vega.parse(spec))
            .renderer('svg')
            // .logLevel(vega.Warn)
            .initialize(el)
            .width($(el).width())
            .height($(el).height())
            .hover()
            .run()
    })


}

function prepare_chart_data(data) {

    _.each(data, function (d) {
        d['fromDate'] = moment(d.fromDate, 'MM/DD/YYYY')._d
        d['toDate'] = moment(d.toDate, 'MM/DD/YYYY')._d
        d['age'] = _.round(moment(d.toDate).diff(birthDate, 'months', false) / 12, 1)
        d['ageText'] = moment(d.toDate).diff(birthDate, 'years', false) + ' years ' + moment(d.toDate).diff(birthDate, 'months', false) % 12 + ' months'
    })
    return data
}