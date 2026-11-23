const projets = [
  {
    titre: "Mise en place d'un Active Directory",
    icone: "🗂️",
    categorie: "systeme",
    resume: "Installation d'un contrôleur de domaine Windows Server avec DNS, DHCP et GPO.",
    tags: ["Windows Server", "AD DS", "GPO", "DNS"],
    contexte: "Projet réalisé en TP pour simuler le réseau d'une PME de 30 salariés.",
    etapes: [
      "Installation de Windows Server 2022 sur une VM",
      "Promotion en contrôleur de domaine et création des OU",
      "Configuration des rôles DNS et DHCP",
      "Création de GPO (fond d'écran, lecteurs réseau, restrictions)"
    ],
    competences: ["B1.1", "B1.5"],
    doc: "docs/active-directory.pdf"
  },
  {
    titre: "Segmentation réseau avec VLAN",
    icone: "🖧",
    categorie: "reseau",
    resume: "Création de VLAN et routage inter-VLAN sur des équipements Cisco.",
    tags: ["Cisco", "VLAN", "Packet Tracer", "802.1Q"],
    contexte: "Séparer les services (Administration, Comptabilité, Invités) d'une entreprise.",
    etapes: [
      "Conception du plan d'adressage IP",
      "Création des VLAN et configuration des ports trunk/access",
      "Routage inter-VLAN (router-on-a-stick)",
      "Tests de connectivité et ACL"
    ],
    competences: ["B1.1", "B1.4", "B1.5"],
    doc: "docs/vlan.pdf"
  },
  {
    titre: "Gestion de parc avec GLPI",
    icone: "📋",
    categorie: "systeme",
    resume: "Déploiement de GLPI et de l'agent d'inventaire pour gérer le parc et les tickets.",
    tags: ["GLPI", "Debian", "Apache", "MariaDB"],
    contexte: "Centraliser l'inventaire matériel et le suivi des incidents.",
    etapes: [
      "Installation d'un serveur LAMP sous Debian",
      "Installation et configuration de GLPI",
      "Déploiement de l'agent GLPI sur les postes clients",
      "Création des catégories de tickets et des profils"
    ],
    competences: ["B1.1", "B1.2"],
    doc: "docs/glpi.pdf"
  },
  {
    titre: "Pare-feu pfSense et VPN",
    icone: "🔒",
    categorie: "securite",
    resume: "Sécurisation du réseau avec pfSense et accès distant via OpenVPN.",
    tags: ["pfSense", "OpenVPN", "NAT", "Règles firewall"],
    contexte: "Permettre aux salariés en télétravail d'accéder au réseau de façon sécurisée.",
    etapes: [
      "Installation de pfSense avec interfaces WAN / LAN / DMZ",
      "Définition des règles de filtrage",
      "Configuration du serveur OpenVPN et export des profils clients",
      "Tests depuis un poste externe"
    ],
    competences: ["B1.1", "B1.5"],
    doc: "docs/pfsense.pdf"
  },
  {
    titre: "Supervision avec Zabbix",
    icone: "📊",
    categorie: "reseau",
    resume: "Surveillance des serveurs et équipements réseau avec alertes par mail.",
    tags: ["Zabbix", "SNMP", "Linux", "Alerting"],
    contexte: "Détecter les pannes avant qu'elles n'impactent les utilisateurs.",
    etapes: [
      "Installation du serveur Zabbix",
      "Ajout des hôtes (agent Zabbix + SNMP)",
      "Création de tableaux de bord",
      "Configuration des alertes e-mail"
    ],
    competences: ["B1.2", "B1.5"],
    doc: "docs/zabbix.pdf"
  },
  {
    titre: "Infrastructure virtualisée Proxmox",
    icone: "🧱",
    categorie: "systeme",
    resume: "Mise en place d'un hyperviseur Proxmox avec sauvegardes automatisées.",
    tags: ["Proxmox", "KVM", "LXC", "Sauvegarde"],
    contexte: "Mutualiser plusieurs serveurs sur une seule machine physique.",
    etapes: [
      "Installation de Proxmox VE",
      "Création de VM et de conteneurs LXC",
      "Configuration du stockage et du réseau (bridges)",
      "Planification des sauvegardes"
    ],
    competences: ["B1.1", "B1.4", "B1.5"],
    doc: "docs/proxmox.pdf"
  }
];

/* ---------- 2. MENU : LIEN DE LA PAGE ACTUELLE EN VERT ---------- */
const pageActuelle = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === pageActuelle) a.classList.add("active");
});

/* ---------- 3. MENU BURGER (mobile) ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

/* ---------- 4. PAGE PROJETS : affichage, filtres et fenêtre de détail ---------- */
const grid = document.getElementById("projectsGrid");

if (grid) {
  grid.innerHTML = projets.map((p, i) => `
    <article class="project-card reveal" data-cat="${p.categorie}">
      <div class="project-icon">${p.icone}</div>
      <h3>${p.titre}</h3>
      <p>${p.resume}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
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
      <h4>Étapes réalisées</h4><ul>${p.etapes.map(e => `<li>${e}</li>`).join("")}</ul>
      <h4>Compétences mobilisées</h4><p>${p.competences.join(" • ")}</p>
      <h4>Technologies</h4><div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <a href="${p.doc}" download class="btn btn-primary">⬇ Télécharger la documentation</a>
    `;
    modal.classList.add("open");
  });

  const fermerModal = () => modal.classList.remove("open");
  document.getElementById("modalClose").addEventListener("click", fermerModal);
  modal.addEventListener("click", e => { if (e.target === modal) fermerModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") fermerModal(); });
}

/* ---------- 5. PAGE ACCUEIL : effet "machine à écrire" ---------- */
const typing = document.getElementById("typing");

if (typing) {
  const phrases = ["whoami", "ping 8.8.8.8", "systemctl status apache2", "show vlan brief"];
  let iPhrase = 0, iLettre = 0, efface = false;

  function taper() {
    const phrase = phrases[iPhrase];
    typing.textContent = phrase.substring(0, iLettre);
    if (!efface && iLettre < phrase.length) { iLettre++; setTimeout(taper, 100); }
    else if (!efface) { efface = true; setTimeout(taper, 1500); }
    else if (iLettre > 0) { iLettre--; setTimeout(taper, 50); }
    else { efface = false; iPhrase = (iPhrase + 1) % phrases.length; setTimeout(taper, 300); }
  }
  taper();
}

/* ---------- 6. ANIMATIONS AU SCROLL (+ barres de compétences) ---------- */
document.querySelectorAll(".section-title, .skill-card, .ref-card, .timeline-item, .veille-box, .about-grid, .home-card, .article-card")
  .forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.level + "%");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- 7. BOUTON RETOUR EN HAUT ---------- */
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => backTop.classList.toggle("show", window.scrollY > 400));
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- 8. TÉLÉCHARGEMENT DU CV ---------- */
// Vérifie que cv.pdf existe avant de lancer le téléchargement (sur un site en ligne)
document.querySelectorAll('a[href="cv.pdf"]').forEach(lien => {
  lien.addEventListener("click", async e => {
    if (location.protocol === "file:") return; // en local, on laisse faire le navigateur
    try {
      const rep = await fetch("cv.pdf", { method: "HEAD" });
      if (!rep.ok) throw new Error();
    } catch {
      e.preventDefault();
      alert("Le CV n'est pas disponible pour le moment.");
    }
  });
});

/* ---------- 9. PAGE CONTACT : vérification du formulaire ---------- */
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
    window.location.href = `mailto:prenom.nom@email.com?subject=${sujet}&body=${corps}`;
    msg.textContent = "Merci ! Votre messagerie va s'ouvrir.";
    msg.className = "form-msg success";
    form.reset();
  });
}

/* ---------- 10. ANNÉE DANS LE PIED DE PAGE ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
