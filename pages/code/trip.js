var data = new Object()

// get values from documents
function getUserInputs(){
	try{
		var car = parseInt(document.getElementById("car").value);
	}
	catch(err){
		window.alert("ERROR: car range must be an unitless numerical value ")
	}
	try{
		var from = document.getElementById("from").value;
		var to = document.getElementById("to").value;
		var country = document.getElementById("country").value;
		var start = document.getElementById("start").value;
		var hotels = document.getElementById("hotels").value;
		var rest = document.getElementById("rest").value;
		var carType = document.getElementById("carType").value;
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	// array eleme: (0)(1)  (2)    (3)  (4)  (5)     (6)    (7)
	var output = [from,to,country,start,car,carType,hotels,rest];
	return output
}
function seconds_2_hours(seconds){
	
}


function latlong_to_address(lat,lon,key){
	var url = 'https://api.tomtom.com/search/2/reverseGeocode/'+lat+'%2C'+lon+'.xml?key='+key;
	fetch(url).then(function(response) {
  		response.text().then(function(text) {
  			var parser = new DOMParser();
			var htmlDoc = parser.parseFromString(text, 'text/html');
			var address = htmlDoc.getElementsByTagName('freeformAddress')[0].innerText;
			return address;
 		 });
	});
}

function main(){
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	// window.location.href = "trip2.html";
	// (1) get user inputs
	var inputs = getUserInputs();

	// time array, hours - minutes - seconds
	var time_seconds = [8,0,0];
	// (2) convert addresses to lat and lon
	var from_address = inputs[0].split(" ").join("%20");
	var to_address = inputs[1].split(" ").join("%20");
	const from_url ='https://api.tomtom.com/search/2/geocode/'+from_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;
	const to_url ='https://api.tomtom.com/search/2/geocode/'+to_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;

	fetch(from_url)
	.then(data=>{return data.json()})
	.then(res=> { 
		var from_latlon = [(res.results[0].position.lat),(res.results[0].position.lon)];
		fetch(to_url)
		.then(data=>{return data.json()})
		.then(res=> {
			var to_latlon = [(res.results[0].position.lat),(res.results[0].position.lon)];
			// now have latlon of from and to
			// (3) find the route from from to to
			var route_url = 'https://api.tomtom.com/routing/1/calculateRoute/'+from_latlon[0]+'%2C'+from_latlon[1]+'%3A'+to_latlon[0]+'%2C'+to_latlon[1]+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key;
			fetch(route_url)
			.then(data=>{return data.json()})
			.then(res=> {
				console.log(res)
			})
		})
	})

}
// fetch(from_url)
// 	.then(data=>{return data.json()})
// 	.then(res=> {    })




// fetch(url2)
	// .then(data=>{return data.json()})
	// .done(res=> {return output=[(res.results[0].position.lat),(res.results[0].position.lon)]})


    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open( "GET", url,false); // false for synchronous request
    // xmlHttp.send( null );
    // console.log(xmlHttp.responseText)
    // return xmlHttp.responseText;

	// fetch(url).then(function(response) {
 //  		response.text().then(function(text) {
 //  			var parser = new DOMParser();
	// 		var htmlDoc = parser.parseFromString(text, 'text/html');
	// 		var lat = htmlDoc.getElementsByTagName('lat')[0].innerText;
	// 		var lon = htmlDoc.getElementsByTagName('lon')[0].innerText;
	// 		data[address] = [lat,lon];
 // 		 });
	// });

// const asynchronousFunction = async (url) => {
//   const response = await fetch(url)
//   console.log(response)
//   return response.responseText
// }
// var abc=asynchronousFunction('https://api.tomtom.com/search/2/geocode/7615%20119%20street.xml?limit=1&countrySet=canada&key=G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0')
// console.log(abc)

	// let results = fetch('https://api.tomtom.com/search/2/geocode/7615%20119%20street.json?limit=1&countrySet=canada&key=G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0')
 //        .then((res) => {
 //            return res.json();
 //        })
 //        .then((data) => {
 //            return data;
 //        })
 //        let printer = results.json()
 //       console.log("results");console.log(printer)
