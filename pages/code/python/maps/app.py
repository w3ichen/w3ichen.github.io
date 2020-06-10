from flask import Flask, render_template, request
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
	from_lat, from_lon, to_lat, to_lon = getLatLon(request.json)
	route_url = 'https://api.tomtom.com/routing/1/calculateRoute/'+str(from_lat)+'%2C'+str(from_lon)+'%3A'+str(to_lat)+'%2C'+str(to_lon)+'/json?avoid=unpavedRoads&key='+key+"&instructionsType=text";
	route_json = json.loads(requests.get(route_url).text)
	time_in_seconds = route_json["routes"][0]["legs"][0]["summary"]["travelTimeInSeconds"]
	distance_in_meters = route_json["routes"][0]["legs"][0]["summary"]["lengthInMeters"]

	points = route_json["routes"][0]["legs"][0]["points"]

	maps = folium.Map(location=[from_lat,from_lon], tiles='openstreetmap', zoom_start=15)
	folium.Polygon(locations=[[from_lat, from_lon]], color='red', fill_color='red', weight=10).add_to(maps) # start marker
	folium.Polygon(locations=[[to_lat, to_lon]], color='red', fill_color='red', weight=10).add_to(maps) # end marker

	points_list = []
	for point in points:
		points_list.append((point["latitude"],point["longitude"]))
	folium.PolyLine(points_list, color='#00BFFF', weight=5).add_to(maps)

	map_html = str(maps.get_root().render()).replace("\n","").replace("<!DOCTYPE html>","")

	# get text directions
	messageList = []
	instructions = route_json["routes"][0]["guidance"]["instructions"]
	for message in instructions:
		messageList.append(message["message"])

	return json.loads(json.dumps({'map':str(map_html), 'time':time_in_seconds, 'distance':distance_in_meters, 'instructions':messageList}).replace("\'", "\""))


def getLatLon(data):

	from_address = data["fromAddress"].lower().replace(" ","%20")
	from_country = countries[data["fromCountry"].lower()]
	to_address = data["toAddress"].lower().replace(" ","%20")
	to_country = countries[data["toCountry"].lower()]

	from_url = 'https://api.tomtom.com/search/2/geocode/'+from_address+'.json?limit=1&countrySet='+from_country+'&key='+key
	to_url = 'https://api.tomtom.com/search/2/geocode/'+to_address+'.json?limit=1&countrySet='+to_country+'&key='+key

	from_json = json.loads(requests.get(from_url).text)
	from_lat = from_json["results"][0]["position"]["lat"]
	from_lon = from_json["results"][0]["position"]["lon"]
	to_json = json.loads(requests.get(to_url).text)
	to_lat = to_json["results"][0]["position"]["lat"]
	to_lon = from_json["results"][0]["position"]["lon"]

	return from_lat, from_lon, to_lat, to_lon

if __name__ == "__main__":
    app.run(debug=True)