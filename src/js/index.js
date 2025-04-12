document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4.2 },
    },
    on: {
      init: updateProgressRing,
      slideChange: updateProgressRing,
    },
  });

  const totalSlides = 5; // update based on your real slides
  const dashArray = 283;

  function updateProgressRing() {
    const index = swiper.realIndex;
    const slidesPerView = swiper.params.slidesPerView;
    const maxIndex = totalSlides - slidesPerView;
    const progress = Math.min(index / maxIndex, 1);
    const offset = dashArray * (1 - progress);

    const nextRing = document.querySelector(".progress-ring-next");
    const prevRing = document.querySelector(".progress-ring-prev");

    if (swiper.isEnd) {
      nextRing.style.opacity = "0";
      prevRing.style.opacity = "1";
      prevRing.style.strokeDashoffset = offset;
    } else {
      nextRing.style.opacity = "1";
      nextRing.style.strokeDashoffset = offset;
      prevRing.style.opacity = "0";
    }
  }
});
//new scroll
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".localSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: ".local-next",
      prevEl: ".local-prev",
    },
    on: {
      init: updateProgress,
      slideChange: updateProgress,
    },
  });

  function updateProgress() {
    const currentIndex = swiper.realIndex + 1;
    const totalSlides = swiper.slides.length;

    // Update text numbers
    document.getElementById("currentStep").textContent = String(
      currentIndex
    ).padStart(2, "0");
    document.getElementById("totalSteps").textContent = String(
      totalSlides
    ).padStart(2, "0");

    // Progress bar percent
    const percent = (currentIndex / totalSlides) * 100;

    // Fill bar
    const bar = document.getElementById("progressBar");
    if (bar) bar.style.width = `${percent}%`;

    // Ring stroke offset
    const ring = document.getElementById("progressRing");
    if (ring) ring.style.strokeDashoffset = 100 - percent;
  }
});

//scroll triger
gsap.registerPlugin(ScrollTrigger);

// Timeline for scrolpartnership (titles only)
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scrolpartnership",
    start: "top top", // Pin when section top hits viewport top
    end: "+=100%", // Short scroll for 2 titles
    scrub: true, // Sync animation with scroll
    pin: true, // Pin the section
    pinSpacing: true, // Ensure space for pinned section
    snap: {
      snapTo: [0, 0.5, 1], // Snap at Title 1, Title 2, and unpin
      duration: { min: 0.1, max: 0.2 }, // Tight snapping
      ease: "power1.inOut",
    },
  },
});

// Title animations (fade in/out sequentially)
tl.to("#title1", { opacity: 1, duration: 0.25 })
  .to("#title1", { opacity: 0, duration: 0.25 })
  .to("#title2", { opacity: 1, duration: 0.25 })
  .to("#title2", { opacity: 0, duration: 0.25 })
  .to("#title3", { opacity: 1, duration: 0.25 });
// No collapse; section unpins and scrolls normally

// Separate timeline for textscroller animation (after unpin)
gsap.fromTo(
  ".textscroller",
  { opacity: 0, y: 40, scale: 0.95 }, // Start: invisible, down, slightly scaled
  {
    opacity: 1,
    y: 0,
    scale: 1, // End: visible, in place, full size
    duration: 0.7, // Smooth and deliberate
    ease: "power3.out", // Soft, natural easing
    scrollTrigger: {
      trigger: ".spacer",
      start: "bottom 85%", // Trigger early for seamless transition
      toggleActions: "play none none none", // Play once
    },
  }
);
//menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const closeMenu = document.querySelector(".close-menu");
  const overlayMenu = document.querySelector(".overlay-menu");
  const body = document.body;

  // Open Menu
  hamburger.addEventListener("click", () => {
    overlayMenu.classList.remove("hidden");
    setTimeout(() => {
      overlayMenu.classList.add("active");
      body.classList.add("menu-open");
    }, 10);
  });

  // Close Menu
  closeMenu.addEventListener("click", () => {
    overlayMenu.classList.remove("active");
    body.classList.remove("menu-open");
    setTimeout(() => {
      overlayMenu.classList.add("hidden");
    }, 300);
  });

  // Close menu when clicking a menu link
  const menuLinks = overlayMenu.querySelectorAll(".menu-list a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlayMenu.classList.remove("active");
      body.classList.remove("menu-open");
      setTimeout(() => {
        overlayMenu.classList.add("hidden");
      }, 300);
    });
  });
});

//smooth-scroll
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
