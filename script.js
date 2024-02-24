let nextPageUrl;
let prevPageUrl;

showPlanetsData("https://swapi.dev/api/planets/?format=json");

function nextpage() {
  if (nextPageUrl) {
    showPlanetsData(nextPageUrl);
  } else {
    console.log("No more pages");
  }
}

function prevpage() {
  if (prevPageUrl) {
    showPlanetsData(prevPageUrl);
  } else {
    console.log("This is the First Page");
  }
}

function showPlanetsData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const planets = data.results;
      const info = document.querySelector(".main");
      info.innerHTML = ""; // Clear previous planets
      planets.forEach((planet) => {
        const planetDiv = document.createElement("div");
        planetDiv.classList.add("planetswiki");
        planetDiv.innerHTML = `
        <h2>${planet.name}</h2>
        <p>Rotation Period: ${planet.rotation_period}</p>
        <p>Orbital Period: ${planet.orbital_period}</p>
        <p>Diameter: ${planet.diameter}</p>
        <p>Climate: ${planet.climate}</p>
        <p>Gravity: ${planet.gravity}</p>
        <p>Terrain: ${planet.terrain}</p>
        <p>Surface Water: ${planet.surface_water}</p>
        <p>Population: ${planet.population}</p>
        <button onclick="showResidents('${planet.name}','${planet.residents}')">Residents</button>
        `;
        info.appendChild(planetDiv);
      });
      nextPageUrl = data.next;
      prevPageUrl = data.previous;
      console.log(nextPageUrl);
    })
    .catch((error) => {
      console.error("Error fetching planets:", error);
    });
}

function showResidents(planetName, urls) {
  const urlss = urls.split(",");
  const residentsPromises = urlss.map((residentURL) =>
    residentindvinfo(residentURL)
  );
  Promise.all(residentsPromises)
    .then((residents) => {
      console.log(`Residents of ${planetName}:`, residents);
      // Display resident information in UI
    })
    .catch(() => {
      console.log("No residents as of now in " + planetName);
    });
}

// function residentinfo(people) {
//   const requests = people.map((resiurl) => residentindvinfo(resiurl));
//   //   console(requests);
//   return Promise.all(requests);
// }
function residentindvinfo(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return {
        name: data.name,
        height: data.height,
        mass: data.mass,
        hair_color: data.hair_color,
        skin_color: data.skin_color,
        eye_color: data.eye_color,
        birth_year: data.birth_year,
        gender: data.gender,
      };
    });
}

// function fetchResidents(residentUrls) {
//     // Array to store promises for fetching resident data
//     const residentPromises = [];

//     // Iterate over each resident URL
//     residentUrls.forEach((url) => {
//       // Fetch resident data and add the promise to the array
//       const promise = fetch(url)
//         .then((response) => response.json())
//         .then((resident) => {
//           // Process the resident data here
//           console.log("Resident:", resident);
//           // For example, you can create HTML elements to display resident information
//           // const residentDiv = document.createElement("div");
//           // residentDiv.textContent = `Name: ${resident.name}, Height: ${resident.height}, Mass: ${resident.mass}, Gender: ${resident.gender}`;
//           // document.body.appendChild(residentDiv);
//         })
//         .catch((error) => {
//           console.error("Error fetching resident data:", error);
//         });

//       residentPromises.push(promise);
//     });

//     // Return a promise that resolves when all resident data is fetched
//     return Promise.all(residentPromises);
//   }
