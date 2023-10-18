require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})
   


app.post("/", function(req,res){
    const query = req.body.cityName    
    const appid = process.env.appid
    const unit = "metric" 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${appid}`
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const fell_like= weatherData.main.feels_like
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            res.write("<p> The weather is currently " + description +"</p><br>");
            res.write(`<h1> The temperature ${query} is  ${temp} degree celsius </h1>`);
            res.write(`<img src=${imageUrl}>`)
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("your server is running")
});
