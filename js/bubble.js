// bubble.js
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

async function bubbleSort(delay = 100) {
  disable();

  let bars = document.querySelectorAll(".bar");
  let speed = document.getElementById("sorts").value;
  speed /= 10;
  speed *= 100;

  let n = bars.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      bars[i].style.backgroundColor = "darkblue";
      bars[i + 1].style.backgroundColor = "red";

      if (parseInt(bars[i].childNodes[0].innerHTML) > parseInt(bars[i + 1].childNodes[0].innerHTML)) {
        await swap(bars, i, i + 1);
        swapped = true;
      }

      await new Promise(resolve => setTimeout(resolve, speed));
      bars[i].style.backgroundColor = "rgb(24, 190, 255)";
      bars[i + 1].style.backgroundColor = "rgb(24, 190, 255)";
    }
    bars[n - 1].style.backgroundColor = "rgb(49, 226, 13)"; // Complete sort color
    n--;
  } while (swapped);

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "rgb(49, 226, 13)"; // Final color for all bars
  }

  enable();
}

async function swap(bars, i, j) {
  let tempHeight = bars[i].style.height;
  let tempLabel = bars[i].childNodes[0].innerText;
  bars[i].style.height = bars[j].style.height;
  bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
  bars[j].style.height = tempHeight;
  bars[j].childNodes[0].innerText = tempLabel;
}
