import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './timeline.css';

// Updated years
const years = [1965, 2003, 2012];
const startYear = years[0];
const endYear = years[years.length - 1];
const yearCount = years.length;
const timelineData = [];

// Info text for each year
const yearInfoTexts = {
  1965: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Innovation began with groundbreaking developments in technology.",
  2003: "Quisquam rerum dolor repudiandae at, illum similique perspiciatis dolores. Major advancements were achieved this year.",
  2012: "Veritatis illo nulla assumenda, error voluptatem cumque eligendi. The foundation for future growth was established."
};

// Timeline ticks
const timelineBar = document.getElementById('timelineBar');
const ticks = [];

for (let i = 0; i < 10; i++) {
  const tick = document.createElement('div');
  tick.classList.add('timeline-tick');
  timelineBar.appendChild(tick);
  ticks.push(tick);
}

// Function to update active tick
function updateActiveTick(currentYear) {
  ticks.forEach((tick, i) => {
    const year = years[i];
    if (year === currentYear) {
      tick.classList.add('active');

      // Add year text to the left
      tick.textContent = ''; // clear first
      const yearLabel = document.createElement('span');
      yearLabel.classList.add('tick-year');
      yearLabel.textContent = year;
      tick.appendChild(yearLabel);

      // Force reflow to restart animation
      void tick.offsetWidth;
      
      // Add active class with animation
      tick.classList.add('active');

    } else {
      tick.classList.remove('active');
      tick.textContent = ''; // remove year for inactive ticks
    }
  });
}

updateActiveTick(startYear);

// Updated sample images with specific order
const yearImages = {
  1965: ["assets/timeline/i7.png", "assets/timeline/i5.png"],
  2003: ["assets/timeline/i2.png", "assets/timeline/i1.png"],
  2012: ["assets/timeline/i3.png", "assets/timeline/i4.png"]
};

// Generate timeline data - 2 images per year with specific images
for (let i = 0; i < yearCount; i++) {
  const year = years[i];
  const yearBasePosition = -i * 5; // Spacing between years
  const images = yearImages[year];
  
  // First image of the year
  timelineData.push({
    year,
    image: images[0],
    position: yearBasePosition,
    imageIndex: 0 // First image of this year
  });
  
  // Second image of the year (very close to first)
  timelineData.push({
    year,
    image: images[1],
    position: yearBasePosition - 0.5, // Minimal spacing
    imageIndex: 1 // Second image of this year
  });
}

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 1, 20);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1));
const pointLight1 = new THREE.PointLight(0x667eea, 1, 50);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x764ba2, 1, 50);
pointLight2.position.set(-10, -10, -20);
scene.add(pointLight2);

// Circular mask (keeps image circular) - shared across all planes
function createCircularMask() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(512, 512, 512, 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(canvas);
}
const circleMask = createCircularMask();

// Responsive breakpoint flag used for positioning
let isMobile = window.innerWidth < 768;

// Base scale factors for circle masks
const BASE_SCALE_DESKTOP = 1.2;
const BASE_SCALE_MOBILE = 0.9; // slightly smaller circles on mobile

// Helpers to compute responsive positions on demand
function getPositionFor(indexYear, isFirstImage) {
  const mobileSet1 = [
    { x: -1.0, y: 2 },
    { x: 1.0, y: -2 },
  ];
  const desktopSet1 = [
    { x: -2.5, y: 1.5 },
    { x: 3, y: -1.5 },
  ];
  const mobileSet2 = [
    { x: 1.0, y: 2 },
    { x: -1.0, y: -2 },
  ];
  const desktopSet2 = [
    { x: 3, y: 1 },
    { x: -3, y: -1.5 },
  ];

  const useSet1 = indexYear % 2 === 0;
  const set = useSet1
    ? (isMobile ? mobileSet1 : desktopSet1)
    : (isMobile ? mobileSet2 : desktopSet2);
  return isFirstImage ? set[0] : set[1];
}

const imagePlanes = [];
const textureLoader = new THREE.TextureLoader();

// Shared shader strings
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform sampler2D map;
  uniform sampler2D mask;
  uniform float opacity;
  uniform float halftoneGap;
  varying vec2 vUv;
  const float gridFrequency = 120.0;
  float ease(float t) {
    return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) / 2.0;
  }
  void main() {
    vec4 texColor = texture2D(map, vUv);
    vec4 maskColor = texture2D(mask, vUv);
    vec2 st = vUv * gridFrequency;
    vec2 cellIndex = floor(st);
    vec2 cellUV = (cellIndex + 0.5) / gridFrequency;
    vec4 cellColor = texture2D(map, cellUV);
    vec2 gridPos = fract(st) - 0.5;
    float dist = length(gridPos);
    float maxDotSize = 0.48;
    float minDotSize = 0.16;
    float eased = ease(halftoneGap);
    float dotRadius = mix(maxDotSize, minDotSize, eased);
    float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float finalDotSize = dotRadius * (0.6 + brightness * 0.4);
    float edgeSoftness = 0.02;
    float circle = 1.0 - smoothstep(finalDotSize - edgeSoftness, finalDotSize + edgeSoftness, dist);
    vec3 halftoneRGB = cellColor.rgb * circle;
    vec3 finalRGB = mix(texColor.rgb, halftoneRGB, eased);
    // Visibility factor coming from CPU side (distance-based)
    float vis = clamp(opacity, 0.0, 1.0);
    
  // Color fade: dim toward a neutral level without brightening (avoid "shine").
  // Keep at least 0.6 brightness at lowest visibility to avoid going black.
  vec3 fadedRGB = finalRGB * mix(0.6, 1.0, vis);
    
    // Alpha fade: keep fully opaque most of the time to occlude UI underneath,
    // then fade alpha only in the last 25% of visibility for a smooth disappear.
    float alphaFactor = min(1.0, vis * 4.0); // 1.0 when vis>=0.25, ramps down when smaller
    gl_FragColor = vec4(fadedRGB, maskColor.r * alphaFactor);
  }
`;

// Shared geometry - reduced segments for better performance
const sharedGeometry = new THREE.PlaneGeometry(3.2, 3.2, 80, 80);

// Placeholder material for unloaded textures
const placeholderMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xcccccc, 
  transparent: true, 
  opacity: 0.5 
});

timelineData.forEach((data, index) => {
  // Use shared geometry instead of creating new one
  const geometry = sharedGeometry.clone();
  const plane = new THREE.Mesh(geometry, placeholderMaterial.clone());

  // Determine which year this is to alternate positioning
  const yearIndex = Math.floor(index / 2);
  const isFirstImageOfYear = data.imageIndex === 0;

  // Initial placement (responsive)
  const pos = getPositionFor(yearIndex, isFirstImageOfYear);
  plane.position.set(pos.x, pos.y, data.position);
  
  // Initially hide planes that are far away
  plane.visible = false;
  scene.add(plane);
  
  // Store original positions for wave calculation
  const originalPositions = geometry.attributes.position.array.slice();
  
  imagePlanes.push({ 
    plane, 
    data, 
    originalPositions,
    hoverPoint: new THREE.Vector3(),
    targetHoverPoint: new THREE.Vector3(),
    isHovering: false,
    vertexVelocities: new Float32Array(geometry.attributes.position.count * 3),
    textureLoaded: false,
    isVisible: false
  });
});

// Lazy load textures based on camera proximity
function loadTextureForPlane(obj) {
  if (obj.textureLoaded) return;
  
  obj.textureLoaded = true;
  
  textureLoader.load(obj.data.image, (texture) => {
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.generateMipmaps = true;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: texture },
        mask: { value: circleMask },
        opacity: { value: 1.0 },
        halftoneGap: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Dispose old material
    if (obj.plane.material !== placeholderMaterial) {
      obj.plane.material.dispose();
    }
    
    obj.plane.material = shaderMaterial;
    obj.plane.material.needsUpdate = true;
  });
}

// GSAP ScrollTrigger
const yearDisplay = document.getElementById('yearDisplay');
const infoText = document.getElementById('infoText');
gsap.registerPlugin(ScrollTrigger);

// Calculate the full camera travel distance
const startCameraZ = 5;
const endCameraZ = timelineData[timelineData.length - 1].position + 4; // Stop just before reaching last images for optimal viewing

gsap.to(camera.position, {
  z: endCameraZ,
  ease: 'none',
  scrollTrigger: {
    trigger: '.timeline-section',
    start: 'top top',
    end: 'bottom bottom', // Scroll through entire section height
    scrub: 1.5, // Smoother, more responsive scrubbing
    onUpdate: (self) => {
      // Calculate current year based on image visibility (when images start fading in)
      const cameraZ = camera.position.z;
      const visibilityThreshold = 6; // Match the visibilityRange from animate loop
      
      let currentYear = years[0]; // Default to first year
      
      // Check each year and see if its images are within visibility range
      years.forEach((year, index) => {
        const yearPosition = -index * 5; // Match the spacing in timeline generation
        const distance = Math.abs(yearPosition - cameraZ);
        
        // If this year's images are visible (within threshold), it becomes the current year
        // We check in reverse order so later years take precedence when transitioning
        if (distance <= visibilityThreshold) {
          currentYear = year;
        }
      });
      
      // Animate fade-out, then change text, then fade-in
      if (yearDisplay.textContent !== String(currentYear)) {
        yearDisplay.classList.add('fade-out');
        setTimeout(() => {
          yearDisplay.textContent = currentYear;
          yearDisplay.classList.remove('fade-out');
        }, 300);
      }
      if (infoText.textContent !== yearInfoTexts[currentYear]) {
        infoText.classList.add('fade-out');
        setTimeout(() => {
          infoText.textContent = yearInfoTexts[currentYear];
          infoText.classList.remove('fade-out');
        }, 300);
      }
      updateActiveTick(currentYear);
    },
  },
});

// Rotate the outer circle SVG on scroll
const outerCircleEl = document.querySelector('.outer-circle');
if (outerCircleEl) {
  gsap.to(outerCircleEl, {
    rotation: 180, // slower: half a full spin across the section
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2, // smoother catch-up easing
    },
  });
}

// Mouse interaction
let mouseX = 0, mouseY = 0;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredPlanes = []; // Cache for visible planes

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Only raycast against visible planes
  if (hoveredPlanes.length > 0) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hoveredPlanes);

    // Reset all hover states for visible planes only
    imagePlanes.forEach((obj) => {
      if (obj.isVisible) {
        obj.isHovering = false;
        if (obj.plane.material.uniforms && obj.plane.material.uniforms.hoverIntensity) {
          obj.plane.material.uniforms.hoverIntensity.value *= 0.95;
        }
      }
    });

    // Set hover for intersected plane
    if (intersects.length > 0) {
      const intersection = intersects[0];
      const hoveredPlane = intersection.object;
      
      // Find the corresponding object in imagePlanes
      const hoveredObj = imagePlanes.find(obj => obj.plane === hoveredPlane);
      if (hoveredObj) {
        hoveredObj.isHovering = true;
        hoveredObj.targetHoverPoint.copy(intersection.point);
        
        // Convert world point to local coordinates
        hoveredPlane.worldToLocal(hoveredObj.targetHoverPoint);
      }
      
      if (hoveredPlane.material.uniforms && hoveredPlane.material.uniforms.mousePos) {
        hoveredPlane.material.uniforms.hoverIntensity.value = 1.0;
        const uv = intersection.uv;
        if (uv) hoveredPlane.material.uniforms.mousePos.value.set(uv.x, uv.y);
      }
    }
  }
});

// Optimize: batch frustum culling check
const frustum = new THREE.Frustum();
const cameraViewProjectionMatrix = new THREE.Matrix4();

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  const time = Date.now() * 0.001;

  // Update frustum for culling
  camera.updateMatrixWorld();
  cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

  // Reset visible planes cache
  hoveredPlanes = [];

  imagePlanes.forEach((obj) => {
    const relativeZ = obj.plane.position.z - camera.position.z;
    const distance = Math.abs(relativeZ);
    
    // Visibility and LOD management
    const visibilityRange = 6; // Increased range to see images earlier/longer
    const fadeRange = 2;
    const loadRange = 10; // Load textures before they become visible
    
    let visibilityFactor = 1.0;
    if (distance > visibilityRange) {
      visibilityFactor = Math.max(0, 1 - (distance - visibilityRange) / fadeRange);
    }
    
    // Determine if plane should be visible
    const shouldBeVisible = distance < (visibilityRange + fadeRange);
    obj.isVisible = shouldBeVisible;
    obj.plane.visible = shouldBeVisible;
    
    if (shouldBeVisible) {
      hoveredPlanes.push(obj.plane);
    }
    
    // Lazy load texture when plane is approaching
    if (distance < loadRange && !obj.textureLoaded) {
      loadTextureForPlane(obj);
    }
    
    // Skip expensive calculations for invisible planes
    if (!shouldBeVisible) return;
    
  // Scale based on distance + platform base scale
  const scale = Math.max(0.5, 1 - distance / 20);
  const baseScale = isMobile ? BASE_SCALE_MOBILE : BASE_SCALE_DESKTOP;
  obj.plane.scale.setScalar(scale * baseScale);

    // Smooth hover point transition
    obj.hoverPoint.lerp(obj.targetHoverPoint, 0.15);

    // Apply wave effect to geometry
    if (obj.originalPositions && visibilityFactor > 0) {
      const positions = obj.plane.geometry.attributes.position.array;
      const originalPos = obj.originalPositions;
      
      // Optimize: only update vertices if visible and on-screen
      const updateGeometry = visibilityFactor > 0.1;
      
      if (updateGeometry) {
        for (let i = 0; i < positions.length; i += 3) {
          const x = originalPos[i];
          const y = originalPos[i + 1];
          
          let targetZ = 0;
          
          // Base wave effect (only when not hovering)
          if (!obj.isHovering) {
            const waveSpeed = 1.2;
            const waveFrequency = 2.5;
            const waveAmplitude = 0.04;
            
            targetZ = Math.sin(y * waveFrequency - time * waveSpeed) * waveAmplitude;
            targetZ += Math.sin(x * 2 + time * 0.5) * 0.01;
          } else {
            // Liquid distortion on hover
            const dx = x - obj.hoverPoint.x;
            const dy = y - obj.hoverPoint.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const maxRadius = 0.5;
            const strength = 0.12;
            
            if (dist < maxRadius) {
              const influence = 1 - (dist / maxRadius);
              const smoothInfluence = influence * influence * influence;
              targetZ = strength * smoothInfluence;
            }
          }
          
          // Spring physics for smooth motion
          const currentZ = positions[i + 2];
          const velocity = obj.vertexVelocities[i + 2];
          
          const spring = (targetZ - currentZ) * 0.08;
          const damping = velocity * 0.85;
          
          obj.vertexVelocities[i + 2] = velocity + spring - damping * 0.15;
          positions[i + 2] = currentZ + obj.vertexVelocities[i + 2];
          
          // Apply visibility factor
          positions[i + 2] *= visibilityFactor;
        }
        
        obj.plane.geometry.attributes.position.needsUpdate = true;
        obj.plane.geometry.computeVertexNormals();
      }
    }

    if (obj.plane.material && obj.plane.material.uniforms) {
      // Opacity considers both scale and visibility factor
      obj.plane.material.uniforms.opacity.value = (0.3 + scale * 0.7) * visibilityFactor;

      // Halftone effect
      let targetGap = 0.0;
      const startDist = 4;
      const peakDist = 0.0;
      const endDist = -4.0;

      if (relativeZ > startDist) targetGap = 0.0;
      else if (relativeZ > peakDist) targetGap = (startDist - relativeZ) / (startDist - peakDist);
      else if (relativeZ > endDist) targetGap = (relativeZ - endDist) / (peakDist - endDist);
      else targetGap = 0.0;
      
      const currentGap = obj.plane.material.uniforms.halftoneGap.value || 0;
      const lerpSpeed = 0.12;
      obj.plane.material.uniforms.halftoneGap.value = currentGap + (targetGap - currentGap) * lerpSpeed;
    }
  });

  pointLight1.intensity = 1 + Math.sin(time) * 0.3;
  pointLight2.intensity = 1 + Math.cos(time) * 0.3;

  // Subtle idle motion so the scene has life even without cursor movement
  const idleYaw = (isMobile ? 0.015 : 0.03) * Math.sin(time * 0.35);
  const idlePitch = (isMobile ? 0.010 : 0.02) * Math.cos(time * 0.27);

  // Stronger cursor influence with sensible clamps
  const yawGain = isMobile ? 0.05 : 0.14;     // how much mouseX affects yaw
  const pitchGain = isMobile ? 0.04 : 0.12;   // how much mouseY affects pitch
  const maxYaw = isMobile ? 0.22 : 0.42;      // radians
  const maxPitch = isMobile ? 0.18 : 0.32;    // radians

  const mouseYaw = THREE.MathUtils.clamp(mouseX * yawGain, -maxYaw, maxYaw);
  const mousePitch = THREE.MathUtils.clamp(mouseY * pitchGain, -maxPitch, maxPitch);

  const targetRotY = mouseYaw + idleYaw;
  const targetRotX = mousePitch + idlePitch;

  const rotLerp = 0.08; // slightly snappier than before
  camera.rotation.y += (targetRotY - camera.rotation.y) * rotLerp;
  camera.rotation.x += (targetRotX - camera.rotation.x) * rotLerp;

  renderer.render(scene, camera);
}
animate();

// Debounce helper to limit resize work
function debounce(fn, wait = 150) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Re-apply layout when viewport changes
function updateLayoutForViewport(animateMove = true) {
  isMobile = window.innerWidth < 768;

  imagePlanes.forEach((obj) => {
    const yearIndex = years.indexOf(obj.data.year);
    const isFirst = obj.data.imageIndex === 0;
    const p = getPositionFor(yearIndex, isFirst);

    if (animateMove && obj.plane.visible) {
      // Smoothly animate positional change for visible items
      gsap.to(obj.plane.position, { x: p.x, y: p.y, duration: 0.35, ease: 'power2.out' });
    } else {
      obj.plane.position.x = p.x;
      obj.plane.position.y = p.y;
    }
  });
}

// Initial layout sync (in case initial isMobile differs across hydration)
updateLayoutForViewport(false);

// Resize
window.addEventListener('resize', debounce(() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateLayoutForViewport(true);
  if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh();
}, 200));

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
  imagePlanes.forEach(obj => {
    obj.plane.geometry.dispose();
    if (obj.plane.material.dispose) {
      obj.plane.material.dispose();
    }
    if (obj.plane.material.map) {
      obj.plane.material.map.dispose();
    }
  });
  circleMask.dispose();
  sharedGeometry.dispose();
  renderer.dispose();
});

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

  document.querySelector('img[alt="to_top"]').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });