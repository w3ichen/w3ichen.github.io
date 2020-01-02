var	list = ['Python - Advanced Encryption System',
			'Python - Data Storage',
			'Python - Calculator',
			'Python - Password Validator',
			];

var link = ['aes',
			'data',
			'calculator',
			'pw'];

for (var i=0;i<list.length;i++){
	var command = '<a class=\"right\" href=\'' + link[i] + '.html\'>' + list[i] + '</a><br>';
	document.write(command);
}
