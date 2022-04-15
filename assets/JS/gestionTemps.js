const jourSemaine = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);
// console.log(jourActuel);
// console.log(new Date());

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = jourSemaine
  .slice(jourSemaine.indexOf(jourActuel))
  .concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));

console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;
