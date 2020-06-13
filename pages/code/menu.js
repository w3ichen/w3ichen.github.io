// ADD NEW PROJECTS HERE
// File Name : [Title , Date , Description]
var python = {'https://py-maps.herokuapp.com/':['Maps Directions','6/10/2020','<em>Load time: up to 1 min</em><br>Using Python\'s Folium module to generate interactive maps and TomTom Maps API to get route and direction instructions.'],
			  'webscraping.html':['Netflix & Amazon Webscraper','1/3/2020','Using BeautifulSoup to scrape Amazon for best coupons. And scraping Netflix and Google ratings to rank Netflix movies.'],
			  'climate.html':['Climate Change Data','2/20/2020','Using requests to call the WorldBank\'s climate data API. This data is parsed with Pandas and plotted using Pyplot.'],
			  'data.html':['Python Local Database','12/25/2019','Using Pickle to store user data into a simple text file database. Has the ability to create, edit and search data.'],
			  'aes.html':['Advanced Encryption System','12/20/2019','A variation of AES using numpy and matrices.'],
			  'pw.html':['Password Validator & Generator','12/20/2019','A simple password validator and generator.']
			  }
var javascript = {'music.html':['Music Playlist API','25/5/2020','Generates a playlist of songs from similar artists. Using Deezer API to get artist\'s songs and LastFM API to find similar artists.'],
				  'movie.html':['Similar Movies','6/6/2020','Using The Movie Database (TMDb) API to search for similar movies and TV shows.'],
				  'social.html':['Social Media','4/24/2020','Front end web design of a social media site with ability to post, comment and upload photos. Use of Cookies to store time of last activity.'],
				  'interview.html':['Mock Interview','6/13/2020','Computer reads out interview questions, and your answers are recorded for review at the end. Accesses webcam and microphone via mediaRecorder and uses speechSynthesis web API to speak.'],
				  'trip.html':['Trip Planner API','1/19/2020','Calling TomTom Maps API to plan gas stations and hotel stops along driving route.'],
				  'calculator.html':['Calculator','1/2/2020','A simple caluclator using Javascript\'s eval() to perform math calculations.']
			     }
var arduino = {'alarm.html':['Alarm System','2/16/2020','An ultrasonic sensor triggers an alarm when motion is detected. Alarm must be turned off using the keypad.'],
			   'rgb.html':['RGB LED Remote','2/21/2020','A wireless remote is used to change the color of a RGB LED light by assigning Red, Blue, and Green a value between 0 and 255. These numbers are shown on LCD display.']
			  }
var cpp = {'bigo.html':['Big-O Visualizer','2/28/2020','Timing an algorithmn with different input sizes and graphing time elapsed to gain a rough visual of Big-O.'],
		  }
var tensorflow = {'http://tf-handwriting.herokuapp.com/':['Handwriting Recognition','5/27/2020', 'Convolutional neural network (CNN) that recognizes handwritten letters and numbers, trained on EMNIST dataset. HTML Canvas is used for drawing input and Flask hosts the model and Python server.'],
				  'https://tf-images.herokuapp.com/':['Image Classification','5/30/2020','Classifying RGB images from Pixabay images API using models trained on 3 CIFAR datasets.'],
				  'http://tf-language.herokuapp.com/':['Natural Language Processing','6/9/2020','Natural Language Processing models using LSTMs and Embedding layers. Includes both text classification and generation models.']
				}

// ADD NEW LANGUAGES HERE
var languages = {
	"tensorflow" : tensorflow,
	"javascript" : javascript,
	"python" : python,
	"arduino" : arduino,
	"cpp" : cpp,
}
// Loads the projects menu of each language; individual menu of projects for each language
function loadLanguageMenu(language){
	var command = '<div id="projectsMenu">';
	const dict = languages[language];
	const keys = Object.keys(dict)
	for (var i=0;i<keys.length;i++){
		command += '<button class="category" onclick="window.location.href=\''+keys[i]+'\'">';
		command += '<table><tr><img src="../logos/'+language+'.png"></tr>';
		command += '<tr><th><br>'+dict[keys[i]][0]+'</th></tr>';
		command += '<tr><td><em>'+dict[keys[i]][1]+'</em></td></tr>';
		command += '<tr><td>'+dict[keys[i]][2]+'</td></tr></table></button>';
	}
	command += '</div>';
	document.write(command);
}
// load main category menu; coding language and number of projects
function loadMainMenu(main=false){
	var command = '';
	var langs = Object.keys(languages);
	for (var i=0; i<langs.length; i++){
		if (main){
			command += '<button class="category" onclick="window.location.href=\''+langs[i]+'/'+langs[i]+'.html\'">';
			command += '<img src="logos/'+langs[i]+'.png" class="logo">';
		}else{
			command += '<button class="category" style="width:10%" onclick="window.location.href=\'../'+langs[i]+'/'+langs[i]+'.html\'">';
			command += '<img src="../logos/'+langs[i]+'.png" class="logo">';
		}
		command += '<div class="detail" id="'+langs[i]+'"><strong>'+(langs[i].charAt(0).toUpperCase()+langs[i].slice(1))+'</strong></div></button>';
	}
	document.getElementById("menu").innerHTML = command;
	for (var i=0;i<langs.length;i++){
		document.getElementById(langs[i]).innerHTML += '<br><em class="numOfProjects">' + Object.keys(languages[langs[i]]).length + ' Projects</em>';
	}
}
function height(div){
	// get height of div in em
	document.getElementById(div).style.height = "max-content";
	var menuHeight = document.getElementById(div).offsetHeight;
	document.getElementById(div).style.height = "0px";
	return menuHeight;
}

// Load submenu and code; menu of language categories for pages
function loadSubmenu(code=true, menu=true){
	// HTML CODE
	/*<table class="switch">
		<tr class="switchtr">
			<td id="code-text">Show Code</td>
			<td id="menu-text">Show Menu</td>
		</tr>
		<tr>
			<td><input type="checkbox" id="codeToggle"></td>
			<td><input type="checkbox" id="menuToggle"></td>
		</tr>
	</table>*/

	if (code){
		var codeBoolean = 0; // start with off, 0
		var codeHeight = height("code")
		document.getElementById("code").style.height = "0px";
		document.getElementById("codeToggle").addEventListener("click", 
		function (){
			codeToggle ^= 1;  // toggle between 0 and 1
			if (codeToggle == 0){
				// OFF
				document.getElementById("code").style.transitionDuration = "1s";
				document.getElementById("code").style.height = "0px";
				document.getElementById("code-text").innerHTML = "Show Code";
			}else if(codeToggle == 1){
				// ON
				document.getElementById("code").style.height = codeHeight+"px";
				document.getElementById("code").style.transitionDuration = "2s";
				document.getElementById("code-text").innerHTML = "Hide Code";
			}
		});
	}

	if (menu){
		var menuBoolean = 0;
		// add menu to div
		loadMainMenu();
		// images are causing white space, need to width:0 all images
		var images = document.getElementsByClassName("logo");
		for (var i=0;i<images.length;i++){
			images[i].style.width = "0";
		}
		var menuHeight = height("menu"); 
		document.getElementById("menu").style.height = "0";
		document.getElementById("menuToggle").addEventListener("click", 
		function (){
			menuToggle ^= 1;  // toggle between 0 and 1
			if (menuToggle == 0){
				// OFF
				document.getElementById("menu").style.transitionDuration = ".5s";
				for (var i=0;i<images.length;i++){
					images[i].style.width = "0";
				}
				document.getElementById("menu").style.height = "0px";
				document.getElementById("menu-text").innerHTML = "Show Menu";
			}else if(menuToggle == 1){
				// ON
				for (var i=0;i<images.length;i++){
						images[i].style.width = "100%";
				}
				document.getElementById("menu").style.transitionDuration = "1s";
				document.getElementById("menu").style.height = menuHeight + "em";
				document.getElementById("menu-text").innerHTML = "Hide Menu";
			}
		});
	}
}