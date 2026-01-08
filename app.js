/* eslint-disable */
const container = document.querySelector(".content");

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("barc").value = 25;
  document.getElementById("sorts").value = 50;
  updateSliderDisplays();
  newArray();
});

// Slider event listeners
document.getElementById("barc").addEventListener("input", function() {
  updateSliderDisplays();
  newArray();
});

document.getElementById("sorts").addEventListener("input", updateSliderDisplays);

function updateSliderDisplays() {
  const barcVal = document.getElementById("barc-val");
  const sortsVal = document.getElementById("sorts-val");
  if (barcVal) barcVal.textContent = document.getElementById("barc").value;
  if (sortsVal) sortsVal.textContent = document.getElementById("sorts").value;
}

function newArray() {
  container.innerHTML = "";

  const barc = parseInt(document.getElementById("barc").value);
  
  // Calculate bar width based on container and count
  const containerWidth = container.offsetWidth || window.innerWidth - 100;
  const gap = 3;
  let barWidth = Math.floor((containerWidth - (barc * gap)) / barc);
  
  // Clamp bar width
  barWidth = Math.max(4, Math.min(barWidth, 50));

  for (let i = 0; i < barc; i++) {
    let barValue = Math.floor(Math.random() * 100) + 1;

    const divbar = document.createElement("div");
    divbar.classList.add("bar");

    // Height scales with value (max ~400px)
    divbar.style.height = `${barValue * 4}px`;
    divbar.style.width = `${barWidth}px`;
    divbar.style.minWidth = `${barWidth}px`;

    const barLabel = document.createElement("label");
    barLabel.classList.add("bar_id");
    barLabel.innerHTML = barValue;

    // Hide labels when bars are too narrow
    if (barWidth < 16) {
      barLabel.style.display = "none";
    } else if (barWidth < 24) {
      barLabel.style.fontSize = "0.5rem";
    }

    divbar.appendChild(barLabel);
    container.appendChild(divbar);
  }
}
