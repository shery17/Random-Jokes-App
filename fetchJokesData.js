// store url of index.json from provided github repo
const url = 'https://raw.githubusercontent.com/15Dkatz/official_joke_api/refs/heads/master/jokes/index.json'; 

// fetch the JSON file from github
const res = await fetch(url)
if (!res.ok) { // if response code is not ok, throw an error
  throw new Error(`Failed to fetch jokes data: ${res.status} ${res.statusText}`)
}

// convert the response object from JSON to a JS array
export const jokesData = await res.json()
