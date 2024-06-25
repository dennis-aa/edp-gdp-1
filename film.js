let nameH1;
let releasedSpan;
let directorSpan;
let episodeSpan;

let charactersUl;
let planetsUl;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    releasedSpan = document.querySelector('span#released');
    directorSpan = document.querySelector('span#director');
    episodeSpan = document.querySelector('span#episode');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

  async function getFilm(id) {
    let film;
    try {
        film = await fetchFilms(id)
        film.characters = await fetchChractors(id)
        film.planets = await fetchPlanets(id)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderFilms(film);
  
  }

    async function fetchFilms(id) {
        let characterUrl = `${baseUrl}/films/${id}`;
        return await fetch(characterUrl)
          .then(res => res.json())
      }

    async function fetchChractors(id) {
        let characterUrl = `${baseUrl}/films/${id}/characters`;
        return await fetch(characterUrl)
          .then(res => res.json())
      }

    async function fetchPlanets(id) {
        let characterUrl = `${baseUrl}/films/${id}/planets`;
        return await fetch(characterUrl)
          .then(res => res.json())
      }

    const renderFilms = film => {
        document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
        nameH1.textContent = film?.title;
        releasedSpan.textContent = film?.release_date;
        directorSpan.textContent = film?.director;
        episodeSpan.textContent = film?.episode_id;      
        const characterLis = film?.characters.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
        charactersUl.innerHTML = characterLis.join("");
        const planetLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)
        planetsUl.innerHTML = planetLis.join("");
      }