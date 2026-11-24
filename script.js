// Sites Ramsar : coordonnées indicatives, à valider avant publication
const ZONES = [
  { n: "Basse vallée du Couffo", r: "1017", d: "Atlantique / Mono / Couffo / Zou", t: "Basse vallée du Couffo, lagune côtière, chenal Aho et lac Ahémé", a: "524 289 ha", i: "47 500 ha (étendu en 2018)", img: "aheme.jpg", ll: [6.7936, 1.8536] },
  { n: "Basse vallée de l'Ouémé", r: "1018", d: "Littoral / Atlantique / Ouémé / Plateau / Zou", t: "Basse vallée de l'Ouémé, lagune de Porto-Novo et lac Nokoué", a: "652 760 ha", i: "91 600 ha (étendu, année à confirmer)", img: "nokoue.jpg", ll: [6.7539, 2.4131] },
  { n: "Complexe W", r: "1668", d: "Alibori", t: "Site Ramsar du Complexe W", a: "926 927 ha", i: "à confirmer", img: "parc-w.jpg", ll: [11.6869, 2.6875] },
  { n: "Rivière Pendjari", r: "1669", d: "Atacora", t: "Zone humide de la rivière Pendjari", a: "483 366 ha", i: "144 774 ha (étendu en 2018)", img: "pendjari.jpg", ll: [11.1444, 1.5547] }
];
const RAMSAR = r => "https://rsis.ramsar.org/ris/" + r;
const NUL = { addEventListener() {}, setAttribute() {}, insertAdjacentHTML() {}, classList: { toggle() {}, remove() {} }, value: "", set innerHTML(v) {}, set textContent(v) {} };
const $ = s => document.querySelector(s) || NUL;
const P = new URLSearchParams(location.search), QZ = P.get("z");
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const deps = [...new Set(ZONES.flatMap(z => z.d.split(" / ")))].sort();
deps.forEach(d => $("#dep").insertAdjacentHTML("beforeend", `<option>${d}</option>`));

if (P.get("q")) { $("#q").value = P.get("q"); }
function render() {
  const q = norm($("#q").value), dep = $("#dep").value;
  const list = ZONES.filter(z => (!dep || z.d.includes(dep)) && norm(z.n + " " + z.d).includes(q));
  $("#cards").innerHTML = list.map((z, i) => `
    <article class="card">
      <img src="images/${z.img}" alt="${z.n}" loading="lazy">
      <div><span class="tag">Site Ramsar ${z.r}</span><h3>${z.n}</h3><p class="dep">${z.d}</p>
      <p class="area">Superficie actuelle (Ramsar) : <b>${z.a}</b><br><small>Initiale : ${z.i}</small></p><p class="todo">Espèces et statuts UICN : en cours de documentation</p>
      <div class="acts"><a class="btn btn-gold" href="cartographie.html?z=${ZONES.indexOf(z)}">Voir sur la carte</a><a class="btn btn-ghost" href="menaces.html?z=${ZONES.indexOf(z)}">Menaces</a></div></div>
    </article>`).join("") || "<p class='todo'>Aucun site ne correspond à cette recherche.</p>";
}
$("#q").addEventListener("input", render);
$("#dep").addEventListener("change", render);
$(".head-search").addEventListener("submit", e => { e.preventDefault(); location.href = "zones.html?q=" + encodeURIComponent($("#head-q").value); });
render();

// Carte Leaflet (nécessite une connexion internet pour les tuiles)
let map;
if (window.L && document.getElementById("map")) {
  map = L.map("map", { scrollWheelZoom: false }).setView([9.5, 2.3], 6);
  if (QZ !== null && ZONES[QZ]) map.setView(ZONES[QZ].ll, 9);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap" }).addTo(map);
  ZONES.forEach(z => L.circleMarker(z.ll, { radius: 9, color: "#123D35", fillColor: "#16845A", fillOpacity: .9 })
    .addTo(map).bindPopup(`<b>${z.n}</b><br>Site Ramsar ${z.r}<br><small>Position indicative</small>`));
}

// Menu mobile
const mb = $(".menu-btn"), nav = $("#nav");
mb.addEventListener("click", () => mb.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });
$("#year").textContent = new Date().getFullYear();

// Galerie : légendes provisoires, d'après les noms des fichiers
const PHOTOS = [
  ["hero.jpg", "Ouidah"], ["ouidah-cours-eau.jpg", "Ouidah, cours d'eau"], ["aheme.jpg", "Lac Ahémé"], ["nokoue.jpg", "Lac Nokoué"], ["oueme.jpg", "Basse vallée de l'Ouémé"],
  ["bonou.jpg", "Bonou"], ["aguegue.jpg", "Aguégué, pêcheurs"], ["aguegue-2.jpg", "Aguégué, mangrove (2)"], ["aguegue-3.jpg", "Aguégué, mangrove (3)"], ["aguegue-4.jpg", "Aguégué, mangrove (4)"],
  ["aguegue-5.jpg", "Aguégué, berge (5)"], ["aguegue-6.jpg", "Aguégué, plan d'eau (6)"], ["aguegue-7.jpg", "Aguégué, végétation (7)"], ["adjohoun-1.jpg", "Adjohoun (1)"], ["adjohoun-2.jpg", "Adjohoun (2)"],
  ["adjohoun-3.jpg", "Adjohoun (3)"], ["adjohoun-4.jpg", "Adjohoun (4)"], ["kpomasse.jpg", "Kpomassè"], ["couffo.jpg", "Le fleuve Couffo"], ["adjarra.jpg", "Rivière noire d'Adjarra"],
  ["curage-canaux.jpg", "Curage de canaux"], ["parc-w.jpg", "Parc national W"], ["pendjari.jpg", "Pendjari"], ["pendjari-fleuve.jpg", "Rivière Pendjari"], ["tanougou.jpg", "Cascades de Tanougou"]
];
$("#grid").innerHTML = PHOTOS.map(([f, c]) =>
  `<figure><a href="images/${f}" target="_blank" rel="noopener"><img src="images/${f}" alt="${c}" loading="lazy"></a><figcaption>${c}</figcaption></figure>`).join("");

// Menaces par site (sources citées ; à valider par le porteur du projet)
const WAP = "Menaces documentées à l'échelle du complexe W-Arly-Pendjari ; une analyse propre à ce site reste à compléter.";
const WAPSRC = [["PNUD/FEM, projet WAP (2018)", "https://info.undp.org/docs/pdc/Documents/BFA/00043891_PRODOC_FRANCAIS_1617_W_Arly_Pendjari_180208.doc"], ["UNESCO, Centre du patrimoine mondial (2025)", "https://whc.unesco.org/fr/soc/4770"], ["UNESCO, Centre du patrimoine mondial (2026)", "https://whc.unesco.org/fr/soc/5045"]];
const WAPITEMS = ["Empiètements agricoles", "Transhumance non contrôlée et pacage", "Braconnage", "Feux de brousse non contrôlés", "Envasement et pollution des eaux", "Activités illégales et insécurité dans le nord du Bénin"];
const THREATS = [
  { items: ["Surexploitation des mangroves", "Érosion des sols liée à l'exploitation forestière illégale", "Érosion côtière"], src: [["Fiche Ramsar du site 1017", RAMSAR("1017")]] },
  { items: ["Chasse et braconnage", "Pollution", "Destruction de la mangrove", "Déforestation", "Urbanisation mal maîtrisée et déchets solides qui obstruent le drainage (zone Est du site)"],
    src: [["Fiche KBA du lac Nokoué (évaluation 2015)", "https://www.keybiodiversityareas.org/site/factsheet/6041"], ["Banque européenne d'investissement, projet de drainage (2020)", "https://www.eib.org/attachments/registers/132249685.pdf"]] },
  { items: WAPITEMS, src: [["Fiche Ramsar du site 1668", RAMSAR("1668")], ...WAPSRC], note: WAP },
  { items: WAPITEMS, src: [["Fiche Ramsar du site 1669", RAMSAR("1669")], ...WAPSRC], note: WAP }
];
function showThreats(i) {
  const z = ZONES[i], t = THREATS[i];
  document.querySelectorAll("#tabs button").forEach((b, k) => b.setAttribute("aria-selected", k == i));
  $("#tabpanel").innerHTML = `<h3>${z.n} <small>Site Ramsar ${z.r}</small></h3>
    <ul>${t.items.map(x => `<li>${x}</li>`).join("")}</ul>${t.note ? `<p class="todo">${t.note}</p>` : ""}
    <p class="srcs"><b>Sources :</b> ${t.src.map(s => `<a href="${s[1]}" target="_blank" rel="noopener">${s[0]}</a>`).join(" · ")}</p>`;
}
$("#tabs").innerHTML = ZONES.map((z, i) => `<button role="tab" data-i="${i}">${z.n}</button>`).join("");
$("#tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) showThreats(b.dataset.i); });
showThreats(ZONES[QZ] ? QZ : 0);
