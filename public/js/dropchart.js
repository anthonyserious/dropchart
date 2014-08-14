"use strict"

var dropchart = function() {
  var dropArea;
  var chartParent;
  var chartInputs = [];

  var colorSchemes = {
    none: [],
    first: ["#993350", "#055333", "#394600", "#90A437", "#277455"]
  }

  var defaultOptions = {
    title: "Untitled",
    colors: colorSchemes.first,
    backgroundColor: {
      stroke: '#055333',
      strokeWidth: 0
    }
  }

  var chartTypes = [
    "AreaChart",
    "BarChart",
    "BubbleChart",
    "CandlestickChart",
    "ColumnChart",
    "ComboChart",
    "GeoChart",
    "Histogram",
    "LineChart",
    "PieChart",
    "ScatterChart",
    "SteppedAreaChart"
  ];

  // build a single chart
  function drawAll(elem) {
    if(google) {
      google.load("visualization", "1.0", {
              packages:["corechart"],
              callback: function () {
                for (var i = 0; i < chartInputs.length; i++) {
                  elem.append(
                    '<div class="row">'
                    +'<div class="col-md-1">&nbsp;</div>'
                    + '<div class="col-md-10" align="center">'
                    +   '<div id="chartDiv'+i+'" class="chartDiv drop-shadow"></div>'
                    + '</div>'
                    +'<div class="col-md-1">&nbsp;</div>'
                    +'</div>');
                  var chartData = google.visualization.arrayToDataTable(chartInputs[i].values);
                  var func;
                  console.log(chartInputs[i].options);
                  if (chartInputs[i].options.chartType) {// && chartTypes[chartInputs[i].options.chartType]) {
                    console.log("yes");
                    func = google.visualization[chartInputs[i].options.chartType];
                  } else{
                    func = google.visualization["SteppedAreaChart"];
                  }
                  var chart = new func(document.getElementById("chartDiv"+i));
                  //google.visualization.events.addListener(chart, 'ready', function () {
                    //elem.innerHTML = '<img src="' + chart.getImageURI() + '">';
                    //console.log(elem.innerHTML);
                  //});
                  chart.draw(chartData, chartInputs[i].options);
                }
              }
          }
      );
    }
  }

  // When files are dropped, process them asynchronously and store the inputs in chartInputs[]
  function readFile(file) {
    var reader = new FileReader();
    var deferred = $.Deferred();
 
    reader.onload = function(evt) {
        deferred.resolve(evt.target.result);
    };
 
    reader.onerror = function() {
        deferred.reject(this);
    };

    reader.onload = function(evt) {
      var inData = JSON.parse(evt.target.result);
      var newOptions = {};

      // merge default and custom options
      for (var k in defaultOptions) {
        newOptions[k] = defaultOptions[k];
      }
      if (inData['options']) {
        for (var k in inData['options']) {
          newOptions[k] = inData['options'][k];
        }
      }
      var obj = {options: newOptions, values: inData['values']};
      chartInputs.push(obj);
      deferred.resolve(evt.target.result);
    }
 
    reader.readAsText(file);
    return deferred.promise();
  } // readFile()

  return {
    init:function(inDropArea, inChartParent)  {
      dropArea = inDropArea;
      chartParent = inChartParent;

      dropArea.on('dragover', function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
      });
      dropArea.on('dragenter', function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
      });

      dropArea.on('drop', function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        var chartChildren = chartParent.children();
        if (chartChildren) { chartChildren.remove(); }
        chartInputs = [];

        var promises = [];
        if(evt.originalEvent.dataTransfer){
          for (var i = 0; i < evt.originalEvent.dataTransfer.files.length; i++) {
            var file = evt.originalEvent.dataTransfer.files[i];
            promises[i] = readFile(file);
          }
          $.when.apply($, promises).done(function() {
            drawAll(chartParent);
          });
        }
      }); // on('drop')
    } // init
  } // return

}();

