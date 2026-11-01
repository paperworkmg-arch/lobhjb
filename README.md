# All Movies

A free movie catalog site — browse, search and filter movies across Animation, Comedy, Drama, Family, Horror, Mystery and Western.

**Repo:** https://github.com/paperworkmg-arch/lobhjb — this was an empty "website" repo, now home to the All Movies site.

## Turn on the live site (GitHub Pages, ~30 seconds)
GitHub's app connection can push code but can't create repos or flip the Pages switch, and web sign-in is blocked at GitHub's 2FA SMS step — so this one switch is manual, in the GitHub app/site where you're already signed in:

1. Open the repo → **Settings → General → Danger Zone → Change visibility → Make public** (Pages is free on public repos)
2. **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**
3. Live at **https://paperworkmg-arch.github.io/lobhjb/** within a minute or two

## Watch real movies on the site
The **Watch Now** player at the top streams full-length public-domain classics legally from the Internet Archive: Night of the Living Dead (1968), His Girl Friday (1940), House on Haunted Hill (1959), Carnival of Souls (1962), The Little Shop of Horrors (1960), Nosferatu (1922), and Dressed to Kill (1946). Each stream was verified live before listing. The 440-title catalog below it is discovery only — newer films are under copyright, so those cards link out to IMDb/trailer instead of streaming pirated copies.

## How it works
- No API key, no backend, no build step — plain HTML/CSS/JS.
- On load it fetches the catalog live from [Sample APIs](https://sampleapis.com/api/movies) (7 genre lists, 440 unique movies after de-duplication by IMDb ID), and merges genres for films that appear in more than one list.
- Every card opens a detail view with links to the film's IMDb page and a YouTube trailer search.
- This is a discovery catalog only — it does not host or stream films.

## Run locally
Open `index.html` in a browser, or serve the folder: `python3 -m http.server`
