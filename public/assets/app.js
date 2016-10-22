// You can find the server for this endpoint here:
//
//    https://github.com/martindale/soundtracker
//
// We wrote it to learn more about what time of day people were listening
// to soundtrack, so that we could all commit to being online around the
// same times.  Eventually, we hope for this service to be provided by a
// generalized statistics server, such as #sensemaker might provide.

/*/var ENDPOINT = 'http://localhost:13010/snapshots';/*/
var ENDPOINT = 'https://stats.soundtrack.io/snapshots';/**/
var chart = {};

drawChart();

$(document).on('click', '[on-tap=refreshChart]', refreshChart);

setInterval(refreshChart, 60 * 1000);

function refreshChart() {
  $(this).addClass('loading');
  drawChart();
}

function drawChart() {
  $.getJSON(ENDPOINT, function(snapshots) {
    console.log('snapshots:', snapshots);
    
    var items = snapshots.map(function(x) {
      return x.metrics.listeners;
    });
    
    var labels = [];
    
    for (var i = 0; i < items.length; i++) {
      var label = (i + 1) + ' minutes ago';
      labels.push(label);
    }

    var data = {
      labels: labels.reverse(),
      datasets: [
        {
          label: 'soundtrack.io',
          data: items,
        }
      ]
    };
    
    var context = document.querySelector('canvas.online.users');
    chart = new Chart(context, {
      type: 'line',
      data: data
    });
    
    $('[on-tap=refreshChart]').removeClass('loading');
    
  });
}
