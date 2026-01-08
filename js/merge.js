// merge.js - Merge Sort Implementation
/* eslint-disable */

async function mergeSort() {
  if (state.isSorting) return;
  
  state.isSorting = true;
  state.isPaused = false;
  state.shouldReset = false;
  
  disable();
  document.getElementById("pauseBtn").style.display = "flex";

  let bars = document.querySelectorAll(".bar");

  try {
    await mergeSortHelper(bars, 0, bars.length - 1);

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

async function mergeSortHelper(bars, l, r) {
  if (l >= r) return;

  const m = l + Math.floor((r - l) / 2);
  await mergeSortHelper(bars, l, m);
  await mergeSortHelper(bars, m + 1, r);
  await merge(bars, l, m, r);
}

async function merge(bars, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays with both height and value
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data and highlight left subarray
  for (let i = 0; i < n1; i++) {
    L[i] = { 
      height: bars[l + i].style.height, 
      value: bars[l + i].childNodes[0].innerText 
    };
    bars[l + i].classList.add("active");
  }
  
  // Highlight right subarray
  for (let j = 0; j < n2; j++) {
    R[j] = {
      height: bars[m + 1 + j].style.height,
      value: bars[m + 1 + j].childNodes[0].innerText,
    };
    bars[m + 1 + j].classList.add("comparing");
  }

  await delay();

  let i = 0, j = 0, k = l;

  // Merge back
  while (i < n1 && j < n2) {
    // Clear previous states in merge range
    for (let x = l; x <= r; x++) {
      bars[x].classList.remove("active", "comparing", "swapping");
    }
    
    // Show current comparison
    if (l + i <= m) bars[l + i].classList.add("active");
    if (m + 1 + j <= r) bars[m + 1 + j].classList.add("comparing");
    
    await delay();

    if (parseInt(L[i].height) <= parseInt(R[j].height)) {
      bars[k].classList.add("swapping");
      bars[k].style.height = L[i].height;
      bars[k].childNodes[0].innerText = L[i].value;
      i++;
    } else {
      bars[k].classList.add("swapping");
      bars[k].style.height = R[j].height;
      bars[k].childNodes[0].innerText = R[j].value;
      j++;
    }
    
    await delay();
    bars[k].classList.remove("swapping");
    k++;
  }

  // Copy remaining elements of L[]
  while (i < n1) {
    bars[k].classList.add("swapping");
    bars[k].style.height = L[i].height;
    bars[k].childNodes[0].innerText = L[i].value;
    
    await delay();
    
    bars[k].classList.remove("swapping");
    i++;
    k++;
  }

  // Copy remaining elements of R[]
  while (j < n2) {
    bars[k].classList.add("swapping");
    bars[k].style.height = R[j].height;
    bars[k].childNodes[0].innerText = R[j].value;
    
    await delay();
    
    bars[k].classList.remove("swapping");
    j++;
    k++;
  }

  // Clear all states after merge
  for (let x = l; x <= r; x++) {
    bars[x].classList.remove("active", "comparing", "swapping");
  }
}
