queue()
   .defer(d3.json, "/volunteerFunding/nyasFunding")
   .await(makeGraphs);

function makeGraphs(error, projectsJson) {

    var data = projectsJson;

    var dateFormat = d3.time.format("%Y-%m-%d");
    data.forEach(function (d) {
       d["financial_year"] = new dateFormat.parse(d["financial_year"]);
       d.Year = d["financial_year"].getFullYear();
    });

    var ndx = crossfilter(data);
    //Define dimensions
    var dateDim = ndx.dimension(function(d) {return d["financial_year"];});
    var incomeDateDim = ndx.dimension(function(d) {return d.Year;});

    //Define values to be used in charts
    var minDate = dateDim.bottom(1)[0]["financial_year"];
    var maxDate = dateDim.top(1)[0]["financial_year"];

    //Calculate metrics
    var annualIncomeTotal = dateDim.group().reduceSum(function(d) {return d["income_total"];});
    var annualExpensesTotal = dateDim.group().reduceSum(function(d) {return d["expenses_total"];});
    var endOfYearTotal = dateDim.group().reduceSum(function(d) {return d["total_funds_at_end_of_year"];});
    var incomeData = incomeDateDim.group().reduceSum(function(d) {return d["voluntary_income"];});


    var chartWidth = $("#annual-income-line-chart").width();
    var pieRadius = 90;
    if(chartWidth >= 480){
        pieRadius = 90;
    } else {
        pieRadius = chartWidth * 0.3;
    }
    //charts
    var incomeLineChart = dc.lineChart("#annual-income-line-chart");
    var expensesLineChart = dc.lineChart("#annual-expenses-line-chart");
    var endOfYearTotalLineChart = dc.lineChart("#end-of-year-total-chart");
    var voluntaryIncomePieChart = dc.pieChart("#annual-income-pie-chart");

    incomeLineChart
        .width(chartWidth-200).height(200)
        .margins({top: 10, right: 50, bottom: 40, left: 60})
        .dimension(dateDim)
        .group(annualIncomeTotal)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);

    expensesLineChart
        .width(chartWidth).height(200)
        .margins({top: 10, right: 50, bottom: 40, left: 60})
        .dimension(dateDim)
        .group(annualExpensesTotal)
        .brushOn(false)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);

    endOfYearTotalLineChart
        .width(chartWidth).height(200)
        .margins({top: 10, right: 50, bottom: 40, left: 60})
        .dimension(dateDim)
        .group(endOfYearTotal)
        .brushOn(false)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(5);

    voluntaryIncomePieChart
        .width(chartWidth).height(220)
       .radius(pieRadius)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(incomeDateDim)
       .group(incomeData);

    dc.renderAll();

}