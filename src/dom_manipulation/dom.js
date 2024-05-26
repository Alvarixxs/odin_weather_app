const api_key = 'pO4Jrg_ILYmTk1nNaSBVrO8gs2VWW_MRHwAhed_y4n4';

const date_string = function(date) {
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return dayNames[date.getDay()] + ', ' + date.getDate() + " " + dayMonths[date.getMonth()] + " " + date.getFullYear()
}

const populate_background = async function (city, day) {
    let container = document.getElementById('container');
    let data = await fetch(
        'https://api.unsplash.com/photos/random/?client_id=' + api_key + '&query='+ city + ((day) ? '-day': '-night') + '&orientation=landscape',
        {mode:"cors"}
    )

    if (data.status === 200) {
        let info = await data.json();
        container.style.backgroundImage = "url('" + info.urls.full + "')"
    }
}

const populate_main = function(data, c_f) {
    let location = document.getElementById('location')
    let currentTemp = document.getElementById('current-temp')
    let icon = document.getElementById('current-icon')
    let currentText = document.getElementById('current-text')
    let currentTime = document.getElementById('current-time')
    let currentDate = document.getElementById('current-date')
    let currentMin  = document.getElementById('current-min')
    let currentMax = document.getElementById('current-max')
    let feelsLike = document.getElementById('feels-like')
    let currentHum = document.getElementById('current-hum')

    location.textContent = data.location.name + ', ' + data.location.country
    currentTemp.textContent = c_f ? data.current.temperature.celsius + 'º C': data.current.temperature.fahrenheit + ' ºF'
    icon.src = data.current.condition.icon
    currentText.textContent = data.current.condition.text
    currentTime.textContent = data.location.timemum.split(' ')[1]

    let date = new Date(data.forecast[0].date)
    currentDate.textContent = date_string(date)

    currentMin.textContent = c_f ? data.forecast[0].temperature.min.celsius + ' ºC': data.forecast[0].temperature.min.fahrenheit + ' ºF'
    currentMax.textContent = c_f ? data.forecast[0].temperature.max.celsius + ' ºC': data.forecast[0].temperature.max.fahrenheit + ' ºF'
    feelsLike.textContent = 'Feels like: ' + (c_f ? data.current.feelslike.celsius + ' ºC': data.current.feelslike.fahrenheit + ' ºF')
    currentHum.textContent = data.current.humidity + '%'
}

const populate_day = function(data, c_f, i) {
    let date = document.getElementById('date-day-'+i)
    let icon = document.getElementById('day-'+i+'-icon')
    let text = document.getElementById('day-'+i+'-text')
    let min = document.getElementById('day-'+i+'-min')
    let max = document.getElementById('day-'+i+'-max')
    let hum = document.getElementById('day-'+i+'-hum')

    let day = new Date(data.forecast[i].date)
    date.textContent = date_string(day)

    icon.src = data.forecast[i].condition.icon
    text.textContent = data.forecast[i].condition.text
    min.textContent = c_f ? data.forecast[i].temperature.min.celsius + ' ºC': data.forecast[i].temperature.min.fahrenheit + ' ºF'
    max.textContent = c_f ? data.forecast[i].temperature.max.celsius + ' ºC': data.forecast[i].temperature.max.celsius + ' ºF'
    hum.textContent = data.forecast[i].humidity + '%'
}

const populate_days = function (data, c_f) {
    populate_day(data, c_f, 1)
    populate_day(data, c_f, 2)
}

const populateLeft = function(data) {
    let astro = document.getElementById('astro')
    let wind = document.getElementById('wind')
    let precip = document.getElementById('precip')
    let uv = document.getElementById('uv')

    astro.textContent = data.forecast[0].astro.sunrise + ' / ' + data.forecast[0].astro.sunset
    wind.textContent = data.forecast[0].maxwind + ' kph'
    precip.textContent = data.forecast[0].precipitation.chance + '% / ' + data.forecast[0].precipitation.total + 'mm'
    uv.textContent = data.forecast[0].uv
}

const update_dom = function (data, c_f) {
    populate_main(data, c_f)
    populate_days(data, c_f)
    populateLeft(data)
}

export { populate_background , update_dom};