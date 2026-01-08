// quick.js
/* eslint-disable */
function disable() {
  const allbtn = document.querySelectorAll(".btn");
  for (let btn of allbtn) {
    btn.disabled = true;
    btn.classList.add("disabled");
  }
}

function enable() {
  const allbtn = document.querySelectorAll(".btn");
  for (let btn of allbtn) {
    btn.disabled = false;
    btn.classList.remove("disabled");
  }
}

async function quickSort(delay = 100) {
  disable();

  let bars = document.querySelectorAll(".bar");
  let speed = document.getElementById("sorts").value;
  speed /= 10;
  speed *= 100;

  await quickSortHelper(bars, 0, bars.length - 1, speed);

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "rgb(49, 226, 13)"; // Green color for completed sort
  }

  enable();
}

async function quickSortHelper(bars, low, high, speed) {
  if (low < high) {
    let pi = await partition(bars, low, high, speed);
    await quickSortHelper(bars, low, pi - 1, speed);
    await quickSortHelper(bars, pi + 1, high, speed);
  }
}

async function partition(bars, low, high, speed) {
  let pivot = parseInt(bars[high].childNodes[0].innerHTML);
  bars[high].style.backgroundColor = "darkblue";
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (parseInt(bars[j].childNodes[0].innerHTML) < pivot) {
      i++;
      swap(bars, i, j);
      bars[i].style.backgroundColor = "red";
      if (i !== j) bars[j].style.backgroundColor = "red";
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }
  swap(bars, i + 1, high);
  bars[high].style.backgroundColor = "rgb(24, 190, 255)";
  bars[i + 1].style.backgroundColor = "rgb(49, 226, 13)";
  return i + 1;
}

function swap(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempLabel = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].style.height = tempHeight;
  bars[j].childNodes[0].innerText = tempLabel;
}
