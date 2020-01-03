var	list = ['Python - Advanced Encryption System',
			'Python - Data Storage',
			'Python - Password Validator',
			'HTML + CSS + JS - Calculator'
			];

var link = ['aes',
			'data',
			'pw',
			'calculator'
			];

for (var i=0;i<list.length;i++){
	var command = '<a class=\"right\" href=\'' + link[i] + '.html\'>' + list[i] + '</a><br>';
	document.write(command);
}
