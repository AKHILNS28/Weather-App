const weather=document.querySelector(".weather");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const api="YOUR_API_KEY";

weather.addEventListener("submit",async event=>{
    event.preventDefault();

    const city=cityinput.value.trim()
    if(city){
        try{
            const data=await getweather(city)
            displayweather(data)
        }
        catch(error){
            console.error(error);
            displayerror(error.message);
        }
    }
    else{
        displayerror("please enter a city")
    }
});

async function getweather(city)
{
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const response = await fetch(apiurl);
    console.log(response);

    if(!response.ok)
    {
        throw new Error("could not fetch weather data");
    }
    return await response.json()
}

function displayweather(data){
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

        card.textContent=""
        card.style.display="flex"

        const cityDisplay=document.createElement("h1");
        const tempDisplay=document.createElement("p");
        const humidityDisplay=document.createElement("p");
        const descDisplay=document.createElement("p");
        const weatheremojiDisplay=document.createElement("p");

        cityDisplay.textContent=city
        tempDisplay.textContent=`${temp}°C`;
        humidityDisplay.textContent=`Humidity :${humidity}%`;
        descDisplay.textContent = description[0].toUpperCase() + description.slice(1);
        weatheremojiDisplay.textContent=getweatherEmoji(id)

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempdisplay");
        humidityDisplay.classList.add("humiditydisplay");
        descDisplay.classList.add("descdisplay");
        weatheremojiDisplay.classList.add("weatherEmoji")

        card.appendChild(cityDisplay)
        card.appendChild(tempDisplay)
        card.appendChild(humidityDisplay)
        card.appendChild(descDisplay)
        card.appendChild(weatheremojiDisplay)
}

function getweatherEmoji(weatherid){
    switch(true){
        case(weatherid>=200 && weatherid<300):
            return "⛈️";
        case(weatherid>=300 && weatherid<400):
            return "🌦️";
        case(weatherid>=500 && weatherid<600):
            return "🌧️";
        case(weatherid>=600 && weatherid<700):
            return "❄️";
        case(weatherid>=700 && weatherid<800):
            return "🌫️";
        case(weatherid===800):
            return "☀️";
        case(weatherid>=801 && weatherid<810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message
    errordisplay.classList.add("error");

    card.textContent=" "
    card.style.display="flex";
    card.appendChild(errordisplay);
}
