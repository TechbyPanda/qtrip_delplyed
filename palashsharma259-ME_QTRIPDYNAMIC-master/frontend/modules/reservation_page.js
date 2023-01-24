import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(config.backendEndpoint+"/reservations");
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  console.log(reservations)
  let reservationTableParent = document.getElementById("reservation-table-parent");
  let reservationBanner = document.getElementById("no-reservation-banner");
  let reservationTable = document.getElementById("reservation-table");

  if(reservations.length){
    reservationTableParent.style.display = "block";
    reservationBanner.style.display = "none";
  }else {
    reservationTableParent.style.display = "none";
    reservationBanner.style.display = "block";
  }

  reservations.forEach((element,index) => {
    let date = element.date.split("-");
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    // let time = new Date(element.time).toLocaleTimeString("en-IN");
    // let time = new Date(element.time).toLocaleString("en-IN");
    let time = new Date(element.time).toLocaleTimeString("en-IN");
    let day = new Date(element.time).getDate();
    let month = new Date(element.time).getMonth();
    let year = new Date(element.time).getFullYear();
    console.log(monthNames[month]);
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${((date[2].charAt(0) == "0") ? date[2].charAt(1) : date[2]) +"/"+((date[1].charAt(0) == "0") ? date[1].charAt(1) : date[1])+"/"+date[0]}</td>
      <td>${element.price}</td>
      <td>${day+" "+monthNames[month]+" "+year+", "+time}</td>
      <td>
        <div class="reservation-visit-button" id=${element.id}>
          <a href="../detail/?adventure=${element.adventure}">visit adventure</a>
        </div>
      </td>
    `;
    reservationTable.appendChild(tr);
  })

}

export { fetchReservations, addReservationToTable };
