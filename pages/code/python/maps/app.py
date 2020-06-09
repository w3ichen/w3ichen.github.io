from flask import Flask, render_template
import folium
from folium import Circle, Marker
import requests
import pickle
import json

with open("countryNames.pickle","rb") as file:
	# get countryname dictionary
	countries = pickle.load(file)
key = 'G1DzjsJD5JZ3vMKMRgJeaUJ5Trc0rnx0'

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("maps.html")

@app.route('/route',methods=['GET','POST'])
def route():

	# data = request.data
	# map_html = maps.get_root().render()
	# print(map_html)
	print("SERVER")
	from_lat, from_lon, to_lat, to_lon = getLatLon(None)
	print(from_lat, from_lon, to_lat, to_lon)
	route_url = 'https://api.tomtom.com/routing/1/calculateRoute/'+str(from_lat)+'%2C'+str(from_lon)+'%3A'+str(to_lat)+'%2C'+str(to_lon)+'/json?avoid=unpavedRoads&key='+key;
	route_json = json.loads(requests.get(route_url).text)
	time_in_seconds = route_json["routes"][0]["legs"][0]["summary"]["travelTimeInSeconds"]
	distance_in_meters = route_json["routes"][0]["legs"][0]["summary"]["lengthInMeters"]
	print("TIME: ",time_in_seconds)
	print("DISTANCE: ",distance_in_meters)
	points = route_json["routes"][0]["legs"][0]["points"]
	print(points[0])

	maps = folium.Map(location=[from_lat,from_lon], tiles='openstreetmap', zoom_start=10)
	Marker([from_lat, from_lon]).add_to(maps) # start marker
	Marker([to_lat, to_lon]).add_to(maps) # end marker
	points_list = []
	for point in points:
		points_list.append((point["latitude"],point["longitude"]))
	folium.PolyLine(points_list, color='red').add_to(maps)
	print(points_list)

	print("markers added")
	maps.save("map_test.html")

	return json.dumps(str(prediction))


def getLatLon(data):
	from_address = "7611 119 street"
	to_address = "8834 114 St NW"
	country_name = "canada"
	country_code = countries[country_name.lower()]
	from_url = 'https://api.tomtom.com/search/2/geocode/'+from_address+'.json?limit=1&countrySet='+country_code+'&key='+key
	to_url = 'https://api.tomtom.com/search/2/geocode/'+to_address+'.json?limit=1&countrySet='+country_code+'&key='+key

	from_json = json.loads(requests.get(from_url).text)
	from_lat = from_json["results"][0]["position"]["lat"]
	from_lon = from_json["results"][0]["position"]["lon"]
	to_json = json.loads(requests.get(to_url).text)
	to_lat = to_json["results"][0]["position"]["lat"]
	to_lon = from_json["results"][0]["position"]["lon"]

	return from_lat, from_lon, to_lat, to_lon


if __name__ == "__main__":
    app.run(debug=True)