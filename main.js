window.onload = function setup(){
	var images = ['archway.jpg','buffalo.jpg','chinesearch.jpg','hill.jpg','iphone.jpg','locks.jpg','lotus.jpg','meat.jpg','monkey.jpg','mountain.jpg','onetree.jpg','path.jpg','post.jpg','profile.jpg','redhouse.jpg','rooftop.jpg','rose.jpg','shadow.jpg','temple.jpg','flamingo.jpg'];
	var randomNumber = Math.floor(Math.random()*images.length);
	var imageFile = images[randomNumber]; var path = 'pages/photo/'+imageFile;
	document.body.style.backgroundImage = 'url('+path+')';

	// auto generate random quote
	var quotes = ['\"Stay Hungry, Stay Foolish\" <br>- Steve Jobs',
	'\"The People Who Are Crazy Enough to Think <br> They Can Change the World are the Ones Who Do\"<br>- Steve Jobs',
	'\"You Can\'t Connect the Dots Looking Forward, <br> You Can Only Connect Them Looking Backwards\"<br>- Steve Jobs',
	'\"Be The Flame That Warms the World, Not Destroy It\"<br>- Henkelman',
	'\"If I Had 3 Hours to Cut Down a Tree, <br>I Would Take 2 Hours to Sharpen The Ax\" <br>- Lincoln ',
	'\"How We Spend Our Days is How We Spend Out Lives\"<br> - Annie Dillard',
	'\"The Heights of Great Men Reached and Kept Were<br> Not Attained by Sudden Flight, But They, While Their Companions Slept,<br> Were Toiling Upward in the Night\"<br>- Henry Wadsworth',
	'\"Sometimes it is the People No One Imagines Anything of <br> Who do the Things That No One Can Imagine\"<br>- Alan Turing',
	'\"What Happens When We Die? <br>I Know That the Ones Who Love Us Will Miss Us\"<br>- Keanu Reeves',
	'\"It Does Not do to Dwell on Dreams and Forget to Live\"<br> - J.K.Rowling',
	'\"It is Our Choices, That Show What We Truly Are, <br> Far More Than Our Abilities\"<br>- J.K.Rowling',
	'\"Today I Will do What Other\'s Won\'t, so Tomorrow I Will do What Others Can\'t\"<br>- Jerry Rice',
	'\"The Test of our Progress is Not Whether we Add to the Abundance of Those Who Have Much.<br>It is Whether we Provide Enough to Those Who Have Little\"<br>- Franklin Delano Roosevelt',
	'\"When you know how to think, it empowers you<br>far beyond those who only know what to think\"<br>- Neil deGrasse Tyson'
	];

	var randomNumber = Math.floor(Math.random()*quotes.length);
	document.getElementById("quote").innerHTML = quotes[randomNumber];
};
