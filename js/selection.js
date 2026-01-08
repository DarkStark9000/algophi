// selection.js - Selection Sort Implementation
/* eslint-disable */

async function selectionSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";

  const bars = document.querySelectorAll(".bar");

  try {
    for (let i = 0; i < bars.length - 1; i++) {
      let minIdx = i;
      
      clearBarStates(bars);
      
      // Re-mark sorted portion
      for (let s = 0; s < i; s++) {
        bars[s].classList.add("sorted");
      }
      
      // Mark current position as active
      bars[i].classList.add("active");

      for (let j = i + 1; j < bars.length; j++) {
        // Clear previous comparing state
        for (let k = i + 1; k < bars.length; k++) {
          if (k !== minIdx) bars[k].classList.remove("comparing");
        }
        
        // Mark current as comparing
        bars[j].classList.add("comparing");
        
        await delay();

        const val1 = parseInt(bars[j].childNodes[0].innerHTML);
        const val2 = parseInt(bars[minIdx].childNodes[0].innerHTML);

        if (val1 < val2) {
          // Remove active from old minimum
          if (minIdx !== i) {
            bars[minIdx].classList.remove("active");
          }
          minIdx = j;
          // Mark new minimum
          bars[minIdx].classList.add("active");
        }
        
        bars[j].classList.remove("comparing");
      }

      // Swap if needed
      if (minIdx !== i) {
        bars[i].classList.add("swapping");
        bars[minIdx].classList.add("swapping");
        
        await delay();

        // Perform swap
        const tempHeight = bars[minIdx].style.height;
        const tempValue = bars[minIdx].childNodes[0].innerText;
        bars[minIdx].style.height = bars[i].style.height;
        bars[minIdx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].style.height = tempHeight;
        bars[i].childNodes[0].innerText = tempValue;

        await delay();
      }

      // Mark position as sorted
      clearBarStates(bars);
      for (let s = 0; s <= i; s++) {
        bars[s].classList.add("sorted");
      }
    }

    // Final element is sorted too
    bars[bars.length - 1].classList.add("sorted");
  } catch (e) {
    if (e.message === "RESET") {
      // Reset triggered
    }
  }

  state.isSorting = false;
  enable();
}
