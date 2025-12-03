// charts.js: overview and camp charts
document.addEventListener('DOMContentLoaded', function(){
  // Overview chart (if present)
  const overview = document.getElementById('overviewChart');
  if(overview){
    new Chart(overview, {
      type: 'bar',
      data: {
        labels: ["Makeni","Mayukwayukwa","Meheba","Mantapala"],
        datasets: [{ label:'Sample population', data:[4300,7200,11500,6200], borderWidth:1 }]
      },
      options: { responsive:true, plugins:{ legend:{display:false} } }
    });
  }

  // Camp chart loader used by camp.html
  window.loadCampChart = function(camp){
    const el = document.getElementById('campChart');
    if(!el) return;
    const sample = {"Makeni":4300,"Mayukwayukwa":7200,"Meheba":11500,"Mantapala":6200};
    new Chart(el, {
      type:'doughnut',
      data:{ labels:[camp], datasets:[{data:[sample[camp]||0], backgroundColor:['#4B7BE5']}]},
      options:{responsive:true, plugins:{legend:{display:false}}}
    });
  };
});
