var	list = ['Javascript - API Trip Planner',
			'Python - WebScraping',
			'Python - Advanced Encryption System',
			'Python - Data Storage',
			'Python - Pandas + PyPlot Data Graphing',
			'Python - Password Validator',
			'HTML + CSS + JS - Calculator'
			];

var link = ['trip',
			'webscraping',
			'aes',
			'data',
			'climate',
			'pw',
			'calculator'
			];

for (var i=0;i<list.length;i++){
	var command = '<a class=\"right\" href=\'' + link[i] + '.html\'>' + list[i] + '</a><br>';
	document.write(command);
}
