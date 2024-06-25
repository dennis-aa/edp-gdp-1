
let nameH1;
let gravitySpan;
let orbitalSpan;
let populationSpan;
let filmsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    gravitySpan = document.querySelector('span#gravity');
    populationSpan = document.querySelector('span#population');
    orbitalSpan = document.querySelector('span#orbital');
    filmsUl = document.querySelector('#films>ul');
    charactersUl = document.querySelector('#characters>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id');
    getPlanetData(id);
  })
//Fetch Planet
async function getPlanetData(id) {
    let planet;
    let planetURL = `${baseUrl}/planets/${id}`; 
	let charsURL = `${baseUrl}/planets/${id}/characters`;
    let filmsURL = `${baseUrl}/films/${id}/films`;
    try{
    planet = await fetch(planetURL).then(res => res.json());
	
    planet.characters = await fetch(charsURL).then(res => res.json());
	
    planet.films = await fetch(filmsURL).then(res => res.json());
    }
    catch(ex){
        console.error(`Error Reading Character ${id}`);
    }
    renderPlanet(planet);
};

getPlanetData();

const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    gravitySpan.textContent = planet?.gravity;
    orbitalSpan.textContent = planet?.orbital_period;
    populationSpan.textContent = planet?.population;
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
    
    const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersLis.join("");
  }