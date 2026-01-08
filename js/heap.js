// heap.js - Heap Sort Implementation
/* eslint-disable */

async function heapSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";
  showAlgorithmInfo('heap');

  let bars = document.querySelectorAll(".bar");
  let n = bars.length;

  try {
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(bars, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Current root (max) goes to end
      clearBarStates(bars);
      bars[0].classList.add("active");
      bars[i].classList.add("comparing");
      
      await delay();
      
      // Swap root with last element
      bars[0].classList.remove("active");
      bars[i].classList.remove("comparing");
      bars[0].classList.add("swapping");
      bars[i].classList.add("swapping");
      
      await delay();
      
      swapBars(bars, 0, i);
      
      await delay();
      
      bars[0].classList.remove("swapping");
      bars[i].classList.remove("swapping");
      
      // Mark as sorted
      bars[i].classList.add("sorted");
      
      // Heapify reduced heap
      await heapify(bars, i, 0);
    }

    // First element is also sorted
    bars[0].classList.add("sorted");

  } catch (e) {
    if (e.message === "RESET") {
      // Reset triggered
    }
  }

  state.isSorting = false;
  enable();
}

async function heapify(bars, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // Mark current node
  clearBarStatesExceptSorted(bars, n);
  if (i < n) bars[i].classList.add("active");

  await delay();

  // Check left child
  if (left < n) {
    bars[left].classList.add("comparing");
    await delay();
    
    const leftVal = parseInt(bars[left].childNodes[0].innerHTML);
    const largestVal = parseInt(bars[largest].childNodes[0].innerHTML);
    
    if (leftVal > largestVal) {
      if (largest !== i) bars[largest].classList.remove("active");
      largest = left;
      bars[largest].classList.remove("comparing");
      bars[largest].classList.add("active");
    } else {
      bars[left].classList.remove("comparing");
    }
  }

  // Check right child
  if (right < n) {
    bars[right].classList.add("comparing");
    await delay();
    
    const rightVal = parseInt(bars[right].childNodes[0].innerHTML);
    const largestVal = parseInt(bars[largest].childNodes[0].innerHTML);
    
    if (rightVal > largestVal) {
      if (largest !== i) bars[largest].classList.remove("active");
      bars[largest].classList.remove("active");
      largest = right;
      bars[largest].classList.remove("comparing");
      bars[largest].classList.add("active");
    } else {
      bars[right].classList.remove("comparing");
    }
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== i) {
    bars[i].classList.remove("active");
    bars[i].classList.add("swapping");
    bars[largest].classList.remove("active");
    bars[largest].classList.add("swapping");
    
    await delay();
    
    swapBars(bars, i, largest);
    
    await delay();
    
    bars[i].classList.remove("swapping");
    bars[largest].classList.remove("swapping");
    
    // Recursively heapify the affected subtree
    await heapify(bars, n, largest);
  } else {
    bars[i].classList.remove("active");
  }
}

function clearBarStatesExceptSorted(bars, n) {
  for (let i = 0; i < n; i++) {
    bars[i].classList.remove("active", "comparing", "swapping");
  }
}

function swapBars(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempLabel = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].style.height = tempHeight;
  bars[j].childNodes[0].innerText = tempLabel;
}
