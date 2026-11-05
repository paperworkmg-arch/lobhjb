# All Movies

A free movie library with **3,300+ movies** — the 3,000 most-watched feature films from the Internet Archive (most playable right on the page), plus a curated 440-title catalog across Animation, Comedy, Drama, Family, Horror, Mystery and Western.

**Repo:** https://github.com/paperworkmg-arch/lobhjb — this was an empty "website" repo, now home to the All Movies site.

## Turn on the live site (GitHub Pages, ~30 seconds)
GitHub's app connection can push code but can't create repos or flip the Pages switch, and web sign-in is blocked at GitHub's 2FA SMS step — so this one switch is manual, in the GitHub app/site where you're already signed in:

1. Open the repo → **Settings → General → Danger Zone → Change visibility → Make public** (Pages is free on public repos)
2. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**
3. Live at **https://paperworkmg-arch.github.io/lobhjb/** within a minute or two

## Watch real movies on the site
The **Watch Now** player at the top streams 52 full-length public-domain classics legally from the Internet Archive — horror (Night of the Living Dead, Nosferatu, House on Haunted Hill, Carnival of Souls, Phantom of the Opera, Caligari, Horror Express), western (McLintock!), noir (The Stranger, Scarlet Street, Impact), comedy (His Girl Friday, My Favorite Brunette, Laurel & Hardy ×2), musical (Royal Wedding), animation (Gulliver's Travels, Sita Sings the Blues), adventure (Jungle Book, The Lost World, 20,000 Leagues Under the Sea), drama (Meet John Doe, Cyrano de Bergerac, Battleship Potemkin), and more. Every stream embed was verified live (HTTP 200) before listing. The 440-title catalog below it is discovery only — newer films are under copyright, so those cards link out to IMDb/trailer instead of streaming pirated copies.

## How it works
- No API key, no backend, no build step — plain HTML/CSS/JS.
- On load it fetches live from two free, no-key sources with CORS open: (1) the Internet Archive `feature_films` collection (28,536 films exist there) — the 30 most-downloaded pages, ~2,971 films after a family-safe title filter, each playable in the on-page player with posters from Archive's thumbnail service; (2) [Sample APIs](https://sampleapis.com/api/movies) (7 genre lists, 440 unique movies after de-duplication by IMDb ID), minus titles already in the Archive list. Combined library verified at build time: **3,380 unique movies** (Nov 5, 2026).
- Every card opens a detail view with links to the film's IMDb page and a YouTube trailer search.
- This is a discovery catalog only — it does not host or stream films.

## Run locally
Open `index.html` in a browser, or serve the folder: `python3 -m http.server`
