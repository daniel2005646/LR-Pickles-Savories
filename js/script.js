/* ==========================================================================
   LR Pickles & Savories — script.js
   - Builds WhatsApp links with a pre-filled message from data-message
   - Opens/closes the mobile navigation sheet
   - Renders Lucide icons (loaded via CDN in each page's <head>)
   ========================================================================== */

const WHATSAPP_NUMBER = "27662013511"; // no +, no spaces (wa.me format)
const DEFAULT_MESSAGE = "Hi LR Pickles & Savories, I'd like to place an order.";

document.addEventListener("DOMContentLoaded", () => {
  setupWhatsAppButtons();
  setupMobileMenu();
  renderIcons();
});

/**
 * Any element with [data-whatsapp] gets its href built from
 * WHATSAPP_NUMBER + the text in [data-message] (or the default message).
 */
function setupWhatsAppButtons() {
  document.querySelectorAll("[data-whatsapp]").forEach((btn) => {
    const message = btn.getAttribute("data-message") || DEFAULT_MESSAGE;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.setAttribute("href", url);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });
}

/** Opens/closes the slide-in mobile navigation sheet */
function setupMobileMenu() {
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const sheet = document.querySelector(".mobile-sheet");
  const overlay = document.querySelector(".mobile-sheet-overlay");
  if (!openBtn || !sheet) return;

  const open = () => {
    sheet.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    sheet.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (overlay) overlay.addEventListener("click", close);

  sheet.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

/** Lucide icons are loaded as <i data-lucide="name"></i> placeholders */
function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}
