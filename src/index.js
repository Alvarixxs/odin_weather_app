import './style.css';

import {collect_data} from "./weather_api/hit_api";
import {update_dom} from "./dom_manipulation/dom";

let search = document.getElementById('input-button');
let location = document.getElementById('input-location');

search.addEventListener('click', async e => {
    e.preventDefault();
    let city = location.value
    await update_display(city)
})

const update_display = async function (city) {
    let data = await collect_data(city)
    console.log(data)
    await update_dom(data)
}

await update_display('paris')

// await update_display('madrid')