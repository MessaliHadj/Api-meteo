let formSubmit = document.getElementById('formSubmit')
let valueInput = document.getElementById('valueInput')
let result = document.getElementById('result')
let city = ""
let meteo = []
const ApiKey = 'ad8b8388eceddfc6188e49641dca866d'

const fetchMeteo = async ()=>{
  const ApiUri = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${city}`
  meteo = await fetch(ApiUri).then((response) => response.json())
}

const displayMeteo = async ()=>{
  await fetchMeteo()
  if (meteo.success === false) {
    result.innerHTML = `
      <div class="alert alert-danger col-8 mx-auto" role="alert">
        Veuillez saisir le nom d'une ville valide!
      </div>
    `
  } else {
    let iconPrecip = ""
    if (meteo.current.precip >= 0 && meteo.current.precip < 0.2) {
      iconPrecip = '🌤️'
    } else if (meteo.current.precip >= 0.2 && meteo.current.precip < 0.5){
      iconPrecip = '🌥️'
    } else if (meteo.current.precip >= 0.5 && meteo.current.precip < 0.8){
      iconPrecip = '🌦️'
    } else if (meteo.current.precip >= 0.8 && meteo.current.precip < 1){
      iconPrecip = '🌨️'
    } else {
      iconPrecip = '🌩️'
    };
    result.innerHTML = `
    <div class="card mx-auto" style="width: 18rem;">
      <img src="${meteo.current.weather_icons[0]}" class="card-img-top" alt="méteo du jour">
      <div class="card-body">
        <h5 class="card-title">${meteo.location.name} ${meteo.location.region} ${meteo.location.country}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${meteo.current.weather_descriptions[0]}</h6>
        <p class="card-text">temperature : ${meteo.current.temperature}° 🌡️</p>
        <p class="card-text">humidité : ${meteo.current.humidity}% 💧</p>
        <p class="card-text">force du vent : ${meteo.current.wind_speed} km/h 🌬️</p>
        <p class="card-text">index uv : ${meteo.current.uv_index} 🌞</p>
        <p class="card-text">precipation : ${meteo.current.precip} ${iconPrecip}</p>
      </div>
    </div>
    `
  }
}

formSubmit.addEventListener('submit', e => {
  e.preventDefault()
  city = valueInput.value;
  city.length > 2 ?
    displayMeteo()
  :
    result.innerHTML = `
    <div class="alert alert-danger col-8 mx-auto" role="alert">
      Veuillez saisir le nom d'une ville!
    </div>
    `
})