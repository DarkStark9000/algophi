// quick.js - Quick Sort Implementation
/* eslint-disable */

async function quickSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";

  let bars = document.querySelectorAll(".bar");

  try {
    await quickSortHelper(bars, 0, bars.length - 1);

    // Mark all as sorted
    for (let i = 0; i < bars.length; i++) {
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

async function quickSortHelper(bars, low, high) {
  if (low < high) {
    let pi = await partition(bars, low, high);
    await quickSortHelper(bars, low, pi - 1);
    await quickSortHelper(bars, pi + 1, high);
  } else if (low === high) {
    // Single element is sorted
    bars[low].classList.add("sorted");
  }
}

async function partition(bars, low, high) {
  // Pivot is the last element
  let pivot = parseInt(bars[high].childNodes[0].innerHTML);
  
  // Mark pivot as active
  bars[high].classList.add("active");
  
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // Mark current element as comparing
    bars[j].classList.add("comparing");
    
    await delay();

    if (parseInt(bars[j].childNodes[0].innerHTML) < pivot) {
      i++;
      
      if (i !== j) {
        // Mark as swapping
        bars[i].classList.add("swapping");
        bars[j].classList.remove("comparing");
        bars[j].classList.add("swapping");
        
        await delay();
        
        // Swap
        swapBars(bars, i, j);
        
        await delay();
        
        bars[i].classList.remove("swapping");
        bars[j].classList.remove("swapping");
      }
    }
    
    bars[j].classList.remove("comparing");
  }

  // Swap pivot to its correct position
  bars[i + 1].classList.add("swapping");
  bars[high].classList.remove("active");
  bars[high].classList.add("swapping");
  
  await delay();
  
  swapBars(bars, i + 1, high);
  
  await delay();
  
  bars[i + 1].classList.remove("swapping");
  bars[high].classList.remove("swapping");
  
  // Pivot is now in sorted position
  bars[i + 1].classList.add("sorted");
  
  return i + 1;
}

function swapBars(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempLabel = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].style.height = tempHeight;
  bars[j].childNodes[0].innerText = tempLabel;
}
