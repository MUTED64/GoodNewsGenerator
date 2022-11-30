const canvas = document.getElementById("good-news-image");
const ctx = canvas.getContext("2d");
const backgroundImg = new Image();
const form = document.querySelector("form");

loadBackground("Background.jpg");

document.getElementById("font").addEventListener("change", (e) => {
  if (e.target.value === "other") {
    document.getElementById("manual-font").style.display = "block";
  } else {
    document.getElementById("manual-font").style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const content = document.getElementById("content").value;
  const lines = content.split("\n");
  const fontSize = document.getElementById("font-size").value;
  let font = document.getElementById("font").value;
  if (
    font === "other" &&
    isSupportFontFamily(document.getElementById("manual-font").value)
  ) {
    font = document.getElementById("manual-font").value;
  } else {
    font = "sans-serif";
  }

  ctx.font = `bold ${fontSize}px ${font}`;

  clearText();
  drawText();

  function drawText() {
    drawOnce(8, 8);
    drawOnce(-8, -8);
    drawOnce(8, -8);
    drawOnce(-8, 8);

    function drawOnce(shadowOffsetX, shadowOffsetY) {
      ctx.shadowColor = "rgba(256,256,1,0.8)";
      ctx.shadowOffsetX = shadowOffsetX;
      ctx.shadowOffsetY = shadowOffsetY;
      ctx.shadowBlur = 40;
      ctx.fillStyle = "#e5230a";
      for (let j = 0; j < lines.length; j++) {
        ctx.fillText(
          lines[j],
          (canvas.width - ctx.measureText(lines[j]).width + fontSize / 2) / 2,
          (canvas.height + fontSize / 2) / 2 +
            (j + 1 - lines.length / 2) * fontSize
        );
      }
    }
  }
});

function loadBackground(backgroundImgPath) {
  backgroundImg.src = backgroundImgPath;
  backgroundImg.onload = function () {
    canvas.width = backgroundImg.width;
    canvas.height = backgroundImg.height;
    ctx.drawImage(backgroundImg, 0, 0);
  };
}

function clearText() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0);
}

function isSupportFontFamily(f) {
  if (typeof f != "string") {
    return false;
  }
  var h = "Arial";
  if (f.toLowerCase() == h.toLowerCase()) {
    return true;
  }
  var e = "a";
  var d = 100;
  var a = 100,
    i = 100;
  var c = document.createElement("canvas");
  var b = c.getContext("2d");
  c.width = a;
  c.height = i;
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function (j) {
    b.clearRect(0, 0, a, i);
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
    var k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function (l) {
      return l != 0;
    });
  };
  return g(h).join("") !== g(f).join("");
}
