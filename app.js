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
    card.innerHTML = `<img loading="lazy" src="${m.posterURL}" alt="${m.title.replace(/"/g,"&quot;")} poster" onerror="this.src='https://placehold.co/300x450/23232e/f4f4f6?text='+encodeURIComponent('${"Movie"}')">
      <div class="body"><h3></h3><p>${m.genres.join(" · ")}</p></div>`;
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
