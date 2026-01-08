/* eslint-disable */

// ===========================================
// GLOBAL STATE MANAGEMENT
// ===========================================
const state = {
  isSorting: false,
  isPaused: false,
  shouldReset: false,
  speed: 50  // Will be read dynamically during sort
};

const container = document.querySelector(".content");

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("barc").value = 25;
  document.getElementById("sorts").value = 50;
  state.speed = 50;
  updateSliderDisplays();
  newArray();
  checkMobileDevice();
});

// ===========================================
// SLIDER CONTROLS
// ===========================================
document.getElementById("barc").addEventListener("input", function() {
  if (!state.isSorting) {
    updateSliderDisplays();
    newArray();
  }
});

document.getElementById("sorts").addEventListener("input", function() {
  state.speed = parseInt(this.value);
  updateSliderDisplays();
});

function updateSliderDisplays() {
  const barcVal = document.getElementById("barc-val");
  const sortsVal = document.getElementById("sorts-val");
  if (barcVal) barcVal.textContent = document.getElementById("barc").value;
  if (sortsVal) sortsVal.textContent = document.getElementById("sorts").value;
}

// ===========================================
// ARRAY GENERATION
// ===========================================
function newArray() {
  if (state.isSorting) return;
  
  container.innerHTML = "";

  const barc = parseInt(document.getElementById("barc").value);
  const containerWidth = container.offsetWidth || window.innerWidth - 100;
  const gap = 3;
  let barWidth = Math.floor((containerWidth - (barc * gap)) / barc);
  barWidth = Math.max(4, Math.min(barWidth, 50));

  for (let i = 0; i < barc; i++) {
    let barValue = Math.floor(Math.random() * 100) + 1;

    const divbar = document.createElement("div");
    divbar.classList.add("bar");
    divbar.style.height = `${barValue * 4}px`;
    divbar.style.width = `${barWidth}px`;
    divbar.style.minWidth = `${barWidth}px`;

    const barLabel = document.createElement("label");
    barLabel.classList.add("bar_id");
    barLabel.innerHTML = barValue;

    if (barWidth < 16) {
      barLabel.style.display = "none";
    } else if (barWidth < 24) {
      barLabel.style.fontSize = "0.5rem";
    }

    divbar.appendChild(barLabel);
    container.appendChild(divbar);
  }
}

// ===========================================
// SORTING CONTROLS
// ===========================================
function pauseSort() {
  if (state.isSorting && !state.isPaused) {
    state.isPaused = true;
    updateControlButtons();
  }
}

function resumeSort() {
  if (state.isSorting && state.isPaused) {
    state.isPaused = false;
    updateControlButtons();
  }
}

function resetSort() {
  state.shouldReset = true;
  state.isPaused = false;
  state.isSorting = false;
  
  // Re-enable all controls
  const allbtn = document.querySelectorAll(".btn");
  for (let btn of allbtn) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
  document.getElementById("barc").disabled = false;
  
  updateControlButtons();
  newArray();
  state.shouldReset = false;
}

function updateControlButtons() {
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  
  if (pauseBtn && resumeBtn) {
    if (state.isSorting) {
      if (state.isPaused) {
        pauseBtn.style.display = "none";
        resumeBtn.style.display = "flex";
      } else {
        pauseBtn.style.display = "flex";
        resumeBtn.style.display = "none";
      }
    } else {
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "none";
    }
  }
}

// ===========================================
// UTILITY: DELAY WITH PAUSE/RESET CHECK
// ===========================================
async function delay() {
  // Check for reset
  if (state.shouldReset) {
    throw new Error("RESET");
  }
  
  // Wait while paused
  while (state.isPaused && !state.shouldReset) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  if (state.shouldReset) {
    throw new Error("RESET");
  }
  
  // Dynamic speed: higher value = faster (less delay)
  const delayMs = Math.max(5, 110 - state.speed);
  await new Promise(resolve => setTimeout(resolve, delayMs));
}

// ===========================================
// MOBILE DETECTION
// ===========================================
function checkMobileDevice() {
  const overlay = document.getElementById("mobileOverlay");
  if (!overlay) return;
  
  function check() {
    const isMobile = window.innerWidth < 768;
    const isLandscape = window.innerWidth > window.innerHeight;
    
    if (isMobile && !isLandscape) {
      overlay.style.display = "flex";
    } else {
      overlay.style.display = "none";
    }
  }
  
  check();
  window.addEventListener("resize", check);
  window.addEventListener("orientationchange", check);
}
