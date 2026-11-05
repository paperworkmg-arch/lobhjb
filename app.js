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
  {title:"Detour (1945) — Classic Film Noir", id:"Detour"},
  {title:"Great Expectations (1946) — Dickens Drama", id:"GreatExpectations1946"},
  {title:"Penny Serenade (1941) — Cary Grant Drama", id:"penny_serenade"},
  {title:"Secret Agent (1936) — Hitchcock Thriller", id:"Hitchcock_Secret_Agent"},
  {title:"Sherlock Holmes and the Secret Weapon (1943) — Mystery", id:"secret_weapon"},
  {title:"Quicksand (1950) — Film Noir", id:"Quicksand_clear"},
  {title:"Africa Screams (1949) — Abbott & Costello Comedy", id:"AfricaScreams"},
  {title:"Santa Fe Trail (1940) — Western", id:"Santa_Fe_Trail_movie"},
  {title:"War of the Wildcats (1943) — John Wayne Western", id:"WarOfTheWildcats-JohnWayne1943"},
  {title:"Texas Terror (1935) — John Wayne Western", id:"texas_terror_1935"},
  {title:"The Over-the-Hill Gang (1969) — Western", id:"TheOvertheHillGang"},
  {title:"The Gun and the Pulpit (1974) — Western", id:"cco_thegunandthepulpit"},
  {title:"Sword of Lancelot (1963) — Adventure", id:"cco_swordoflancelot"},
  {title:"The Iron Mask (1929) — Fairbanks Adventure", id:"iron_mask"},
  {title:"Tarzan and the Green Goddess (1938) — Adventure", id:"tarzan_and_the_green_goddess"},
  {title:"Mr. Robinson Crusoe (1932) — Adventure Comedy", id:"mr_robinson_crusoe"},
  {title:"The Ghoul (1933) — Boris Karloff Horror", id:"TheGhoul"},
  {title:"Inner Sanctum (1948) — Mystery Horror", id:"Inner_Sanctum_movie"},
  {title:"Häxan (1922) — Horror Classic", id:"Haxan_tinted_and_subtitled"},
  {title:"Frankenstein (1910) — First Frankenstein Film", id:"FrankensteinfullMovie"},
  {title:"Teenagers from Outer Space (1959) — Cult Sci-Fi", id:"teenagers_from_outerspace"},
  {title:"Cosmos: War of the Planets (1977) — Sci-Fi", id:"Cosmos_War_of_the_Planets"},
];
const watchList = document.querySelector("#watch-list");
function playIA(id){
  document.querySelector("#player").src = "https://archive.org/embed/" + id;
  document.querySelector("#watch").scrollIntoView({behavior:"smooth"});
}
WATCH.forEach((w,i)=>{
  const b=document.createElement("button");
  b.textContent = "▶ " + w.title;
  if(i===0) b.className="active";
  b.onclick = ()=>{
    playIA(w.id);
    watchList.querySelectorAll("button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
  };
  watchList.appendChild(b);
});

const CATEGORIES = ["animation","comedy","drama","family","horror","mystery","western"];
const BLOCK = ["sex","nude","nudist","porn","erotic","teaserama","burlesque","adult","molest","child bride"];
const IA_PAGES = 30;
const PAGE = 60;
let all = [], activeGenre = "all", activeSource = "all", shown = PAGE, loading = true;

const $ = s => document.querySelector(s);
const grid = $("#grid"), statusEl = $("#status"), genresEl = $("#genres");
const norm = t => t.toLowerCase().split("(")[0].replace(/[^a-z0-9]/g,"");

function renderGenres(){
  const sampleCount = all.filter(m=>m.source==="sample").length;
  const iaCount = all.filter(m=>m.source==="ia").length;
  const counts = {};
  all.forEach(m => (m.genres||[]).forEach(g => counts[g]=(counts[g]||0)+1));
  const btns = [
    ["all", `All Movies (${all.length})`, activeGenre==="all" && activeSource==="all"],
    ["__ia", `▶ Watchable Now (${iaCount})`, activeSource==="ia"],
    ...CATEGORIES.filter(c=>counts[c]).map(c=>[c, `${c} (${counts[c]})`, activeGenre===c])
  ];
  genresEl.innerHTML = "";
  btns.forEach(([g,label,on])=>{
    const b=document.createElement("button");
    b.textContent = label;
    if(on) b.className="active";
    b.onclick = ()=>{
      if(g==="all"){ activeGenre="all"; activeSource="all"; }
      else if(g==="__ia"){ activeGenre="all"; activeSource="ia"; }
      else { activeGenre=g; activeSource="sample"; }
      shown=PAGE; renderGenres(); render();
    };
    genresEl.appendChild(b);
  });
}

function filtered(){
  const q = $("#q").value.trim().toLowerCase();
  let list = all.filter(m =>
    (activeSource==="all" || m.source===activeSource) &&
    (activeGenre==="all" || (m.genres||[]).includes(activeGenre)) &&
    (!q || m.title.toLowerCase().includes(q))
  );
  if($("#sort").value==="za") list.sort((a,b)=>b.title.localeCompare(a.title));
  else if($("#sort").value==="az") list.sort((a,b)=>a.title.localeCompare(b.title));
  return list;
}

function render(){
  const list = filtered();
  const watchable = all.filter(m=>m.source==="ia").length;
  statusEl.textContent = `${list.length} movies shown · ${all.length} total in the library · ${watchable} playable right here${loading ? " · still loading more…" : ""}`;
  $("#empty").hidden = list.length>0;
  $("#more").hidden = shown >= list.length;
  grid.innerHTML = "";
  list.slice(0, shown).forEach(m=>{
    const card=document.createElement("article");
    card.className="card";
    const badge = m.source==="ia" ? '<span class="badge">▶ WATCH</span>' : '';
    const sub = m.source==="ia" ? (m.year ? "Feature film · " + m.year : "Feature film") : (m.genres||[]).join(" · ");
    card.innerHTML = `${badge}<img loading="lazy" alt="">
      <div class="body"><h3></h3><p></p></div>`;
    const img = card.querySelector("img");
    img.src = m.posterURL;
    img.alt = m.title + " poster";
    img.onerror = ()=>{ img.onerror=null; img.src = "https://placehold.co/300x450/23232e/f4f4f6?text=" + encodeURIComponent(m.title); };
    card.querySelector("h3").textContent = m.title;
    card.querySelector("p").textContent = sub;
    card.onclick = ()=>{ if(m.source==="ia") playIA(m.iaId); else openModal(m); };
    grid.appendChild(card);
  });
}

function openModal(m){
  $("#m-poster").src = m.posterURL;
  $("#m-poster").alt = m.title + " poster";
  $("#m-title").textContent = m.title;
  $("#m-genres").textContent = (m.genres||[]).join(" · ");
  $("#m-imdb").href = "https://www.imdb.com/title/" + m.imdbId + "/";
  $("#m-trailer").href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(m.title + " official trailer");
  $("#modal").showModal();
}
$("#close").onclick = ()=> $("#modal").close();
$("#modal").addEventListener("click", e=>{ if(e.target.id==="modal") $("#modal").close(); });
$("#more").onclick = ()=>{ shown += PAGE; render(); };
$("#clear").onclick = ()=>{ $("#q").value=""; activeGenre="all"; activeSource="all"; shown=PAGE; renderGenres(); render(); };
$("#q").addEventListener("input", ()=>{ shown=PAGE; render(); });
$("#sort").addEventListener("change", render);

async function loadIA(){
  const seen = new Set(all.filter(m=>m.source==="ia").map(m=>m.iaId));
  for(let page=1; page<=IA_PAGES; page++){
    try{
      const url = "https://archive.org/advancedsearch.php?q=" + encodeURIComponent("collection:feature_films AND mediatype:movies")
        + "&fl[]=identifier&fl[]=title&fl[]=year&sort[]=downloads+desc&rows=100&page=" + page + "&output=json";
      const r = await fetch(url);
      if(!r.ok) continue;
      const data = await r.json();
      (data.response.docs||[]).forEach(x=>{
        let t = Array.isArray(x.title) ? x.title[0] : x.title;
        t = (t||"").trim();
        if(!t || !x.identifier || seen.has(x.identifier)) return;
        const low = t.toLowerCase();
        if(BLOCK.some(b=>low.includes(b))) return;
        seen.add(x.identifier);
        all.push({ title:t, year:x.year||"", source:"ia", iaId:x.identifier,
          posterURL:"https://archive.org/services/img/" + x.identifier, genres:[] });
      });
      renderGenres(); render();
    }catch(e){ /* keep loading the next page */ }
  }
}

async function loadSample(){
  try{
    const results = await Promise.all(CATEGORIES.map(async c=>{
      const r = await fetch("https://api.sampleapis.com/movies/" + c);
      if(!r.ok) return [];
      const data = await r.json();
      return Array.isArray(data) ? data.map(m=>({...m, _genre:c})) : [];
    }));
    const iaTitles = new Set(all.filter(m=>m.source==="ia").map(m=>norm(m.title)));
    const byId = new Map();
    results.flat().forEach(m=>{
      if(!m.imdbId || !m.title) return;
      if(byId.has(m.imdbId)){ const ex=byId.get(m.imdbId); if(!ex.genres.includes(m._genre)) ex.genres.push(m._genre); }
      else byId.set(m.imdbId, { title:m.title, posterURL:m.posterURL, imdbId:m.imdbId, genres:[m._genre], source:"sample" });
    });
    byId.forEach(m=>{ if(!iaTitles.has(norm(m.title))) all.push(m); });
  }catch(e){ /* Archive catalog already covers the library */ }
}

(async function load(){
  statusEl.textContent = "Loading 1,000+ movies…";
  await loadIA();
  await loadSample();
  loading = false;
  renderGenres(); render();
})();
