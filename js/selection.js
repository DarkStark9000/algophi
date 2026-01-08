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

async function selectionSort(delay = 3) {
  disable();

  let speed = document.getElementById("sorts").value;

  speed /= 10;
  speed *= 100;

  const bars = document.querySelectorAll(".bar");
  let min_idx = 0;

  for (let i = 0; i < bars.length; i += 1) {
    min_idx = i;
    bars[i].style.backgroundColor = "darkblue";

    for (let j = i + 1; j < bars.length; j += 1) {
      bars[j].style.backgroundColor = "red";

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed)
      );

      const val1 = parseInt(bars[j].childNodes[0].innerHTML);
      const val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);

      if (val1 < val2) {
        if (min_idx !== i) {
          bars[min_idx].style.backgroundColor = "rgb(24, 190, 255)";
        }
        min_idx = j;
      } else {
        bars[j].style.backgroundColor = "rgb(24, 190, 255)";
      }
    }

    const temp1 = bars[min_idx].style.height;
    const temp2 = bars[min_idx].childNodes[0].innerText;
    bars[min_idx].style.height = bars[i].style.height;
    bars[i].style.height = temp1;
    bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = temp2;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3)
    );

    bars[min_idx].style.backgroundColor = "rgb(24, 190, 255)";
    bars[i].style.backgroundColor = "rgb(49, 226, 13)";
  }
  enable();
}
