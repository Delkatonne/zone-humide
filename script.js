// Sites Ramsar : coordonnées indicatives, à valider avant publication
const ZONES = [
  { n: "Basse vallée du Couffo", r: "1017", d: "Mono / Couffo / Atlantique", t: "Basse vallée du Couffo, lagune côtière, chenal Aho et lac Ahémé.", img: "aheme.jpg", ll: [6.45, 1.95] },
  { n: "Basse vallée de l'Ouémé", r: "1018", d: "Ouémé / Atlantique / Littoral", t: "Basse vallée de l'Ouémé, lagune de Porto-Novo et lac Nokoué.", img: "nokoue.jpg", ll: [6.45, 2.45] },
  { n: "Complexe W", r: "1668", d: "Alibori", t: "Complexe écologique transfrontalier, au nord du Bénin.", img: "parc-w.jpg", ll: [11.9, 2.4] },
  { n: "Rivière Pendjari", r: "1669", d: "Atacora", t: "Zone humide de la rivière Pendjari, au nord-ouest du Bénin.", img: "pendjari.jpg", ll: [11.2, 1.5] }
];
const $ = s => document.querySelector(s);
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const deps = [...new Set(ZONES.flatMap(z => z.d.split(" / ")))].sort();
deps.forEach(d => $("#dep").insertAdjacentHTML("beforeend", `<option>${d}</option>`));

function render() {
  const q = norm($("#q").value), dep = $("#dep").value;
  const list = ZONES.filter(z => (!dep || z.d.includes(dep)) && norm(z.n + " " + z.d).includes(q));
  $("#cards").innerHTML = list.map((z, i) => `
    <article class="card">
      <img src="images/${z.img}" alt="${z.n}" loading="lazy">
      <div><span class="tag">Site Ramsar ${z.r}</span><h3>${z.n}</h3><p class="dep">${z.d}</p>
      <p>${z.t}</p><p class="todo">Fiche en cours de documentation</p>
      <button class="btn btn-gold" data-i="${ZONES.indexOf(z)}">Voir sur la carte</button></div>
    </article>`).join("") || "<p class='todo'>Aucun site ne correspond à cette recherche.</p>";
}
$("#q").addEventListener("input", render);
$("#dep").addEventListener("change", render);
$("#head-q").addEventListener("input", e => { $("#q").value = e.target.value; render(); });
$(".head-search").addEventListener("submit", e => { e.preventDefault(); $("#zones").scrollIntoView({ behavior: "smooth" }); });
render();

// Carte Leaflet (nécessite une connexion internet pour les tuiles)
let map;
if (window.L) {
  map = L.map("map", { scrollWheelZoom: false }).setView([9.5, 2.3], 6);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
  ZONES.forEach(z => L.circleMarker(z.ll, { radius: 9, color: "#123D35", fillColor: "#16845A", fillOpacity: .9 })
    .addTo(map).bindPopup(`<b>${z.n}</b><br>Site Ramsar ${z.r}<br><small>Position indicative</small>`));
}
$("#cards").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]"); if (!b || !map) return;
  const z = ZONES[b.dataset.i];
  $("#cartographie").scrollIntoView({ behavior: "smooth" });
  map.flyTo(z.ll, 10);
});

// Menu mobile
const mb = $(".menu-btn"), nav = $("#nav");
mb.addEventListener("click", () => mb.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });
$("#year").textContent = new Date().getFullYear();

// Galerie : légendes provisoires, d'après les noms des fichiers
const PHOTOS = [
  ["hero.jpg", "Ouidah"], ["aheme.jpg", "Lac Ahémé"], ["nokoue.jpg", "Lac Nokoué"], ["oueme.jpg", "Basse vallée de l'Ouémé"],
  ["bonou.jpg", "Bonou"], ["aguegue.jpg", "Aguégué"], ["couffo.jpg", "Le fleuve Couffo"], ["adjarra.jpg", "Rivière noire d'Adjarra"],
  ["curage-canaux.jpg", "Curage de canaux"], ["parc-w.jpg", "Parc national W"], ["pendjari.jpg", "Pendjari"],
  ["pendjari-fleuve.jpg", "Rivière Pendjari"], ["tanougou.jpg", "Cascades de Tanougou"]
];
$("#grid").innerHTML = PHOTOS.map(([f, c]) =>
  `<figure><a href="images/${f}" target="_blank" rel="noopener"><img src="images/${f}" alt="${c}" loading="lazy"></a><figcaption>${c}</figcaption></figure>`).join("");
