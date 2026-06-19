/* =========================================================
   JCO CANDLES
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");
  const navigationLinks = document.querySelectorAll(
    ".main-navigation a[href]"
  );
  const currentYear = document.querySelector("#current-year");

  /* =======================================================
     1. CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =======================================================
     2. HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeaderOnScroll = () => {
    if (!siteHeader) {
      return;
    }

    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  updateHeaderOnScroll();

  window.addEventListener("scroll", updateHeaderOnScroll, {
    passive: true
  });

  /* =======================================================
     3. MOBILE NAVIGATION
     ======================================================= */

  const isMenuOpen = () => {
    return mainNavigation?.classList.contains("is-open") ?? false;
  };

  const openMenu = () => {
    if (!menuToggle || !mainNavigation) {
      return;
    }

    menuToggle.classList.add("is-active");
    mainNavigation.classList.add("is-open");
    body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  const closeMenu = () => {
    if (!menuToggle || !mainNavigation) {
      return;
    }

    menuToggle.classList.remove("is-active");
    mainNavigation.classList.remove("is-open");
    body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const toggleMenu = () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  /* =======================================================
     4. CLOSE MENU AFTER SELECTING A LINK
     ======================================================= */

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* =======================================================
     5. CLOSE MENU WITH ESCAPE KEY
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      menuToggle?.focus();
    }
  });

  /* =======================================================
     6. CLOSE MENU WHEN SCREEN BECOMES DESKTOP-SIZED
     ======================================================= */

  const desktopMediaQuery = window.matchMedia("(min-width: 861px)");

  const handleDesktopChange = (event) => {
    if (event.matches) {
      closeMenu();
    }
  };

  if (typeof desktopMediaQuery.addEventListener === "function") {
    desktopMediaQuery.addEventListener("change", handleDesktopChange);
  } else {
    desktopMediaQuery.addListener(handleDesktopChange);
  }

  /* =======================================================
     7. CLOSE MENU WHEN CLICKING OUTSIDE NAVIGATION
     ======================================================= */

  document.addEventListener("click", (event) => {
    if (!isMenuOpen() || !menuToggle || !mainNavigation) {
      return;
    }

    const clickedInsideNavigation = mainNavigation.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNavigation && !clickedMenuButton) {
      closeMenu();
    }
  });

  /* =======================================================
     8. SMOOTH INTERNAL NAVIGATION
     ======================================================= */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      if (history.pushState) {
        history.pushState(null, "", targetId);
      }
    });
  });
});