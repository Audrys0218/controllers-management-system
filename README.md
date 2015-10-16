System:
	*Places
	*Sensors
		*Light
		*Motion
		*Temperature
		*Humidity
		*Sound
		*Smoke
		*Speech recognition
	*Controllers
		*Light dimmer (colorful)
		*Light dimmer
		*Electricity switcher
		*Audio
		*TV
		*Window
		*Curtains
		*Oven
		*Doors
		*Security
		*Temperature
		*Alarm
	*API
		*places
			*GET /places - retrieves a list of places registered
			*GET /places/12 - retrieves a specific place
			*POST /places - creates new place
			*PUT /places/12 - updates place
			*DELETE /places/12 - deletes place
			*GET places/12/controllers - retrieves a list of controllers of specific place
			*GET places/12/sensors - retrieves a list of sensors of specific place
		*sensors
			*...
		*controllers
			*...
		*rules
			*...

*If there's any problem with API methods:
	http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/
	http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

