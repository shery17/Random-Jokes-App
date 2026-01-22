const jokePara = document.getElementById('joke-p')
const jokeBox = document.getElementById('joke-box')
const btnNew = document.getElementById('btn-new');
const btnReveal = document.getElementById('btn-reveal');

const maxId = 451 // there are 451 jokes in the jokes dataset
let currentJoke
let showingPunchline = false;

async function fetchJokeById(id) {
    try {
        const res = await fetch(`/api/jokes/${id}`)
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

function getRandomId(maxId) {
    return Math.floor(Math.random() * maxId) + 1
    // +1 so it’s between 1 and maxId (inclusive)
}

function showSetup(joke) {
  jokePara.textContent = joke.setup;
  jokeBox.classList.remove('punchline-bg');
  jokeBox.classList.add('setup-bg');
}

function showPunchline(joke) {
  jokePara.textContent = joke.punchline;
  jokeBox.classList.remove('setup-bg');
  jokeBox.classList.add('punchline-bg');
}

async function loadNewJoke() {
  const randomId = getRandomId(maxId);
  const joke = await fetchJokeById(randomId);
  if (joke && joke.setup && joke.punchline) {
    currentJoke = joke;
    showingPunchline = false;
    showSetup(joke);
  }
}

function revealPunchline() {
  if (currentJoke && !showingPunchline) {
    showPunchline(currentJoke);
    showingPunchline = true;
  }
}

btnNew.addEventListener('click', loadNewJoke);
btnReveal.addEventListener('click', revealPunchline);

jokeBox.addEventListener('click', () => {
  if (currentJoke && !showingPunchline) {
    revealPunchline();
  } else {
    loadNewJoke();
  }
});