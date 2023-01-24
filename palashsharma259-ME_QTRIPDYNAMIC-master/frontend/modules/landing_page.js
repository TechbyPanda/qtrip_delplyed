import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // return fetch("http://3.111.184.66:8082/cities")
  // .then((result) => {
  //   console.log("success", result);
  //   return result.json();
  // }).catch((error) =>{
  //   console.log("Error",error);
  // });
  try{
    let res = await fetch(config.backendEndpoint+"/cities");
    let data = await res.json();
    return data;
  }catch(error){
    console.log(error);
    return null;
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  let row = document.getElementById("data");
  let card = `
  <div class="col-12 col-sm-6 col-lg-3">
    <a href="pages/adventures/?city=${id}" id=${id}>
      <div class="tile">
        <img src=${image} alt="">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      </div>
    </a>
  </div>
  `;
  row.innerHTML += card;
}

export { init, fetchCities, addCityToDOM };
