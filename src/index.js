import './style.css';

import {collect_data} from "./weather_api/hit_api";
import {populate_background, update_dom} from "./dom_manipulation/dom";

// celsius is true, fahrenheit is false
let c_f = 1
let data

let search = document.getElementById('input-button');
let location = document.getElementById('input-location');
let c_f_button = document.getElementById('button-c-f');

c_f_button.addEventListener('click', async ev => {
    ev.preventDefault()
    c_f = !c_f
    c_f_button.value = c_f ? 'ºC': 'ºF'
    await update_dom(data, c_f)
})

search.addEventListener('click', async e => {
    e.preventDefault();

    if (location.value.length>=4) {
        let city = location.value
        await update_display(city)
    }
})

location.addEventListener('input', ev => {
    ev.preventDefault()
    let message = document.getElementById('error-message');
    let error = document.createElement('p')
    error.setAttribute('style', "background-color: red; font-family: 'MyFont', serif; text-align: center; color: white;")
    error.textContent = "city must be 4 characters long";

    if (location.value.length <4 && message.lastChild.textContent !== error.textContent)
    {
        message.appendChild(error)
    }
    else if (location.value.length >= 4 && message.lastChild.textContent === error.textContent) {
        message.removeChild(message.lastChild)
    }
})

const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const update_display = async function (city) {
    let loading = document.getElementById('loading-page')

    try {
        loading.showModal()
        data = await collect_data(city)
        await populate_background(data.location.name, data.current.day)
        await sleep(2000)
    }
    finally {
        loading.close()
    }

    update_dom(data, c_f)
    console.log(data)
}

await update_display('paris')