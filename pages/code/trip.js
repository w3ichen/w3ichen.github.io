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
		var rest = document.getElementById("rest").value;
		var carType = document.getElementById("carType").value;
	} catch(err){
		window.alert("ERROR: error in user input\n Please Check Your Inputs")
	}
	//restaurants?
	if (rest == "rest_none"){var rest_boolean = false; } else{var rest_boolean = true;}
	//             (0) (1)  (2)    (3)  (4)   (5)    (6)       (7)      
	var output = [from,to,country,start,car,carType,rest, rest_boolean];
	return output
}
function seconds_2_hours(seconds){
	var hours = parseInt(seconds/3600, 10);
	var minutes = parseInt(((seconds/3600)%1)*60,10)
	var seconds = parseInt(((((seconds/3600)%1)*60)%1)*60,10)
	return [hours,minutes,seconds]
}

function main(){
	const key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'
	// window.location.href = "trip2.html";
	// (1) get user inputs
	var inputs = getUserInputs();

	// time array, hours - minutes - seconds
	var time_seconds = 25200; // 7 am
	console.log("DEPART at 7am")
	var time = seconds_2_hours(time_seconds)
	var cost = 0;

	// (2) convert addresses to lat and lon
	var from_address = inputs[0].split(" ").join("%20");
	var to_address = inputs[1].split(" ").join("%20");
	const from_url ='https://api.tomtom.com/search/2/geocode/'+from_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;
	const to_url ='https://api.tomtom.com/search/2/geocode/'+to_address+'.json?limit=1&countrySet='+inputs[2]+'&key='+key;

	fetch(from_url)
	.then(data=>{return data.json()})
	.then(res=> { 
		var from_latlon = [(res.results[0].position.lat),(res.results[0].position.lon)];
		var current_location = from_latlon;
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
				var distace_km = (res.routes[0].summary.lengthInMeters)/1000
				var travel_time_seconds = res.routes[0].summary.travelTimeInSeconds
				var route = res.routes[0].legs[0].points
				var numOfPoints = route.length

				var coord_index = Math.floor(Math.floor(numOfPoints/distace_km)*inputs[4])
				var interval = coord_index;
				if (distace_km > inputs[4]){
					// if can't be reached in one car range
						time = seconds_2_hours(time_seconds)					
						var resultFound = false;
						var fetchNow = function() {fetch('https://api.tomtom.com/routing/1/calculateRoute/'+current_location[0]+'%2C'+current_location[1]+'%3A'+route[coord_index].latitude+'%2C'+route[coord_index].longitude+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key)
						.then(data=>{return data.json()})
						.then(res=> {  
							if (coord_index >= numOfPoints){resultFound = true; }// stop if greater than end point}
							else{

								// add the time
								time_seconds += res.routes[0].summary.travelTimeInSeconds
								// change current location to new location
								current_location = [route[coord_index].latitude,route[coord_index].longitude]


								if (inputs[5] == "gas"){
									// find a gas station
									var gas_station_url = 'https://api.tomtom.com/search/2/poiSearch/petrol%20%20station.json?limit=1&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									fetch(gas_station_url)
									.then(data=>{return data.json()})
									.then(res=> {  
										time_seconds += (15*60); // 15 minutes* 60 seconds
										var gas_name = res.results[0].poi.name;
										var gas_address = res.results[0].address.freeformAddress;    })

									time=seconds_2_hours(time_seconds)
										console.log("gas station needed ")
										console.log("time: ",time[0],"hours :",time[1], "minutes")
										console.log("points at: ",coord_index)

								}
								else if (inputs[5] == "electric"){
									// find a electric charging station
									var ev_station_url = 'https://api.tomtom.com/search/2/poiSearch/electric%20vehicle%20station.json?limit=1&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									fetch(ev_station_url)
									.then(data=>{return data.json()})
									.then(res=> {  
										time_seconds += (30*60); // 30 minutes*60 seconds
										var ev_name = res.results[0].poi.name;
										var ev_address = res.results[0].address.freeformAddress;     })

								}

								if (time_seconds > 79200){ // if time is past 10 o'clock, look for hotel
									var hotel_url = 'https://api.tomtom.com/search/2/poiSearch/hotel_motel.json?limit=3&countrySet='+inputs[2]+'&lat='+current_location[0]+'&lon='+current_location[1]+'&key='+key;
									fetch(hotel_url)
									.then(data=>{return data.json()})
									.then(res=> {
										// name,  address,  phone,  score  
										var hotel1 = [res.results[0].poi.name, res.results[0].address.freeformAddress,  res.results[0].poi.phone, res.results[0].score];
										var hotel2 = [res.results[1].poi.name, res.results[1].address.freeformAddress, res.results[1].poi.phone, res.results[1].score];
										var hotel3 = [res.results[2].poi.name,res.results[2].address.freeformAddress, res.results[2].poi.phone, res.results[2].score];

										time=seconds_2_hours(time_seconds)
										console.log("Hotel needed ")
										console.log("time: ",time[0],"hours :",time[1], "minutes")
										console.log("points at: ",coord_index)
										console.log("DEPART: at 7am")

										time_seconds = 25200; // reset time to 7am
										coord_index -= interval; // don't add more distance for hotel
									})
								}

								coord_index += interval;

								try{ fetchNow(); } //recursive
								catch(err){
									console.log("ERRORRRRRR:  ")
									console.log(err)
									console.log(coord_index-interval,"  out of  ",numOfPoints)
									time = seconds_2_hours(time_seconds)
									fetch('https://api.tomtom.com/routing/1/calculateRoute/'+current_location[0]+'%2C'+current_location[1]+'%3A'+route[numOfPoints].latitude+'%2C'+route[numOfPoints].longitude+'/json?departAt='+inputs[3]+'T'+time[0]+'%3A'+time[1]+'%3A'+time[2]+'&routeType=fastest&traffic=true&travelMode=car&key='+key)
									.then(data=>{return data.json()})
									.then(res=> { 
										console.log("last time: ",res.routes[0].summary.travelTimeInSeconds)
										time_seconds += res.routes[0].summary.travelTimeInSeconds; 	})
									time = seconds_2_hours(time_seconds)
									console.log("ARRIVED at ",time[0],"hours", time[1]," minutes ")
								} // end of error catch
						}})
					}// outer fetch function brace	
					fetchNow();		



				}
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
