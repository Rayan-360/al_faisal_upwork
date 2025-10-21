// import * as THREE from 'three';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './timeline.css';

// const startYear = 2015;
// const endYear = 2025;
// const yearCount = endYear - startYear + 1;
// const timelineData = [];

// // Info text for each year
// const yearInfoTexts = {
//   2015: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Innovation began with groundbreaking developments in technology.",
//   2016: "Quisquam rerum dolor repudiandae at, illum similique perspiciatis dolores. Major advancements were achieved this year.",
//   2017: "Veritatis illo nulla assumenda, error voluptatem cumque eligendi. The foundation for future growth was established.",
//   2018: "Nesciunt eius odit consectetur adipisicing elit. Strategic partnerships formed during this pivotal year.",
//   2019: "Dolores dolorem debitis perspiciatis at illum similique. Expansion reached new markets successfully.",
//   2020: "Repudiandae rerum dolor quisquam cumque eligendi nesciunt. Resilience and adaptation defined this transformative period.",
//   2021: "Assumenda error voluptatem eligendi odit consectetur. Digital transformation accelerated across all sectors.",
//   2022: "Illum similique perspiciatis veritatis illo nulla dolor. Innovation and sustainability became core priorities.",
//   2023: "Cumque eligendi nesciunt eius adipisicing debitis dolorem. Record-breaking achievements marked this milestone year.",
//   2024: "Dolor repudiandae quisquam rerum at perspiciatis similique. New horizons opened with breakthrough discoveries.",
//   2025: "Consectetur adipisicing elit odit voluptatem assumenda error. The future vision takes shape with unprecedented progress."
// };

// // Timeline ticks
// const timelineBar = document.getElementById('timelineBar');
// const ticks = [];

// for (let i = 0; i < yearCount; i++) {
//   const tick = document.createElement('div');
//   tick.classList.add('timeline-tick');
//   timelineBar.appendChild(tick);
//   ticks.push(tick);
// }

// // Function to update active tick
// function updateActiveTick(currentYear) {
//   ticks.forEach((tick, i) => {
//     const year = startYear + i;
//     if (year === currentYear) {
//       tick.classList.add('active');

//       // Add year text to the left
//       tick.textContent = ''; // clear first
//       const yearLabel = document.createElement('span');
//       yearLabel.classList.add('tick-year');
//       yearLabel.textContent = year;
//       tick.appendChild(yearLabel);

//     } else {
//       tick.classList.remove('active');
//       tick.textContent = ''; // remove year for inactive ticks
//     }
//   });
// }

// updateActiveTick(startYear);

// // Sample images
// const sampleImages = [
//   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
//   'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1200',
//   'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
//   'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
//   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
//   'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200',
//   'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
//   'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200',
//   'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
//   'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200',
//   'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
// ];

// // Generate timeline data - 2 images per year
// for (let i = 0; i < yearCount; i++) {
//   const year = startYear + i;
//   const yearBasePosition = -i * 5; // Spacing between years
  
//   // First image of the year
//   timelineData.push({
//     year,
//     image: sampleImages[(i * 2) % sampleImages.length],
//     position: yearBasePosition,
//     imageIndex: 0 // First image of this year
//   });
  
//   // Second image of the year (very close to first)
//   timelineData.push({
//     year,
//     image: sampleImages[(i * 2 + 1) % sampleImages.length],
//     position: yearBasePosition - 0.5, // Minimal spacing
//     imageIndex: 1 // Second image of this year
//   });
// }

// // Scene setup
// const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xffffff, 1, 20);

// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// document.getElementById('canvas-container').appendChild(renderer.domElement);

// // Lighting
// scene.add(new THREE.AmbientLight(0xffffff, 1));
// const pointLight1 = new THREE.PointLight(0x667eea, 1, 50);
// pointLight1.position.set(10, 10, 10);
// scene.add(pointLight1);

// const pointLight2 = new THREE.PointLight(0x764ba2, 1, 50);
// pointLight2.position.set(-10, -10, -20);
// scene.add(pointLight2);

// // Circular mask (keeps image circular)
// function createCircularMask() {
//   const canvas = document.createElement('canvas');
//   canvas.width = 1024;
//   canvas.height = 1024;
//   const ctx = canvas.getContext('2d');
//   ctx.fillStyle = 'white';
//   ctx.beginPath();
//   ctx.arc(512, 512, 512, 0, Math.PI * 2);
//   ctx.fill();
//   return new THREE.CanvasTexture(canvas);
// }
// const circleMask = createCircularMask();

// // Corner positions - alternating pattern
// const positionsSet1 = [
//   { x: -2.5, y: 1.5 },   // top-left
//   { x: 3, y: -1.5 },   // bottom-right
// ];

// const positionsSet2 = [
//   { x: 3, y: 1 },    // top-right
//   { x: -3, y: -1.5 },  // bottom-left
// ];

// const imagePlanes = [];
// const textureLoader = new THREE.TextureLoader();

// // Shared shader strings
// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   precision mediump float;
//   uniform sampler2D map;
//   uniform sampler2D mask;
//   uniform float opacity;
//   uniform float halftoneGap;
//   varying vec2 vUv;
//   const float gridFrequency = 120.0;
//   float ease(float t) {
//     return t < 0.5 ? 2.0 * t * t : 1.0 - pow(-2.0 * t + 2.0, 2.0) / 2.0;
//   }
//   void main() {
//     vec4 texColor = texture2D(map, vUv);
//     vec4 maskColor = texture2D(mask, vUv);
//     vec2 st = vUv * gridFrequency;
//     vec2 cellIndex = floor(st);
//     vec2 cellUV = (cellIndex + 0.5) / gridFrequency;
//     vec4 cellColor = texture2D(map, cellUV);
//     vec2 gridPos = fract(st) - 0.5;
//     float dist = length(gridPos);
//     float maxDotSize = 0.48;
//     float minDotSize = 0.16;
//     float eased = ease(halftoneGap);
//     float dotRadius = mix(maxDotSize, minDotSize, eased);
//     float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
//     float finalDotSize = dotRadius * (0.6 + brightness * 0.4);
//     float edgeSoftness = 0.02;
//     float circle = 1.0 - smoothstep(finalDotSize - edgeSoftness, finalDotSize + edgeSoftness, dist);
//     vec3 halftoneRGB = cellColor.rgb * circle;
//     vec3 finalRGB = mix(texColor.rgb, halftoneRGB, eased);
//     float finalAlpha = mix(1.0, circle, eased) * maskColor.r * opacity;
//     gl_FragColor = vec4(finalRGB, finalAlpha);
//   }
// `;

// timelineData.forEach((data, index) => {
//   const geometry = new THREE.PlaneGeometry(3.2, 3.2, 128, 128); // Increased from 2.5 to 3.2
//   const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 }));

//   // Determine which year this is (0-10) to alternate positioning
//   const yearIndex = Math.floor(index / 2);
//   const isFirstImageOfYear = data.imageIndex === 0;
  
//   // Alternate between two position sets for each year
//   const positionSet = (yearIndex % 2 === 0) ? positionsSet1 : positionsSet2;
//   const pos = isFirstImageOfYear ? positionSet[0] : positionSet[1];
  
//   plane.position.set(pos.x, pos.y, data.position);
//   scene.add(plane);
  
//   // Store original positions for wave calculation
//   const originalPositions = geometry.attributes.position.array.slice();
  
//   imagePlanes.push({ 
//     plane, 
//     data, 
//     originalPositions,
//     hoverPoint: new THREE.Vector3(),
//     targetHoverPoint: new THREE.Vector3(),
//     isHovering: false,
//     vertexVelocities: new Float32Array(geometry.attributes.position.count * 3)
//   });

//   textureLoader.load(data.image, (texture) => {
//     texture.minFilter = THREE.LinearMipMapLinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//     texture.generateMipmaps = true;
//     texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

//     const shaderMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         map: { value: texture },
//         mask: { value: circleMask },
//         opacity: { value: 1.0 },
//         halftoneGap: { value: 0.0 }
//       },
//       vertexShader,
//       fragmentShader,
//       transparent: true,
//       side: THREE.DoubleSide
//     });

//     plane.material = shaderMaterial;
//     plane.material.needsUpdate = true;
//   });
// });

// // GSAP ScrollTrigger
// const yearDisplay = document.getElementById('yearDisplay');
// const infoText = document.getElementById('infoText');
// gsap.registerPlugin(ScrollTrigger);

// gsap.to(camera.position, {
//   z: timelineData[timelineData.length - 1].position + 5,
//   ease: 'none',
//   scrollTrigger: {
//     trigger: '.scroll-container',
//     start: 'top top',
//     end: 'bottom bottom',
//     scrub: 4,
//     onUpdate: (self) => {
//       const progress = self.progress;
//       const currentYear = Math.round(startYear + (endYear - startYear) * progress);
//       yearDisplay.textContent = currentYear;
//       infoText.textContent = yearInfoTexts[currentYear];
//       updateActiveTick(currentYear);
//     },
//   },
// });

// // Mouse interaction
// let mouseX = 0, mouseY = 0;
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// document.addEventListener('mousemove', (e) => {
//   mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//   mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
//   mouse.x = mouseX;
//   mouse.y = mouseY;

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(imagePlanes.map(obj => obj.plane));

//   // Reset all hover states
//   imagePlanes.forEach((obj) => {
//     obj.isHovering = false;
//     if (obj.plane.material.uniforms && obj.plane.material.uniforms.hoverIntensity) {
//       obj.plane.material.uniforms.hoverIntensity.value *= 0.95;
//     }
//   });

//   // Set hover for intersected plane
//   if (intersects.length > 0) {
//     const intersection = intersects[0];
//     const hoveredPlane = intersection.object;
    
//     // Find the corresponding object in imagePlanes
//     const hoveredObj = imagePlanes.find(obj => obj.plane === hoveredPlane);
//     if (hoveredObj) {
//       hoveredObj.isHovering = true;
//       hoveredObj.targetHoverPoint.copy(intersection.point);
      
//       // Convert world point to local coordinates
//       hoveredPlane.worldToLocal(hoveredObj.targetHoverPoint);
//     }
    
//     if (hoveredPlane.material.uniforms && hoveredPlane.material.uniforms.mousePos) {
//       hoveredPlane.material.uniforms.hoverIntensity.value = 1.0;
//       const uv = intersection.uv;
//       if (uv) hoveredPlane.material.uniforms.mousePos.value.set(uv.x, uv.y);
//     }
//   }
// });

// // Animate loop
// function animate() {
//   requestAnimationFrame(animate);
//   const time = Date.now() * 0.001;

//   imagePlanes.forEach((obj) => {
//     const relativeZ = obj.plane.position.z - camera.position.z;
//     const distance = Math.abs(relativeZ);
    
//     // Only show images within a certain range (2 images at a time per year)
//     const visibilityRange = 4; // Increased to start fade earlier
//     const fadeRange = 3; // Longer fade distance for smoother transitions
    
//     let visibilityFactor = 1.0;
//     if (distance > visibilityRange) {
//       visibilityFactor = Math.max(0, 1 - (distance - visibilityRange) / fadeRange);
//     }
    
//     // Scale based on distance
//     const scale = Math.max(0.5, 1 - distance / 20);
//     obj.plane.scale.setScalar(scale * 1.2);

//     // Smooth hover point transition
//     obj.hoverPoint.lerp(obj.targetHoverPoint, 0.15);

//     // Apply wave effect to geometry
//     if (obj.originalPositions && visibilityFactor > 0) {
//       const positions = obj.plane.geometry.attributes.position.array;
//       const originalPos = obj.originalPositions;
      
//       for (let i = 0; i < positions.length; i += 3) {
//         const x = originalPos[i];
//         const y = originalPos[i + 1];
        
//         let targetZ = 0;
        
//         // Base wave effect (only when not hovering)
//         if (!obj.isHovering) {
//           const waveSpeed = 1.2;
//           const waveFrequency = 2.5;
//           const waveAmplitude = 0.04;
          
//           targetZ = Math.sin(y * waveFrequency - time * waveSpeed) * waveAmplitude;
//           targetZ += Math.sin(x * 2 + time * 0.5) * 0.01;
//         } else {
//           // Liquid distortion on hover
//           const dx = x - obj.hoverPoint.x;
//           const dy = y - obj.hoverPoint.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           const maxRadius = 0.5;
//           const strength = 0.12;
          
//           if (dist < maxRadius) {
//             const influence = 1 - (dist / maxRadius);
//             const smoothInfluence = influence * influence * influence;
//             targetZ = strength * smoothInfluence;
//           }
//         }
        
//         // Spring physics for smooth motion
//         const currentZ = positions[i + 2];
//         const velocity = obj.vertexVelocities[i + 2];
        
//         const spring = (targetZ - currentZ) * 0.08;
//         const damping = velocity * 0.85;
        
//         obj.vertexVelocities[i + 2] = velocity + spring - damping * 0.15;
//         positions[i + 2] = currentZ + obj.vertexVelocities[i + 2];
        
//         // Apply visibility factor
//         positions[i + 2] *= visibilityFactor;
//       }
      
//       obj.plane.geometry.attributes.position.needsUpdate = true;
//       obj.plane.geometry.computeVertexNormals();
//     }

//     if (obj.plane.material && obj.plane.material.uniforms) {
//       // Opacity considers both scale and visibility factor
//       obj.plane.material.uniforms.opacity.value = (0.3 + scale * 0.7) * visibilityFactor;

//       // Halftone effect
//       let targetGap = 0.0;
//       const startDist = 4;
//       const peakDist = 0.0;
//       const endDist = -4.0;

//       if (relativeZ > startDist) targetGap = 0.0;
//       else if (relativeZ > peakDist) targetGap = (startDist - relativeZ) / (startDist - peakDist);
//       else if (relativeZ > endDist) targetGap = (relativeZ - endDist) / (peakDist - endDist);
//       else targetGap = 0.0;
      
//       const currentGap = obj.plane.material.uniforms.halftoneGap.value || 0;
//       const lerpSpeed = 0.12;
//       obj.plane.material.uniforms.halftoneGap.value = currentGap + (targetGap - currentGap) * lerpSpeed;
//     }
//   });

//   pointLight1.intensity = 1 + Math.sin(time) * 0.3;
//   pointLight2.intensity = 1 + Math.cos(time) * 0.3;

//   camera.rotation.y += (mouseX * 0.05 - camera.rotation.y) * 0.05;
//   camera.rotation.x += (mouseY * 0.05 - camera.rotation.x) * 0.05;

//   renderer.render(scene, camera);
// }
// animate();

// // Resize
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './timeline.css';

const startYear = 2015;
const endYear = 2025;
const yearCount = endYear - startYear + 1;
const timelineData = [];

// Info text for each year
const yearInfoTexts = {
  2015: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Innovation began with groundbreaking developments in technology.",
  2016: "Quisquam rerum dolor repudiandae at, illum similique perspiciatis dolores. Major advancements were achieved this year.",
  2017: "Veritatis illo nulla assumenda, error voluptatem cumque eligendi. The foundation for future growth was established.",
  2018: "Nesciunt eius odit consectetur adipisicing elit. Strategic partnerships formed during this pivotal year.",
  2019: "Dolores dolorem debitis perspiciatis at illum similique. Expansion reached new markets successfully.",
  2020: "Repudiandae rerum dolor quisquam cumque eligendi nesciunt. Resilience and adaptation defined this transformative period.",
  2021: "Assumenda error voluptatem eligendi odit consectetur. Digital transformation accelerated across all sectors.",
  2022: "Illum similique perspiciatis veritatis illo nulla dolor. Innovation and sustainability became core priorities.",
  2023: "Cumque eligendi nesciunt eius adipisicing debitis dolorem. Record-breaking achievements marked this milestone year.",
  2024: "Dolor repudiandae quisquam rerum at perspiciatis similique. New horizons opened with breakthrough discoveries.",
  2025: "Consectetur adipisicing elit odit voluptatem assumenda error. The future vision takes shape with unprecedented progress."
};

// Timeline ticks
const timelineBar = document.getElementById('timelineBar');
const ticks = [];

for (let i = 0; i < yearCount; i++) {
  const tick = document.createElement('div');
  tick.classList.add('timeline-tick');
  timelineBar.appendChild(tick);
  ticks.push(tick);
}

// Function to update active tick
function updateActiveTick(currentYear) {
  ticks.forEach((tick, i) => {
    const year = startYear + i;
    if (year === currentYear) {
      tick.classList.add('active');

      // Add year text to the left
      tick.textContent = ''; // clear first
      const yearLabel = document.createElement('span');
      yearLabel.classList.add('tick-year');
      yearLabel.textContent = year;
      tick.appendChild(yearLabel);

    } else {
      tick.classList.remove('active');
      tick.textContent = ''; // remove year for inactive ticks
    }
  });
}

updateActiveTick(startYear);

// Sample images
const sampleImages = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1200',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
];

// Generate timeline data - 2 images per year
for (let i = 0; i < yearCount; i++) {
  const year = startYear + i;
  const yearBasePosition = -i * 5; // Spacing between years
  
  // First image of the year
  timelineData.push({
    year,
    image: sampleImages[(i * 2) % sampleImages.length],
    position: yearBasePosition,
    imageIndex: 0 // First image of this year
  });
  
  // Second image of the year (very close to first)
  timelineData.push({
    year,
    image: sampleImages[(i * 2 + 1) % sampleImages.length],
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

// Corner positions - alternating pattern
const positionsSet1 = [
  { x: -2.5, y: 1.5 },   // top-left
  { x: 3, y: -1.5 },   // bottom-right
];

const positionsSet2 = [
  { x: 3, y: 1 },    // top-right
  { x: -3, y: -1.5 },  // bottom-left
];

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
    float finalAlpha = mix(1.0, circle, eased) * maskColor.r * opacity;
    gl_FragColor = vec4(finalRGB, finalAlpha);
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

  // Determine which year this is (0-10) to alternate positioning
  const yearIndex = Math.floor(index / 2);
  const isFirstImageOfYear = data.imageIndex === 0;
  
  // Alternate between two position sets for each year
  const positionSet = (yearIndex % 2 === 0) ? positionsSet1 : positionsSet2;
  const pos = isFirstImageOfYear ? positionSet[0] : positionSet[1];
  
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

gsap.to(camera.position, {
  z: timelineData[timelineData.length - 1].position + 5,
  ease: 'none',
  scrollTrigger: {
    trigger: '.scroll-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 4,
    onUpdate: (self) => {
      const progress = self.progress;
      const currentYear = Math.round(startYear + (endYear - startYear) * progress);
      yearDisplay.textContent = currentYear;
      infoText.textContent = yearInfoTexts[currentYear];
      updateActiveTick(currentYear);
    },
  },
});

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
    const visibilityRange = 4;
    const fadeRange = 3;
    const loadRange = 8; // Load textures before they become visible
    
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
    
    // Scale based on distance
    const scale = Math.max(0.5, 1 - distance / 20);
    obj.plane.scale.setScalar(scale * 1.2);

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

  camera.rotation.y += (mouseX * 0.05 - camera.rotation.y) * 0.05;
  camera.rotation.x += (mouseY * 0.05 - camera.rotation.x) * 0.05;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

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