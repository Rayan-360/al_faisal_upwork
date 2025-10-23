//sidebar
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
  mobileMenu.classList.add("translate-x-0");
  mobileOverlay.classList.remove("hidden");
});

closeMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("-translate-x-full");
  mobileOverlay.classList.add("hidden");
});

mobileOverlay.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("-translate-x-full");
  mobileOverlay.classList.add("hidden");
});


(function initHeroVideo() {
  const heroVideo = document.getElementById('hero-video');
  const videoPoster = document.getElementById('video-poster');
  const playButton = document.getElementById('play-button');
  
  if (!heroVideo || !videoPoster || !playButton) return;

  heroVideo.muted = true;
  heroVideo.playsInline = true;

  let hasAutoPlayed = false;

  // Function to play video with fade-in effect
  function playVideoWithFade() {
    videoPoster.style.opacity = '0';
    playButton.style.opacity = '0';
    heroVideo.style.opacity = '1';
    
    heroVideo.currentTime = 0; // Reset to start
    heroVideo.play().catch(() => {});
  }

  // Function to show poster after video ends
  function showPoster() {
    heroVideo.style.opacity = '0';
    videoPoster.style.opacity = '1';
    playButton.style.opacity = '1';
  }

  // Auto-play after 2-3 seconds on page load
  setTimeout(() => {
    if (!hasAutoPlayed) {
      hasAutoPlayed = true;
      playVideoWithFade();
    }
  }, 2500); // 2.5 seconds delay

  // When video ends, show poster again
  heroVideo.addEventListener('ended', showPoster);

  // Click play button to replay video
  playButton.addEventListener('click', () => {
    playVideoWithFade();
  });
})();


//news
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('hidden');
      } else {
        slide.classList.remove('active');
        slide.classList.add('hidden');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-gray-400');
        dot.classList.add('bg-gray-600');
      } else {
        dot.classList.remove('bg-gray-600');
        dot.classList.add('bg-gray-400');
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);


import { gsap } from "gsap";

const businessVerticals = [
  {
    id: 1,
    name: "Real Estate",
    color: "#2ECC71",
    heading: "Al Jazi Real Estate",
    underlineColor: "#2ECC71",
    content:
      "Established in 1995, Al Jazi Real Estate is a subsidiary of Al Faisal Holding and a leading real estate developer in Qatar. Known for its high-end residential and commercial properties.",
    image: "/assets/Business_Vericals_Slide1.jpg",
  },
  {
    id: 2,
    name: "Hospitality",
    color: "#3498DB",
    heading: "Al Jazi Hospitality",
    underlineColor: "#3498DB",
    content:
      "Al Jazi Hospitality offers world-class hotel and leisure experiences, managing premium resorts and catering services designed to deliver comfort and excellence.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Construction & Project Management",
    color: "#E67E22",
    heading: "Aamal Construction",
    underlineColor: "#E67E22",
    content:
      "Specializing in construction and infrastructure projects, delivering innovative solutions in residential, commercial, and industrial sectors.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Culture, Education, Leisure, Sport",
    color: "#9B59B6",
    heading: "Al Faisal Cultural Ventures",
    underlineColor: "#9B59B6",
    content:
      "Promoting cultural exchange and education through investments in institutions, sports facilities, and creative community projects.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Services",
    color: "#1ABC9C",
    heading: "Al Jazi Services",
    underlineColor: "#1ABC9C",
    content:
      "Providing diverse services including facilities management, maintenance, and technical support for both residential and commercial clients.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Trading & Distribution",
    color: "#F1C40F",
    heading: "Aamal Trading",
    underlineColor: "#F1C40F",
    content:
      "A trusted leader in distribution, offering a wide range of consumer and industrial products backed by strong logistics and reliable partnerships.",
    image:
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Financial Investments",
    color: "#E74C3C",
    heading: "Aamal Investments",
    underlineColor: "#E74C3C",
    content:
      "Focused on strategic financial investments that foster growth and sustainability across diverse economic sectors.",
    image:
      "https://images.unsplash.com/photo-1522205408450-add114ad53fe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Manufacturing",
    color: "#F39C12",
    heading: "Aamal Manufacturing",
    underlineColor: "#F39C12",
    content:
      "A pioneer in industrial production, supporting Qatar's self-sufficiency through innovation and quality manufacturing facilities.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d420c1897b0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Aamal Company Q.P.S.C",
    color: "#5DADE2",
    heading: "Aamal Company Q.P.S.C",
    underlineColor: "#5DADE2",
    content:
      "The parent holding company driving diversification and excellence across all business verticals under Al Faisal Holding.",
    image:
      "https://images.unsplash.com/photo-1521790361543-f645cf042ec4?q=80&w=1200&auto=format&fit=crop",
  },
];

let activeIndex = 0;
let autoSlideInterval;

// DOM elements - Desktop
const bgImage = document.getElementById("bg-image");
const mainHeading = document.getElementById("main-heading");
const mainDescription = document.getElementById("main-description");
const activeVerticalText = document.getElementById("active-vertical-text");
const activeIndicator = document.getElementById("active-indicator");
const verticalListContainer = document.getElementById("vertical-list-container");

// DOM elements - Mobile
const mobileActiveText = document.getElementById("mobile-active-text");
const mobileActiveIndicator = document.getElementById("mobile-active-indicator");
const mobileMainHeading = document.getElementById("mobile-main-heading");
const mobileMainDescription = document.getElementById("mobile-main-description");
const mobileListContainer = document.getElementById("mobile-list-container");

// Render inactive verticals for desktop
function renderInactiveVerticals() {
  verticalListContainer.innerHTML = "";

  let inactiveCount = 0;
  businessVerticals.forEach((vertical, index) => {
    if (index !== activeIndex) {
      const box = document.createElement("div");
      box.className =
        "flex gap-2 !mt-7 flex-col items-center justify-end p-4 cursor-pointer hover:opacity-100 transition-all duration-300 h-[98.5%] !p-4";

      // Alternate background
      box.style.backgroundColor =
        inactiveCount % 2 === 0
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.05)";

      const text = document.createElement("p");
      text.className =
        "text-white text-base sm:text-lg tracking-widest transition-colors";
      text.style.writingMode = "vertical-rl";
      text.style.textOrientation = "mixed";
      text.style.transform = "rotate(180deg)";
      text.textContent = vertical.name.toUpperCase();

      const indicator = document.createElement("div");
      indicator.className = "w-4 h-4";
      indicator.style.backgroundColor = vertical.color;

      box.appendChild(text);
      box.appendChild(indicator);

      // Click handler with animation
      box.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        animateVerticalSlide(index);
        startAutoSlide();
      });

      verticalListContainer.appendChild(box);
      inactiveCount++;
    }
  });
}

// Render inactive verticals for mobile (normal writing mode)
function renderMobileList() {
  mobileListContainer.innerHTML = "";

  let inactiveCount = 0;
  businessVerticals.forEach((vertical, index) => {
    if (index !== activeIndex) {
      const box = document.createElement("div");
      box.className =
        "flex items-center gap-3 !p-3 cursor-pointer hover:opacity-90 transition-all duration-300 w-full rounded-sm";

      // Alternate background
      box.style.backgroundColor =
        inactiveCount % 2 === 0
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.1)";

      const indicator = document.createElement("div");
      indicator.className = "w-3 h-3 flex-shrink-0";
      indicator.style.backgroundColor = vertical.color;

      const text = document.createElement("p");
      text.className = "text-white text-xs font-light tracking-wide";
      text.textContent = vertical.name.toUpperCase();

      box.appendChild(indicator);
      box.appendChild(text);

      // Click handler
      box.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        animateVerticalSlide(index);
        startAutoSlide();
      });

      mobileListContainer.appendChild(box);
      inactiveCount++;
    }
  });
}

// Animate vertical change
function animateVerticalSlide(nextIndex) {
  // Fade out current image & text
  gsap.to(bgImage, { duration: 0.8, opacity: 0, ease: "power1.inOut" });
  
  // Desktop elements
  if (mainHeading) {
    gsap.to(mainHeading, { duration: 0.6, opacity: 0, ease: "power1.inOut" });
    gsap.to(mainDescription, { duration: 0.6, opacity: 0, ease: "power1.inOut" });
  }
  
  // Mobile elements
  if (mobileMainHeading) {
    gsap.to(mobileMainHeading, { duration: 0.6, opacity: 0, ease: "power1.inOut" });
    gsap.to(mobileMainDescription, { duration: 0.6, opacity: 0, ease: "power1.inOut" });
  }

  // After fade-out, update content and fade new elements in
  setTimeout(() => {
    activeIndex = nextIndex;
    updateContent();

    // Set new image & text invisible initially
    gsap.set(bgImage, { opacity: 0 });
    
    // Desktop
    if (mainHeading) {
      gsap.set(mainHeading, { opacity: 0 });
      gsap.set(mainDescription, { opacity: 0 });
    }
    
    // Mobile
    if (mobileMainHeading) {
      gsap.set(mobileMainHeading, { opacity: 0 });
      gsap.set(mobileMainDescription, { opacity: 0 });
    }

    // Fade new image & text in
    gsap.to(bgImage, { duration: 1, opacity: 1, ease: "power2.out" });
    
    // Desktop
    if (mainHeading) {
      gsap.to(mainHeading, { duration: 0.8, opacity: 1, ease: "power2.out" });
      gsap.to(mainDescription, { duration: 0.8, opacity: 1, ease: "power2.out" });
    }
    
    // Mobile
    if (mobileMainHeading) {
      gsap.to(mobileMainHeading, { duration: 0.8, opacity: 1, ease: "power2.out" });
      gsap.to(mobileMainDescription, { duration: 0.8, opacity: 1, ease: "power2.out" });
    }
  }, 500);
}

// Update content
function updateContent() {
  const current = businessVerticals[activeIndex];

  bgImage.src = current.image;
  
  // Update desktop elements
  if (mainHeading) {
    mainHeading.textContent = current.heading;
    mainHeading.style.textDecorationColor = current.underlineColor;
    mainDescription.textContent = current.content;
    activeVerticalText.textContent = current.name.toUpperCase();
    activeIndicator.style.backgroundColor = current.color;
    renderInactiveVerticals();
  }
  
  // Update mobile elements
  if (mobileMainHeading) {
    mobileMainHeading.textContent = current.heading;
    mobileMainHeading.style.textDecorationColor = current.underlineColor;
    mobileMainDescription.textContent = current.content;
    mobileActiveText.textContent = current.name.toUpperCase();
    mobileActiveIndicator.style.backgroundColor = current.color;
    renderMobileList();
  }
}

// Auto-slide every 10s
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const nextIndex = (activeIndex + 1) % businessVerticals.length;
    animateVerticalSlide(nextIndex);
  }, 10000);
}

// Initialize
updateContent();
startAutoSlide();
//footer
  // Smooth scroll to top
  document.querySelector('img[alt="to_top"]').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });