/* ============================================================
   SWITCH — Interactions communes
   ============================================================ */
(function () {
  "use strict";

  // ---------- Nav mobile ----------
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("is-open");
    });
  }

  // ---------- Marqueur de page active ----------
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("is-active");
    }
  });

  // ---------- Hero : switch jour / soir ----------
  document.querySelectorAll(".local-card").forEach((localCard) => {
    const dayScene = localCard.querySelector(".scene--day");
    const nightScene = localCard.querySelector(".scene--night");
    const btn = localCard.querySelector(".switch-toggle");
    if (!dayScene || !nightScene || !btn) return;

    let mode = localCard.dataset.mode === "night" ? "night" : "day";

    function apply() {
      localCard.dataset.mode = mode;
      if (mode === "day") {
        dayScene.classList.remove("is-hidden");
        nightScene.classList.add("is-hidden");
        btn.querySelector(".label").textContent = "8h — Coffee shop";
      } else {
        nightScene.classList.remove("is-hidden");
        dayScene.classList.add("is-hidden");
        btn.querySelector(".label").textContent = "19h — Bar à vin";
      }
    }
    btn.addEventListener("click", () => {
      mode = mode === "day" ? "night" : "day";
      apply();
    });
    let auto = setInterval(() => {
      mode = mode === "day" ? "night" : "day";
      apply();
    }, 6000);
    localCard.addEventListener("click", () => clearInterval(auto), { once: true });
    apply();
  });

  // ---------- Checklist (page démo) ----------
  document.querySelectorAll(".checklist").forEach((list) => {
    const items = list.querySelectorAll('input[type="checkbox"]');
    const bar = list.querySelector(".check-progress > span");
    const counter = list.querySelector("[data-check-counter]");
    function refresh() {
      const total = items.length;
      const done = Array.from(items).filter((c) => c.checked).length;
      items.forEach((c) => c.closest(".check-item").classList.toggle("is-done", c.checked));
      if (bar) bar.style.width = total ? `${(done / total) * 100}%` : "0%";
      if (counter) counter.textContent = `${done} / ${total}`;
    }
    items.forEach((c) => c.addEventListener("change", refresh));
    refresh();
  });

  // ---------- Configurateur (page marketplace) ----------
  const cfg = document.querySelector("[data-configurator]");
  if (cfg) {
    const SURFACE_PACKS = {
      30: { name: "Forfait Starter - home staging S", price: 1900 },
      60: { name: "Forfait Standard - home staging M", price: 3900 },
      100: { name: "Forfait Avancé - home staging L", price: 6900 },
      150: { name: "Forfait Flagship - home staging XL", price: 9900 },
    };

    const choices = {
      profile: "bureau-boutique",
      surface: "60",
      switches: "2",
      it: "isole",
      acces: "badge",
    };

    cfg.querySelectorAll(".opt").forEach((opt) => {
      opt.addEventListener("click", () => {
        const group = opt.dataset.group;
        const value = opt.dataset.value;
        cfg.querySelectorAll(`.opt[data-group="${group}"]`).forEach((o) => o.classList.remove("is-active"));
        opt.classList.add("is-active");
        choices[group] = value;
        compute();
      });
    });

    const summaryItems = document.querySelector("[data-summary-items]");
    const summaryTotal = document.querySelector("[data-summary-total]");

    function compute() {
      const lines = [];
      const surf = parseInt(choices.surface, 10);
      const staging = SURFACE_PACKS[surf] || SURFACE_PACKS[60];
      lines.push({ k: staging.name, v: staging.price });

      lines.push({ k: "Devanture numérique", v: 2490 });

      if (choices.profile === "bureau-boutique") {
        lines.push({ k: "Kit DA & éclairage (bureau ↔ boutique)", v: 890 });
        const etals = Math.max(2, Math.ceil(surf / 25));
        lines.push({ k: `Étals escamotables × ${etals}`, v: etals * 690 });
      } else if (choices.profile === "cowork-popup") {
        lines.push({ k: "Kit DA & éclairage (cowork ↔ pop-up)", v: 890 });
        const etals = Math.max(2, Math.ceil(surf / 30));
        lines.push({ k: `Étals escamotables × ${etals}`, v: etals * 690 });
      } else if (choices.profile === "formation-vente") {
        lines.push({ k: "Kit DA & éclairage (formation ↔ vente)", v: 890 });
        const etals = Math.max(3, Math.ceil(surf / 20));
        lines.push({ k: `Étals escamotables × ${etals}`, v: etals * 690 });
      } else {
        lines.push({ k: "Kit DA & éclairage premium", v: 1490 });
        lines.push({ k: "Accompagnement exploitation 3 mois", v: 1800 });
      }

      lines.push({ k: "Mur de casiers opérateurs", v: 1890 });

      if (choices.switches === "3" || choices.switches === "4+") {
        lines.push({ k: "Station de caisse × 2", v: 1980 });
      } else {
        lines.push({ k: "Station de caisse légère", v: 990 });
      }

      if (choices.it === "isole") {
        lines.push({ k: "Armoire Switch (routeur VLAN + tablette)", v: 1690 });
      } else if (choices.it === "premium") {
        lines.push({ k: "Armoire Switch premium (VLAN + journal + monitoring)", v: 2490 });
      }

      if (choices.acces === "badge") {
        lines.push({ k: "Serrures connectées + badges NFC", v: 780 });
      } else if (choices.acces === "code") {
        lines.push({ k: "Codes temporaires + journal", v: 320 });
      }

      lines.push({ k: "Installation & formation", v: 1200 });

      const total = lines.reduce((s, l) => s + l.v, 0);

      if (summaryItems) {
        summaryItems.innerHTML = lines
          .map((l) => `<div class="line"><span>${l.k}</span><span>${formatEUR(l.v)}</span></div>`)
          .join("");
      }
      if (summaryTotal) {
        summaryTotal.textContent = formatEUR(total);
      }
    }
    compute();
  }

  function formatEUR(n) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  // ---------- Faux formulaire devis ----------
  const quote = document.querySelector("[data-quote-form]");
  if (quote) {
    quote.addEventListener("submit", (e) => {
      e.preventDefault();
      const out = document.querySelector("[data-quote-result]");
      if (out) {
        out.hidden = false;
        out.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  // ---------- Année footer ----------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
