import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let params = new URLSearchParams(search);
  let entries = params.entries();
  let {adventure} = Object.fromEntries(entries);
  // Place holder for functionality to work in the Stubs
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(config.backendEndpoint+'/adventures/detail?adventure='+adventureId);
    let data = await res.json();
    return data;
  }catch(error){
    console.log(error);
    // Place holder for functionality to work in the Stubs
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventure_name = document.getElementById("adventure-name");
  let adventure_subtitle = document.getElementById("adventure-subtitle");
  let photo_gallery = document.getElementById("photo-gallery");
  let adventure_content = document.getElementById("adventure-content");

  adventure_name.innerHTML = adventure.name;
  adventure_subtitle.innerHTML = adventure.subtitle;
  adventure.images.map((image) => {
    const newElement = document.createElement("div");
    newElement.className = "col-lg-12";

    newElement.innerHTML = `
      <img
        src=${image}
        class="activity-card-image pb-3 pb-md-0"
      />
    `
    photo_gallery.appendChild(newElement);
  })
  
  adventure_content.innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photo_gallery = document.getElementById("photo-gallery");
  
  photo_gallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner" id="carousel-inner"></div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
      </button>
  </div>
  `
  let carousel_inner = document.getElementById("carousel-inner");

  images.map((image, index) => {
    const newElement = document.createElement("div");
    newElement.className = `carousel-item ${index == 0 ? 'active' : ''}`;

    newElement.innerHTML = `
      <img
        src=${image}
        class="activity-card-image pb-3 pb-md-0"
      />
    `
    carousel_inner.appendChild(newElement);
  })
  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let soldOut = document.getElementById("reservation-panel-sold-out");
  let reservationPanel = document.getElementById("reservation-panel-available");
  if(adventure.available){
    reservationPanel.style.display = "block";
    soldOut.style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    soldOut.style.display = "block";
    reservationPanel.style.display = "none";
  }
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let { costPerHead } = adventure;
  const reservationCost = document.getElementById("reservation-cost");
  reservationCost.innerHTML = (costPerHead * persons);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint+"/reservations/new";
    let formElements = form.elements;
    console.log("formElements = ",formElements);

    let payload = {
      name: formElements["name"].value.trim(),
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json"
        }
      })

    } catch (error) {
      alert("failed to fetch url")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedBanner = document.getElementById("reserved-banner");
  if(adventure.reserved)
    reservedBanner.style.display = "block";
  else
    reservedBanner.style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
