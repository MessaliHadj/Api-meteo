let formSubmit = document.getElementById('formSubmit')
let valueInput = document.getElementById('valueInput')
let result = document.getElementById('result')
let city = ""
let meteo = []
const ApiKey = 'ad8b8388eceddfc6188e49641dca866d'

const fetchMeteo = async ()=>{
  const ApiUri = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${city}`
  meteo = await fetch(ApiUri).then((response) => response.json())
  console.log(meteo);
}

formSubmit.addEventListener('submit', e => {
  e.preventDefault()
  city = valueInput.value;
  if (city.length > 2) {
    fetchMeteo()
  } else {
    result.innerHTML = `
    <div class="alert alert-danger col-8 mx-auto" role="alert">
      Veuillez saisir le nom d'une ville!
    </div>
    `
  }
})