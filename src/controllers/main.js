const mainController = async (req, res) => {
  const { visitor_name } = req.query;

  try {
    const url = `http://api.weatherapi.com/v1/ip.json?key=00d736c6795342d48db183950240107&q=auto:ip`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherAPI = await response.json();

    if (!weatherAPI) return res.send({ Error: "No weather Info found" });

    res.send({
      client_ip: weatherAPI.ip,
      location: weatherAPI.region,
      greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${weatherAPI.city}`,
    });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};

module.exports = { mainController };

// example.com>/api/hello?visitor_name="Mark"
//   {
//     "client_ip": "127.0.0.1", // The IP address of the requester
//     "location": "New York" // The city of the requester
//     "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
//   }

//   {
//     "ip": "105.178.32.148",
//     "type": "ipv4",
//     "continent_code": "AF",
//     "continent_name": "Africa",
//     "country_code": "RW",
//     "country_name": "Rwanda",
//     "is_eu": "false",
//     "geoname_id": 202061,
//     "city": "Kigali (Remera)",
//     "region": "Kigali",
//     "lat": -1.95064,
//     "lon": 30.1031,
//     "tz_id": "Africa/Kigali",
//     "localtime_epoch": 1719860062,
//     "localtime": "2024-07-01 20:54"
// }
