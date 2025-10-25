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


// ============================================
// HORIZONTAL ACCORDION - Business Verticals
// ============================================

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

let activeAccordionIndex = 0;
let autoAccordionInterval;

// Desktop Accordion
const accordionContainer = document.getElementById("accordion-container");
const mobileAccordionContainer = document.getElementById("mobile-accordion-container");

// Create Desktop Horizontal Accordion Panels
function createDesktopAccordion() {
  if (!accordionContainer) return;
  
  accordionContainer.innerHTML = '';
  
  businessVerticals.forEach((vertical, index) => {
    const panel = document.createElement('div');
    panel.className = 'accordion-panel relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out';
    panel.style.flex = index === activeAccordionIndex ? '1 1 70%' : '1 1 5%';
    panel.dataset.index = index;
    
    // Background image
    const bgImg = document.createElement('img');
    bgImg.src = vertical.image;
    bgImg.alt = vertical.name;
    bgImg.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-700';
    bgImg.style.opacity = index === activeAccordionIndex ? '1' : '0.7';
    
    // Overlay for better text readability
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black transition-opacity duration-700';
    overlay.style.opacity = index === activeAccordionIndex ? '0.3' : '0.5';
    
    // Content container
 // Content container
    const content = document.createElement('div');
    content.className = 'absolute inset-0 flex items-end transition-all duration-700';
    
    if (index === activeAccordionIndex) {
      // Active panel - show full content with vertical heading
      content.innerHTML = `
        <div class="flex items-end gap-12 !p-8 w-full">
          <div class="flex flex-col items-center gap-4">
            <p class="text-white text-lg tracking-widest uppercase vertical-text">${vertical.name}</p>
            <div class="w-4 h-4 rounded-sm" style="background-color: ${vertical.color}"></div>
          </div>
          <div class="text-white space-y-6 max-w-2xl flex flex-col gap-6 !mb-20 !ml-20">
            <h2 class="text-3xl font-light underline underline-offset-8 tracking-wide" style="text-decoration-color: ${vertical.underlineColor}">${vertical.heading}</h2>
            <p class="text-2xl text-gray-300 leading-relaxed">${vertical.content}</p>
            <button class="text-white !px-6 !py-2 border border-[#9D8055] font-medium hover:bg-[#9D8055] transition-all duration-300 rounded text-lg w-[200px] text-left">
              Explore
            </button>
          </div>
        </div>
      `;
    } else {
      // Inactive panel - show vertical text
      content.innerHTML = `
        <div class="w-full h-full flex items-end justify-center !pb-8">
          <div class="flex flex-col items-center gap-4">
            <p class="text-white text-lg tracking-widest uppercase vertical-text">${vertical.name}</p>
            <div class="w-4 h-4 rounded-sm" style="background-color: ${vertical.color}"></div>
          </div>
        </div>
      `;
    }
    
    // Click handler
    panel.addEventListener('click', () => {
      if (index !== activeAccordionIndex) {
        clearInterval(autoAccordionInterval);
        setActivePanel(index);
        startAutoAccordion();
      }
    });
    
    panel.appendChild(bgImg);
    panel.appendChild(overlay);
    panel.appendChild(content);
    accordionContainer.appendChild(panel);
  });
}

// Set active panel with smooth animation
function setActivePanel(newIndex) {
  const panels = accordionContainer.querySelectorAll('.accordion-panel');
  
  panels.forEach((panel, index) => {
    const bgImg = panel.querySelector('img');
    const overlay = panel.querySelector('.absolute.bg-black');
    const content = panel.querySelector('.absolute.inset-0.flex');

    if (index === newIndex) {
      // Activate this panel
      panel.style.flex = '1 1 70%';
      bgImg.style.opacity = '1';
      overlay.style.opacity = '0.3';

      // Match new desktop accordion layout
      setTimeout(() => {
        content.innerHTML = `
          <div class="flex items-end gap-12 !p-8 w-full">
            <div class="flex flex-col items-center gap-4">
              <p class="text-white text-lg tracking-widest uppercase vertical-text">${businessVerticals[index].name}</p>
              <div class="w-4 h-4 rounded-sm" style="background-color: ${businessVerticals[index].color}"></div>
            </div>
            <div class="text-white space-y-6 max-w-2xl flex flex-col gap-6 !mb-20 !ml-20">
              <h2 class="text-3xl font-light underline underline-offset-8 tracking-wide" 
                  style="text-decoration-color: ${businessVerticals[index].underlineColor}">
                  ${businessVerticals[index].heading}
              </h2>
              <p class="text-2xl text-gray-300 leading-relaxed">${businessVerticals[index].content}</p>
              <button class="text-white !px-6 !py-2 border border-[#9D8055] font-medium hover:bg-[#9D8055] 
                             transition-all duration-300 rounded text-lg w-[200px] text-left">
                Explore
              </button>
            </div>
          </div>
        `;
      }, 300);
    } else {
      // Deactivate this panel
      panel.style.flex = '1 1 5%';
      bgImg.style.opacity = '0.7';
      overlay.style.opacity = '0.5';

      // Match inactive state style
      setTimeout(() => {
        content.innerHTML = `
          <div class="w-full h-full flex items-end justify-center !pb-8">
            <div class="flex flex-col items-center gap-4">
              <p class="text-white text-lg tracking-widest uppercase vertical-text">${businessVerticals[index].name}</p>
              <div class="w-4 h-4 rounded-sm" style="background-color: ${businessVerticals[index].color}"></div>
            </div>
          </div>
        `;
      }, 300);
    }
  });

  activeAccordionIndex = newIndex;
}


// Create Mobile Vertical Accordion
function createMobileAccordion() {
  if (!mobileAccordionContainer) return;
  
  mobileAccordionContainer.innerHTML = '';
  
  businessVerticals.forEach((vertical, index) => {
    const panel = document.createElement('div');
    panel.className = 'mobile-accordion-panel relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out';
    panel.style.height = index === activeAccordionIndex ? '400px' : '60px';
    panel.dataset.index = index;
    
    // Background image
    const bgImg = document.createElement('img');
    bgImg.src = vertical.image;
    bgImg.alt = vertical.name;
    bgImg.className = 'absolute inset-0 w-full h-full object-cover transition-opacity duration-700';
    bgImg.style.opacity = index === activeAccordionIndex ? '1' : '0.7';
    
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black transition-opacity duration-700';
    overlay.style.opacity = index === activeAccordionIndex ? '0.3' : '0.6';
    
    // Content
    const content = document.createElement('div');
    content.className = 'absolute inset-0 p-4 flex flex-col justify-end transition-all duration-700';
    
    if (index === activeAccordionIndex) {
      // Active - full content
      content.innerHTML = `
        <div class="text-white space-y-6 !p-8">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 rounded-sm" style="background-color: ${vertical.color}"></div>
            <p class="text-xs tracking-wide uppercase">${vertical.name}</p>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="text-xl font-light underline underline-offset-4 tracking-wide" style="text-decoration-color: ${vertical.underlineColor}">${vertical.heading}</h3>
            <p class="text-lg text-gray-300 leading-relaxed">${vertical.content}</p>
            <button class="text-white mt-3 !px-4 !py-1.5 border border-[#9D8055] font-medium hover:bg-[#9D8055] transition-all duration-300 rounded text-sm text-left w-[150px]">
              Explore
            </button>
          </div>
        </div>
      `;
    } else {
      // Inactive - just title
      content.innerHTML = `
        <div class="flex items-center gap-3 h-full !pl-2">
          <div class="w-3 h-3 rounded-sm flex-shrink-0" style="background-color: ${vertical.color}"></div>
          <p class="text-white text-sm tracking-wide uppercase font-medium">${vertical.name}</p>
        </div>
      `;
    }
    
    // Click handler
    panel.addEventListener('click', () => {
      if (index !== activeAccordionIndex) {
        clearInterval(autoAccordionInterval);
        setActiveMobilePanel(index);
        startAutoAccordion();
      }
    });
    
    panel.appendChild(bgImg);
    panel.appendChild(overlay);
    panel.appendChild(content);
    mobileAccordionContainer.appendChild(panel);
  });
}

// Set active mobile panel
function setActiveMobilePanel(newIndex) {
  const panels = mobileAccordionContainer.querySelectorAll('.mobile-accordion-panel');
  
  panels.forEach((panel, index) => {
    const bgImg = panel.querySelector('img');
    const overlay = panel.querySelector('.absolute.bg-black');
    const content = panel.querySelector('.absolute.inset-0.p-4');
    
    if (index === newIndex) {
      // Activate
      panel.style.height = '400px';
      bgImg.style.opacity = '1';
      overlay.style.opacity = '0.3';
      
      setTimeout(() => {
        content.innerHTML = `
          <div class="text-white space-y-3 opacity-0 !p-8" style="animation: fadeIn 0.7s forwards;">
            <div class="flex items-center gap-2 !mb-2">
              <div class="w-3 h-3 rounded-sm" style="background-color: ${businessVerticals[index].color}"></div>
              <p class="text-xs tracking-wide uppercase">${businessVerticals[index].name}</p>
            </div>
            <div class="flex flex-col gap-3">
              <h3 class="text-xl font-light underline underline-offset-4 tracking-wide" style="text-decoration-color: ${businessVerticals[index].underlineColor}">${businessVerticals[index].heading}</h3>
              <p class="text-sm text-gray-300 leading-relaxed">${businessVerticals[index].content}</p>
              <button class="text-white mt-3 !px-4 !py-1.5 border border-[#9D8055] font-medium hover:bg-[#9D8055] transition-all duration-300 rounded text-sm w-[150px] text-left">
                Explore
              </button>
            </div>
          </div>
        `;
      }, 300);
    } else {
      // Deactivate
      panel.style.height = '60px';
      bgImg.style.opacity = '0.7';
      overlay.style.opacity = '0.6';
      
      setTimeout(() => {
        content.innerHTML = `
          <div class="flex items-center gap-3 h-full !pl-4">
            <div class="w-3 h-3 rounded-sm flex-shrink-0" style="background-color: ${businessVerticals[index].color}"></div>
            <p class="text-white text-sm tracking-wide uppercase font-medium">${businessVerticals[index].name}</p>
          </div>
        `;
      }, 300);
    }
  });
  
  activeAccordionIndex = newIndex;
}

// Auto-rotate accordion
function startAutoAccordion() {
  autoAccordionInterval = setInterval(() => {
    const nextIndex = (activeAccordionIndex + 1) % businessVerticals.length;
    
    if (window.innerWidth >= 1024) {
      setActivePanel(nextIndex);
    } else {
      setActiveMobilePanel(nextIndex);
    }
  }, 8000);
}

// Initialize accordion
function initAccordion() {
  if (window.innerWidth >= 1024) {
    createDesktopAccordion();
  } else {
    createMobileAccordion();
  }
  startAutoAccordion();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    clearInterval(autoAccordionInterval);
    initAccordion();
  }, 250);
});

// Start accordion on load
if (accordionContainer || mobileAccordionContainer) {
  initAccordion();
}


//footer
  // Smooth scroll to top
  document.querySelector('img[alt="to_top"]').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });