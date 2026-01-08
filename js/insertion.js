// insertion.js - Insertion Sort Implementation
/* eslint-disable */

async function insertionSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";
  showAlgorithmInfo('insertion');

  const bars = document.querySelectorAll(".bar");

  try {
    // First element is already "sorted"
    bars[0].classList.add("sorted");

    for (let i = 1; i < bars.length; i++) {
      clearBarStates(bars);
      
      // Re-mark sorted portion
      for (let s = 0; s < i; s++) {
        bars[s].classList.add("sorted");
      }
      
      // Current element to insert
      bars[i].classList.add("active");
      
      const keyHeight = bars[i].style.height;
      const keyValue = bars[i].childNodes[0].innerText;
      
      await delay();

      let j = i - 1;

      while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > parseInt(keyValue)) {
        clearBarStates(bars);
        
        // Re-mark sorted portion
        for (let s = 0; s <= j; s++) {
          bars[s].classList.add("sorted");
        }
        
        // Mark comparing elements
        bars[j].classList.remove("sorted");
        bars[j].classList.add("comparing");
        bars[j + 1].classList.add("swapping");

        await delay();

        // Shift element right
        bars[j + 1].style.height = bars[j].style.height;
        bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;

        await delay();

        j--;
      }

      // Insert key at correct position
      bars[j + 1].style.height = keyHeight;
      bars[j + 1].childNodes[0].innerText = keyValue;
      
      // Mark as swapping momentarily
      clearBarStates(bars);
      for (let s = 0; s <= i; s++) {
        bars[s].classList.add("sorted");
      }
      bars[j + 1].classList.remove("sorted");
      bars[j + 1].classList.add("swapping");
      
      await delay();
    }

    // Final: all sorted
    clearBarStates(bars);
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.add("sorted");
    }
  } catch (e) {
    if (e.message === "RESET") {
      // Reset triggered
    }
  }

  state.isSorting = false;
  enable();
}
