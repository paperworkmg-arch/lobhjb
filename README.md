# All Movies

A free movie catalog site — browse, search and filter movies across Animation, Comedy, Drama, Family, Horror, Mystery and Western.

**Live site:** https://paperworkmg-arch.github.io/all-movies/

## How it works
- No API key, no backend, no build step — plain HTML/CSS/JS.
- On load it fetches the catalog live from [Sample APIs](https://sampleapis.com/api/movies) (7 genre lists), de-duplicates by IMDb ID, and merges genres for films that appear in more than one list.
- Every card opens a detail view with links to the film's IMDb page and a YouTube trailer search.
- This is a discovery catalog only — it does not host or stream films.

## Run locally
Open `index.html` in a browser, or serve the folder: `python3 -m http.server`
