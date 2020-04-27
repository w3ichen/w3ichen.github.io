var	list = ['HTML + CSS + JS - Social Media',
			'Javascript - API Trip Planner',
			'Python - WebScraping',
			'Python - Advanced Encryption System',
			'Python - Data Storage',
			'Python - Pandas + PyPlot Data Graphing',
			'C++ - BigO Runtime Tester',
			'Arduino - Alarm System',
			'Arduino - RGB LED Remote',
			'Python - Password Validator',
			'HTML + CSS + JS - Calculator'
			];

var link = ['social',
			'trip',
			'webscraping',
			'aes',
			'data',
			'climate',
			'bigo',
			'alarm',
			'rgb',
			'pw',
			'calculator'
			];

for (var i=0;i<list.length;i++){
	var command = '<a class=\"right\" href=\'' + link[i] + '.html\'>' + list[i] + '</a><br>';
	document.write(command);
}
