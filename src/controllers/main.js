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

    const userRegion = weatherAPI.region;

    const url2 = `http://api.weatherapi.com/v1/current.json?key=00d736c6795342d48db183950240107&q=${userRegion}`;
    const response2 = await fetch(url2);

    if (!response2.ok) {
      throw new Error("Failed to fetch temperature");
    }

    const temperatureAPI = await response2.json();

    if (!temperatureAPI)
      return res.send({ Error: "Failed to get the temperature data" });

    res.send({
      client_ip: weatherAPI.ip,
      location: weatherAPI.region,
      greeting: `Hello, ${visitor_name}!, the temperature is ${temperatureAPI.current.temp_c} degrees Celcius in ${weatherAPI.city}`,
    });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = { mainController };
