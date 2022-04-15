import tabJoursEnOrdre from "./gestionTemps.js";

// console.log(tabJoursEnOrdre);

const clefAPI = "64a29ce31aa8ab49fadf9d55fc49f305";
let resultatAPI;
const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const imgIcone = document.querySelector(".logo-meteo");
const chargementContainer = document.querySelector(".overlay-icone-chargement");

// partie géolocalisation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //   console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelAPI(long, lat);
    },
    () => {
      alert(
        "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !"
      );
    }
  );
}

// appel de l'API
function AppelAPI(long, lat) {
  //   console.log(long, lat);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${clefAPI}`
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      console.log(data);
      resultatAPI = data;
      temps.innerText = resultatAPI.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`;
      localisation.innerText = resultatAPI.timezone;

      //   les heures par tranche de 3 et leur temperature.

      let heureActuelle = new Date().getHours();

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = `00 h`;
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }

      // temp pour 3h
      for (let j = 0; j < tempPourH.length; j++) {
        tempPourH[j].innerText = `${Math.trunc(
          resultatAPI.hourly[j * 3].temp
        )}°`;
      }

      // trois premières lettres des jours
      for (let k = 0; k < tabJoursEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
      }

      // temp par jours
      for (let m = 0; m < 7; m++) {
        tempJoursDiv[m].innerText = `${Math.trunc(
          resultatAPI.daily[m + 1].temp.day
        )}°`;
      }

      // icone dynamique
      if (heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `assets/img/jour/${resultatAPI.current.weather[0].icon}.svg`;
      } else {
        imgIcone.src = `assets/img/nuit/${resultatAPI.current.weather[0].icon}.svg`;
      }

      chargementContainer.classList.add("disparition");
    });
}
