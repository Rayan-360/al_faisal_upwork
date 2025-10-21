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


//video
const playButton = document.getElementById('play-button');
const videoThumbnail = document.getElementById('video-thumbnail');
const videoContainer = document.getElementById('video-container');
const videoPlayer = document.getElementById('video-player');
const closeVideo = document.getElementById('close-video');

playButton.addEventListener('click', () => {
  // Fade out thumbnail
  videoThumbnail.style.opacity = '0';
  
  setTimeout(() => {
    videoThumbnail.classList.add('hidden');
    videoContainer.classList.remove('hidden');
    
    // Fade in video with animation
    videoContainer.style.opacity = '0';
    setTimeout(() => {
      videoContainer.style.transition = 'opacity 0.5s ease-in-out';
      videoContainer.style.opacity = '1';
      videoPlayer.play();
    }, 50);
  }, 500);
});

closeVideo.addEventListener('click', () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  
  // Fade out video
  videoContainer.style.opacity = '0';
  
  setTimeout(() => {
    videoContainer.classList.add('hidden');
    videoThumbnail.classList.remove('hidden');
    videoThumbnail.style.opacity = '1';
  }, 500);
});

// Close video when it ends
videoPlayer.addEventListener('ended', () => {
  closeVideo.click();
});


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

// DOM elements
const bgImage = document.getElementById("bg-image");
const mainHeading = document.getElementById("main-heading");
const mainDescription = document.getElementById("main-description");
const activeVerticalText = document.getElementById("active-vertical-text");
const activeIndicator = document.getElementById("active-indicator");
const verticalListContainer = document.getElementById("vertical-list-container");

// Render inactive verticals
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
        clearInterval(autoSlideInterval); // reset auto-slide
        animateVerticalSlide(index);
        startAutoSlide();
      });

      verticalListContainer.appendChild(box);
      inactiveCount++;
    }
  });
}

// Animate vertical change: slide out left, slide in from right
function animateVerticalSlide(nextIndex) {
  // Slide current image & text left and fade partially
  gsap.to(bgImage, { duration: 0.8, x: -100, opacity: 0.4, ease: "power1.inOut" });
  gsap.to(mainHeading, { duration: 0.6, x: -30, opacity: 0.5, ease: "power1.inOut" });
  gsap.to(mainDescription, { duration: 0.6, x: -30, opacity: 0.5, ease: "power1.inOut" });

  setTimeout(() => {
    activeIndex = nextIndex;
    updateContent();

    // Position new image & text off-screen right
    gsap.set(bgImage, { x: 100, opacity: 0.4 });
    gsap.set(mainHeading, { x: 30, opacity: 0 });
    gsap.set(mainDescription, { x: 30, opacity: 0 });

    // Animate new image & text sliding in from right
    gsap.to(bgImage, { duration: 1, x: 0, opacity: 1, ease: "power2.out" });
    gsap.to(mainHeading, { duration: 0.8, x: 0, opacity: 1, ease: "power2.out" });
    gsap.to(mainDescription, { duration: 0.8, x: 0, opacity: 1, ease: "power2.out" });
  }, 500); // slight overlap for smooth transition
}

// Update content
function updateContent() {
  const current = businessVerticals[activeIndex];

  bgImage.src = current.image;
  mainHeading.textContent = current.heading;
  mainHeading.style.textDecorationColor = current.underlineColor;
  mainDescription.textContent = current.content;

  activeVerticalText.textContent = current.name.toUpperCase();
  activeIndicator.style.backgroundColor = current.color;

  renderInactiveVerticals();
}

// Auto-slide every 30s
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const nextIndex = (activeIndex + 1) % businessVerticals.length;
    animateVerticalSlide(nextIndex);
  }, 30000);
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