/* =========================================================
   Portfolio Franck DUBOIS--DORLEANS – script principal
   ========================================================= */

/* ---------- 1. DONNÉES DES PROJETS ----------
   Pour ajouter une documentation PDF : mettre le fichier dans /docs
   et renseigner doc: "docs/nom-du-fichier.pdf" (sinon laisser null). */
const projets = [
  {
    titre: "Support utilisateurs et ticketing GLPI – Biotope",
    icone: "🎫",
    categorie: "support",
    resume: "Traitement des incidents informatiques des utilisateurs avec l'outil de ticketing GLPI.",
    tags: ["GLPI", "Support niveau 1", "Windows", "Parc informatique"],
    contexte: "Expérience en entreprise chez Biotope (2025-2026), au sein du service informatique.",
    etapes: [
      "Réception et qualification des tickets dans GLPI",
      "Diagnostic des incidents et dépannage de premier niveau",
      "Assistance aux utilisateurs et suivi jusqu'à la résolution",
      "Aide à la configuration de postes et gestion du lab"
    ],
    competences: ["B1.1", "B1.2", "B1.5"],
    doc: null
  },
  {
    titre: "Segmentation réseau avec VLAN",
    icone: "🖧",
    categorie: "reseau",
    resume: "Création de VLAN et routage inter-VLAN sur Cisco Packet Tracer.",
    tags: ["Cisco", "VLAN", "Packet Tracer", "802.1Q"],
    contexte: "TP de routage et commutation : séparer les services d'une entreprise (Administration, Comptabilité, Invités).",
    etapes: [
      "Conception du plan d'adressage IP",
      "Création des VLAN et configuration des ports trunk / access",
      "Routage inter-VLAN (router-on-a-stick)",
      "Tests de connectivité"
    ],
    competences: ["B1.1", "B1.4", "B1.5"],
    doc: null
  },
  {
    titre: "Mise en place d'un Active Directory",
    icone: "🗂️",
    categorie: "systeme",
    resume: "Installation d'un contrôleur de domaine Windows Server avec DNS, DHCP et GPO.",
    tags: ["Windows Server", "AD DS", "GPO", "DNS"],
    contexte: "TP d'administration de serveurs simulant le réseau d'une PME.",
    etapes: [
      "Installation de Windows Server sur une machine virtuelle",
      "Promotion en contrôleur de domaine et création des OU",
      "Configuration des rôles DNS et DHCP",
      "Création de GPO (lecteurs réseau, restrictions)"
    ],
    competences: ["B1.1", "B1.5"],
    doc: null
  },
  {
    titre: "Ce portfolio",
    icone: "🌊",
    categorie: "systeme",
    resume: "Conception de mon site portfolio en HTML, CSS et JavaScript, versionné sur GitHub.",
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    contexte: "Présenter mon parcours et mes compétences pour l'épreuve du BTS et ma recherche d'alternance.",
    etapes: [
      "Structure des pages en HTML sémantique",
      "Thème graphique personnalisé et responsive en CSS",
      "Filtres de projets, animations et formulaire en JavaScript",
      "Versionnement et publication avec Git / GitHub Pages"
    ],
    competences: ["B1.3", "B1.4", "B1.6"],
    doc: null
  },
  {
    titre: "Projet système et réseau sécurisé",
    icone: "🔒",
    categorie: "securite",
    resume: "Projet de BTS : concevoir une petite infrastructure en appliquant les bonnes pratiques de sécurité.",
    tags: ["Sécurité", "Pare-feu", "Sauvegardes", "ANSSI"],
    contexte: "Projet en cours dans le cadre du BTS SIO SISR, en lien avec le MOOC SecNumacadémie de l'ANSSI.",
    etapes: [
      "Analyse du besoin et schéma réseau",
      "Mise en place des services et du filtrage",
      "Politique de sauvegarde et de mots de passe",
      "Rédaction de la documentation technique"
    ],
    competences: ["B1.1", "B1.4", "B1.5"],
    doc: null
  }
];

/* Noms officiels des compétences du Bloc 1 du BTS SIO */
const nomsCompetences = {
  "B1.1": "Gérer le patrimoine informatique",
  "B1.2": "Répondre aux incidents et aux demandes d'assistance et d'évolution",
  "B1.3": "Développer la présence en ligne de l'organisation",
  "B1.4": "Travailler en mode projet",
  "B1.5": "Mettre à disposition des utilisateurs un service informatique",
  "B1.6": "Organiser son développement professionnel"
};

/* ---------- 2. MENU : LIEN DE LA PAGE ACTUELLE ---------- */
const pageActuelle = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === pageActuelle) a.classList.add("active");
});

/* ---------- 3. MENU BURGER (mobile) ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const ouvert = navLinks.classList.toggle("open");
  burger.classList.toggle("open", ouvert);
  burger.setAttribute("aria-expanded", ouvert);
});

/* ---------- 4. PAGE PROJETS ---------- */
const grid = document.getElementById("projectsGrid");

if (grid) {
  const tagsHTML = tags => tags.map(t => `<span class="tag">${t}</span>`).join("");

  grid.innerHTML = projets.map((p, i) => `
    <article class="project-card reveal" data-cat="${p.categorie}">
      <div class="project-icon">${p.icone}</div>
      <h3>${p.titre}</h3>
      <p>${p.resume}</p>
      <div class="tags">${tagsHTML(p.tags)}</div>
      <button class="btn btn-outline" data-index="${i}">Voir le détail</button>
    </article>
  `).join("");

  // Filtres
  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      btn.classList.add("active");
      const filtre = btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach(card => {
        card.classList.toggle("hidden", filtre !== "all" && card.dataset.cat !== filtre);
      });
    });
  });

  // Fenêtre de détail
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");

  grid.addEventListener("click", e => {
    const btn = e.target.closest("button[data-index]");
    if (!btn) return;
    const p = projets[btn.dataset.index];
    modalBody.innerHTML = `
      <h3>${p.icone} ${p.titre}</h3>
      <h4>Contexte</h4><p>${p.contexte}</p>
      <h4>Étapes réalisées</h4><ul>${p.etapes.map(x => `<li>${x}</li>`).join("")}</ul>
      <h4>Compétences mobilisées</h4><ul class="comp-list">${p.competences.map(c => `<li><span class="ref-num">${c}</span>${nomsCompetences[c]}</li>`).join("")}</ul>
      <h4>Technologies</h4><div class="tags">${tagsHTML(p.tags)}</div>
      ${p.doc ? `<a href="${p.doc}" download class="btn btn-primary">⬇ Télécharger la documentation</a>` : ""}
    `;
    modal.classList.add("open");
    document.getElementById("modalClose").focus();
  });

  const fermerModal = () => modal.classList.remove("open");
  document.getElementById("modalClose").addEventListener("click", fermerModal);
  modal.addEventListener("click", e => { if (e.target === modal) fermerModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") fermerModal(); });
}

/* ---------- 5. ANIMATIONS AU SCROLL ---------- */
document.querySelectorAll(".section-title, .skill-card, .ref-card, .timeline-item, .veille-box, .about-grid, .home-card, .article-card, .lang-grid .card, .search-box")
  .forEach(el => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

/* ---------- 6. BOUTON RETOUR EN HAUT ---------- */
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => backTop.classList.toggle("show", window.scrollY > 400));
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 7. PAGE CONTACT : formulaire -> messagerie ---------- */
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msg = document.getElementById("formMsg");

    if (!nom || !email || !message) {
      msg.textContent = "Merci de remplir tous les champs.";
      msg.className = "form-msg error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = "Adresse e-mail invalide.";
      msg.className = "form-msg error";
      return;
    }
    const sujet = encodeURIComponent("Contact portfolio – " + nom);
    const corps = encodeURIComponent(message + "\n\n" + nom + " (" + email + ")");
    window.location.href = `mailto:fduboisdorleans@gmail.com?subject=${sujet}&body=${corps}`;
    msg.textContent = "Merci ! Votre messagerie va s'ouvrir.";
    msg.className = "form-msg success";
    form.reset();
  });
}

/* ---------- 8. ANNÉE DANS LE PIED DE PAGE ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
