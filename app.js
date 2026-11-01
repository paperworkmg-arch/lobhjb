const WATCH = [
  {title:"Night of the Living Dead (1968) — Horror", id:"notld_201610"},
  {title:"His Girl Friday (1940) — Comedy", id:"his_girl_friday"},
  {title:"House on Haunted Hill (1959) — Horror", id:"house_on_haunted_hill"},
  {title:"Carnival of Souls (1962) — Horror", id:"CarnivalOfSouls_823"},
  {title:"The Little Shop of Horrors (1960) — Horror/Comedy", id:"The_Little_Shop_of_Horrors_60"},
  {title:"Nosferatu (1922) — Horror Classic", id:"fw-murnaus-nosferatu-1922"},
  {title:"Dressed to Kill (1946) — Sherlock Holmes Mystery", id:"dressed_to_kill"},
  {title:"McLintock! (1963) — John Wayne Western", id:"mclintok_widescreen"},
  {title:"Meet John Doe (1941) — Frank Capra Drama", id:"meet_john_doe"},
  {title:"The Stranger (1946) — Orson Welles Noir", id:"TheStranger_0"},
  {title:"Scarlet Street (1945) — Fritz Lang Noir", id:"ScarletStreet"},
  {title:"Suddenly (1954) — Sinatra Thriller", id:"suddenly"},
  {title:"Impact (1949) — Film Noir", id:"impact"},
  {title:"My Favorite Brunette (1947) — Bob Hope Comedy", id:"my_favorite_brunette"},
  {title:"The Flying Deuces (1939) — Laurel & Hardy Comedy", id:"TheFlyingDeuces"},
  {title:"Utopia (1951) — Laurel & Hardy Comedy", id:"utopia"},
  {title:"Royal Wedding (1951) — Fred Astaire Musical", id:"royal_wedding"},
  {title:"Cyrano de Bergerac (1950) — Drama", id:"Cyrano_DeBergerac"},
  {title:"The Little Princess (1939) — Shirley Temple Family", id:"little_princess"},
  {title:"Gulliver's Travels (1939) — Animation", id:"gullivers_travels1939"},
  {title:"Sita Sings the Blues (2008) — Animation", id:"Sita_Sings_the_Blues"},
  {title:"Jungle Book (1942) — Adventure", id:"JungleBook"},
  {title:"The Phantom of the Opera (1925) — Horror Classic", id:"ThePhantomoftheOpera"},
  {title:"The Cabinet of Dr. Caligari (1919) — Horror Classic", id:"DasKabinettdesDoktorCaligariTheCabinetofDrCaligari"},
  {title:"The Lost World (1925) — Adventure / Dinosaurs", id:"lost_world"},
  {title:"20,000 Leagues Under the Sea (1916) — Adventure", id:"20000LeaguesUndertheSea"},
  {title:"Battleship Potemkin (1925) — Classic Drama", id:"BattleshipPotemkin"},
  {title:"Horror Express (1973) — Horror", id:"Horror_Express"},
  {title:"Killers from Space (1954) — Sci-Fi", id:"Killers_from_space"},
  {title:"Reefer Madness (1938) — Cult Classic", id:"reefer_madness1938"},
];
const watchList = document.querySelector("#watch-list");
WATCH.forEach((w,i)=>{
  const b=document.createElement("button");
  b.textContent = "▶ " + w.title;
  if(i===0) b.className="active";
  b.onclick = ()=>{
    document.querySelector("#player").src = "https://archive.org/embed/" + w.id;
    watchList.querySelectorAll("button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    document.querySelector("#watch").scrollIntoView({behavior:"smooth"});
  };
  watchList.appendChild(b);
});

const CATEGORIES = ["animation","comedy","drama","family","horror","mystery","western"];
const PAGE = 60;
let all = [], activeGenre = "all", shown = PAGE;

const $ = s => document.querySelector(s);
const grid = $("#grid"), statusEl = $("#status"), genresEl = $("#genres");

function renderGenres(){
  const counts = {};
  all.forEach(m => m.genres.forEach(g => counts[g]=(counts[g]||0)+1));
  const btns = [["all", all.length], ...CATEGORIES.filter(c=>counts[c]).map(c=>[c,counts[c]])];
  genresEl.innerHTML = "";
  btns.forEach(([g,n])=>{
    const b=document.createElement("button");
    b.textContent = `${g === "all" ? "All Movies" : g} (${n})`;
    b.className = g===activeGenre ? "active" : "";
    b.onclick = ()=>{ activeGenre=g; shown=PAGE; renderGenres(); render(); };
    genresEl.appendChild(b);
  });
}

function filtered(){
  const q = $("#q").value.trim().toLowerCase();
  let list = all.filter(m =>
    (activeGenre==="all" || m.genres.includes(activeGenre)) &&
    (!q || m.title.toLowerCase().includes(q))
  );
  list.sort((a,b)=> $("#sort").value==="za" ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title));
  return list;
}

function render(){
  const list = filtered();
  statusEl.textContent = `${list.length} movie${list.length===1?"":"s"} ${activeGenre==="all"?"in the catalog":"in "+activeGenre}${$("#q").value.trim()?` matching “${$("#q").value.trim()}”`:""}`;
  $("#empty").hidden = list.length>0;
  $("#more").hidden = shown >= list.length;
  grid.innerHTML = "";
  list.slice(0, shown).forEach(m=>{
    const card=document.createElement("article");
    card.className="card";
    card.innerHTML = `<img loading="lazy" src="${m.posterURL}" alt="${m.title.replace(/"/g,"&quot;")} poster">
      <div class="body"><h3></h3><p>${m.genres.join(" · ")}</p></div>`;
    const img = card.querySelector("img");
    img.onerror = ()=>{ img.onerror=null; img.src = "https://placehold.co/300x450/23232e/f4f4f6?text=" + encodeURIComponent(m.title); };
    card.querySelector("h3").textContent = m.title;
    card.onclick = ()=> openModal(m);
    grid.appendChild(card);
  });
}

function openModal(m){
  $("#m-poster").src = m.posterURL;
  $("#m-poster").alt = m.title + " poster";
  $("#m-title").textContent = m.title;
  $("#m-genres").textContent = m.genres.join(" · ");
  $("#m-imdb").href = "https://www.imdb.com/title/" + m.imdbId + "/";
  $("#m-trailer").href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(m.title + " official trailer");
  $("#modal").showModal();
}
$("#close").onclick = ()=> $("#modal").close();
$("#modal").addEventListener("click", e=>{ if(e.target.id==="modal") $("#modal").close(); });
$("#more").onclick = ()=>{ shown += PAGE; render(); };
$("#clear").onclick = ()=>{ $("#q").value=""; activeGenre="all"; shown=PAGE; renderGenres(); render(); };
$("#q").addEventListener("input", ()=>{ shown=PAGE; render(); });
$("#sort").addEventListener("change", render);

async function load(){
  try{
    const results = await Promise.all(CATEGORIES.map(async c=>{
      const r = await fetch("https://api.sampleapis.com/movies/" + c);
      if(!r.ok) return [];
      const data = await r.json();
      return Array.isArray(data) ? data.map(m=>({...m, _genre:c})) : [];
    }));
    const byId = new Map();
    results.flat().forEach(m=>{
      if(!m.imdbId || !m.title) return;
      if(byId.has(m.imdbId)){ const ex=byId.get(m.imdbId); if(!ex.genres.includes(m._genre)) ex.genres.push(m._genre); }
      else byId.set(m.imdbId, { title:m.title, posterURL:m.posterURL, imdbId:m.imdbId, genres:[m._genre] });
    });
    all = [...byId.values()];
    if(!all.length) throw new Error("empty catalog");
    statusEl.textContent = "";
    renderGenres(); render();
  }catch(e){
    statusEl.textContent = "Could not load the live catalog — check your connection and refresh. (No movies are hosted here; the list comes from a free public catalog.)";
  }
}
load();
