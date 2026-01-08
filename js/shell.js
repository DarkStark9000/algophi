// shell.js - Shell Sort Implementation
/* eslint-disable */

async function shellSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";
  showAlgorithmInfo('shell');

  let bars = document.querySelectorAll(".bar");
  let n = bars.length;

  try {
    // Start with big gap, reduce by half each iteration
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      
      // Gapped insertion sort for this gap size
      for (let i = gap; i < n; i++) {
        // Save the current element
        const tempHeight = bars[i].style.height;
        const tempValue = bars[i].childNodes[0].innerText;
        
        clearBarStates(bars);
        bars[i].classList.add("active");
        
        await delay();
        
        let j = i;
        
        // Shift earlier gap-sorted elements up until correct position
        while (j >= gap && parseInt(bars[j - gap].childNodes[0].innerHTML) > parseInt(tempValue)) {
          clearBarStates(bars);
          
          // Highlight the gap pair being compared
          bars[j].classList.add("swapping");
          bars[j - gap].classList.add("comparing");
          
          await delay();
          
          // Shift element
          bars[j].style.height = bars[j - gap].style.height;
          bars[j].childNodes[0].innerText = bars[j - gap].childNodes[0].innerText;
          
          await delay();
          
          bars[j].classList.remove("swapping");
          bars[j - gap].classList.remove("comparing");
          
          j -= gap;
        }
        
        // Insert temp at correct position
        clearBarStates(bars);
        bars[j].classList.add("swapping");
        
        bars[j].style.height = tempHeight;
        bars[j].childNodes[0].innerText = tempValue;
        
        await delay();
        
        bars[j].classList.remove("swapping");
      }
    }

    // Mark all as sorted
    for (let i = 0; i < n; i++) {
      bars[i].classList.remove("active", "comparing", "swapping");
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
