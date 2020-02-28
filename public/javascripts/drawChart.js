"use strict";

let name = [];
let enc = [];
let dec = [];
let size = [];

for (let i = 0; i < chartData.length; i++) {
	name[i] = chartData[i].name;
	enc[i] = chartData[i].enc;
	dec[i] = chartData[i].dec;
	size[i] = chartData[i].size;
};

drawChart('enc', 'time (ms)', enc);
drawChart('dec', 'time (ms)', dec);
drawChart('size', 'size (bytes)', size);

function drawChart(id, label, values) {
	var ctx = document.getElementById(id);
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: name,
			datasets: [{
				label: label,
				data: values,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(153, 102, 255, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(153, 102, 255, 1)'
				],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
};
