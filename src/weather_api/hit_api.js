const api_key = 'f1539e3ca3284734946104435242505'

async function hit_api(city){
    let info = await fetch('https://api.weatherapi.com/v1/forecast.json?key=' + api_key + '&q=' + city + '&days=3', {mode: 'cors'})
    return await info.json();
}

async function collect_data(city) {
    let answer = await hit_api(city);
    let obj = {}

    obj.location = {
        name: answer.location.name,
        country: answer.location.country,
        latitude: answer.location.lat,
        timemum: answer.location.localtime,
    }

    obj.current = {
        day: answer.current.is_day,
        condition: {
            text: answer.current.condition.text,
            icon: answer.current.condition.icon
        },
        temperature: {
            celsius: answer.current.temp_c,
            fahrenheit: answer.current.temp_f,
        },
        feelslike: {
            celsius: answer.current.feelslike_c,
            fahrenheit: answer.current.feelslike_f,
        },
        humidity: answer.current.humidity,
    }

    obj.forecast = [{
            date: answer.forecast.forecastday[0].date,
            astro: {
                sunrise: answer.forecast.forecastday[0].astro.sunrise,
                sunset: answer.forecast.forecastday[0].astro.sunset,
            },
            temperature: {
                max: {
                    celsius: answer.forecast.forecastday[0].day.maxtemp_c,
                    fahrenheit: answer.forecast.forecastday[0].day.maxtemp_f,
                },
                min: {
                    celsius: answer.forecast.forecastday[0].day.mintemp_c,
                    fahrenheit: answer.forecast.forecastday[0].day.mintemp_f,
                },
            },
            humidity: answer.forecast.forecastday[0].day.avghumidity,
            maxwind: answer.forecast.forecastday[0].day.maxwind_kph,
            precipitation: {
                chance: answer.forecast.forecastday[0].day.daily_chance_of_rain,
                total: answer.forecast.forecastday[0].day.totalprecip_mm,
            },
            uv: answer.forecast.forecastday[0].day.uv,
        },
        {
            condition: {
                text: answer.forecast.forecastday[1].day.condition.text,
                icon: answer.forecast.forecastday[1].day.condition.icon,
            },
            date: answer.forecast.forecastday[1].date,
            temperature: {
                max: {
                    celsius: answer.forecast.forecastday[1].day.maxtemp_c,
                    fahrenheit: answer.forecast.forecastday[1].day.maxtemp_f,
                },
                min: {
                    celsius: answer.forecast.forecastday[1].day.mintemp_c,
                    fahrenheit: answer.forecast.forecastday[1].day.mintemp_f,
                },
            },
            humidity: answer.forecast.forecastday[1].day.avghumidity,
        },
        {
            condition: {
                text: answer.forecast.forecastday[2].day.condition.text,
                icon: answer.forecast.forecastday[2].day.condition.icon,
            },
            date: answer.forecast.forecastday[2].date,
            temperature: {
                max: {
                    celsius: answer.forecast.forecastday[2].day.maxtemp_c,
                    fahrenheit: answer.forecast.forecastday[2].day.maxtemp_f,
                },
                min: {
                    celsius: answer.forecast.forecastday[2].day.mintemp_c,
                    fahrenheit: answer.forecast.forecastday[2].day.mintemp_f,
                },
            },
            humidity: answer.forecast.forecastday[2].day.avghumidity,
        },
    ]

    return obj;
}

export {collect_data}