// bubble.js - Bubble Sort Implementation
/* eslint-disable */

function disable() {
  const allbtn = document.querySelectorAll(".btn");
  for (let btn of allbtn) {
    // Keep pause/resume/reset accessible
    if (btn.id === "pauseBtn" || btn.id === "resumeBtn" || btn.id === "resetBtn") continue;
    btn.disabled = true;
    btn.classList.add("disabled");
  }
  // Disable array size slider during sort
  document.getElementById("barc").disabled = true;
}

function enable() {
  const allbtn = document.querySelectorAll(".btn");
  for (let btn of allbtn) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
  document.getElementById("barc").disabled = false;
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resumeBtn").style.display = "none";
}

function clearBarStates(bars) {
  for (let bar of bars) {
    bar.classList.remove("active", "comparing", "swapping", "sorted");
  }
}

async function bubbleSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";
  showAlgorithmInfo('bubble');

  let bars = document.querySelectorAll(".bar");
  let n = bars.length;
  let swapped;

  try {
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        // Clear previous states
        clearBarStates(bars);
        
        // Mark active and comparing bars
        bars[i].classList.add("active");
        bars[i + 1].classList.add("comparing");

        await delay();

        const val1 = parseInt(bars[i].childNodes[0].innerHTML);
        const val2 = parseInt(bars[i + 1].childNodes[0].innerHTML);

        if (val1 > val2) {
          // Mark as swapping
          bars[i].classList.remove("active");
          bars[i + 1].classList.remove("comparing");
          bars[i].classList.add("swapping");
          bars[i + 1].classList.add("swapping");

          await delay();

          // Perform swap
          swap(bars, i, i + 1);
          swapped = true;

          await delay();
        }
        
        // Clear states
        bars[i].classList.remove("active", "swapping");
        bars[i + 1].classList.remove("comparing", "swapping");
      }
      
      // Mark last element as sorted
      bars[n - 1].classList.add("sorted");
      n--;
    } while (swapped);

    // Mark all as sorted
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove("active", "comparing", "swapping");
      bars[i].classList.add("sorted");
    }
  } catch (e) {
    if (e.message === "RESET") {
      // Reset was triggered, clean exit
    }
  }

  state.isSorting = false;
  enable();
}

function swap(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempLabel = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].style.height = tempHeight;
  bars[j].childNodes[0].innerText = tempLabel;
}
