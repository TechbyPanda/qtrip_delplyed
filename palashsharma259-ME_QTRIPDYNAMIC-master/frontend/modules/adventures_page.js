
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let entries = params.entries();
  let {city} = Object.fromEntries(entries);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {

  try{
    let res = await fetch(config.backendEndpoint+'/adventures/?city='+city);
    let data = await res.json();
    return data;
  }catch(error){
    console.log(error);
    return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {

  let row = document.getElementById("data");
  let cards = ``;
  adventures.forEach(element => {
    cards += `
    <div class="col-lg-3 col-sm-6 position-relative">
        <a href="detail/?adventure=${element.id}" id=${element.id}>
            <div class="category-banner">${element.category}</div>
            <div class="activity-card">
                <img src=${element.image} class="activity-card-image" alt="">
                <div class="mt-2 p-2 w-100">
                    <div class="d-flex justify-content-between w-100 m-0">
                        <h5>${element.name}</h5>
                        <p>${element.costPerHead}</p>
                    </div>
                    <div class="d-flex justify-content-between w-100 m-0">
                        <h5>Duration</h5>
                        <p>${element.duration}</p>
                    </div>
                </div>
            </div>
        </a>
      </div>
    `
  });
  row.innerHTML = cards;
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newList = list.filter((value) => {
    if(value.duration >= low && value.duration <= high)
      return value
  })
  return newList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let newList = list.filter((value) => {
    if(categoryList.includes(value.category))
      return value;
  })
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filtered_list = [];
  let categoryList = filters["category"];
  let duration = filters["duration"];
  if(categoryList.length > 0 && duration){
    let data1 = filterByCategory(list, categoryList);
    let data2 = filterByDuration(list, duration.split("-")[0], duration.split("-")[1]);
    filtered_list = data1.filter((obj) => {
      if(data2.includes(obj))
        return obj;
    })
    return filtered_list;
  }else if(categoryList.length > 0){
    let data = filterByCategory(list, categoryList);
    return data;
  }else if(duration){
    let data = filterByDuration(list, duration.split("-")[0], duration.split("-")[1]);
    return data;
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = localStorage.getItem("filters");
  if(filters)
    return JSON.parse(filters);
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let {category} = filters;
  let categories = document.getElementById("category-list");
  let pills = ``;

  // refactor
  category.forEach((value) => {
    pills += getPill(value);
  })

  categories.innerHTML = pills;
  
}

function getPill(element){
  let pill = `
    <span class="category-filter">${element}</span>
  `
  return pill;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
