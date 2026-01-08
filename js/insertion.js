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


async function insertionSort(delay = 3) {
  disable();

  let speed = document.getElementById("sorts").value;

  speed /= 10;
  speed *= 100;

  const bars = document.querySelectorAll(".bar");
  let key = 0,
    j = 0;

  for (let i = 0; i < bars.length; i += 1) {
    // key = bars[i];
    bars[i].style.backgroundColor = "darkblue";
    key = parseInt(bars[i].childNodes[0].innerHTML);

    const key1 = bars[i].style.height;
    const key2 = bars[i].childNodes[0].innerText;

    j = i - 1;

    while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
      bars[j].style.backgroundColor = "red";

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed)
      );

      // bars[j + 1] = bars[j];

      const temp1 = bars[j].style.height;
      const temp2 = bars[j].childNodes[0].innerText;
      // bars[j].style.height = bars[j + 1].style.height;
      bars[j + 1].style.height = temp1;
      // bars[j].childNodes[0].innerText = bars[j + 1].childNodes[0].innerText;
      bars[j + 1].childNodes[0].innerText = temp2;

      bars[j].style.backgroundColor = "rgb(24, 190, 255)";

      j = j - 1;
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 3)
    );

    bars[j + 1].style.height = key1;
    bars[j + 1].childNodes[0].innerText = key2; // key;
  }
  for (let i = bars.length - 1; i >= 0; --i) {
    bars[i].style.backgroundColor = "rgb(49, 226, 13)"; // green
  }

  enable();
}
