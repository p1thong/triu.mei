const contentLetterSrart_actived = "triu.mei"; //Lời mở đầu cho bức thư
// const mainContentLetter = "Gửi lời nhắn nhủ đến người bạn bạn yêu thương." //Nội dung của bức thư
const mainContentLetter =
  "Chúc bạn Triệu My có một ngày sinh nhật thật vui vẻ và hạnh phúc bên những người bạn yêu thương. Mong rằng mọi điều tốt đẹp sẽ đến với bạn trong năm mới này. Hãy luôn giữ nụ cười trên môi và đừng quên rằng bạn luôn được yêu thương. Chúc bạn có một sinh nhật thật đáng nhớ và tràn đầy niềm vui!";
const subContentLetter = "Sớm có bằng lái!"; //Nội dung phụ của bức thư
document.querySelector(".subContent").style.fontSize = "20px"; //Đặt kích thước chữ cho nội dung phụ của bức thư
// Gắn 1 đường link ảnh bất kì
let imgStart = document.querySelector(".myAI"); //Hình ảnh xuất hiện trong lời mở đầu của bức thư
imgStart.src = "./img/tim.jpg";
imgStart.style.borderRadius = "10px"; //Đặt kích thước cho hình ảnh trong lời mở đầu của bức thư

// Gắn 1 link ảnh bất kì
let imgLetter = document.querySelector(".img");
imgLetter.src = "./img/tim.jpg"; //Hình ảnh xuất hiện trong nội dung của bức thư sau khi bức thư được viết ra hết

const splitContentLetterSrart_actived = contentLetterSrart_actived.split("");

document.querySelector(".sticker").addEventListener("click", function () {
  //Hiệu ứng gõ chữ cho phần mở đầu của bức thư
  document.querySelector(".contentLetter").innerHTML = "";
  document.querySelector(".startLetter").classList.add("active");
  setTimeout(() => {
    splitContentLetterSrart_actived.forEach((val, index) => {
      setTimeout(() => {
        document.querySelector(".contentLetter").innerHTML += val;
        if (index == contentLetterSrart_actived.length - 1) {
          setTimeout(() => {
            document
              .querySelector(".recieve")
              .setAttribute("style", "opacity: 1; transition: .5s");
          }, 1000);
        }
      }, 50 * index);
    });
  }, 1000);
});

//bắn pháo hoa
function launchFireworks(count = 8) {
  const container = document.querySelector(".fireworks-container");
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createFirework(container);
    }, i * 300);
  }
}

function createFirework(container) {
  const firework = document.createElement("div");
  firework.classList.add("firework");
  
  const leftPos = 10 + Math.random() * 80;
  firework.style.left = `${leftPos}%`;
  
  // Random độ cao (30-80% từ đỉnh màn hình)
  const explosionHeight = 30 + Math.random() * 50;
  
  // Màu neon tươi sáng
  const color = getBrightColor();
  firework.style.background = color;
  
  container.appendChild(firework);
  
  setTimeout(() => {
    firework.remove();
    createExplosion(leftPos, explosionHeight, color, container);
  }, 1000);
}

function createExplosion(x, y, baseColor, container) {
  const particleCount = 60 + Math.floor(Math.random() * 40);

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework-particle");

    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;

    // Màu sắc tươi sáng với độ bão hòa cao
    const particleColor = getVibrantColor(baseColor);
    particle.style.background = particleColor;
    particle.style.boxShadow = `0 0 8px ${particleColor}, 0 0 12px ${particleColor}`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 6 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.setProperty("--tx", `${tx}vw`);
    particle.style.setProperty("--ty", `${ty}vh`);

    const size = 3 + Math.random() * 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.animationDelay = `${Math.random() * 0.2}s`;

    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1200);
  }
}

// Màu neon tươi sáng
function getBrightColor() {
  const neonColors = [
    "#FF0000", // Đỏ neon
    "#00FF00", // Xanh lá neon
    "#0000FF", // Xanh dương neon
    "#FFFF00", // Vàng neon
    "#FF00FF", // Hồng neon
    "#00FFFF", // Cyan neon
    "#FFA500", // Cam neon
    "#FF1493", // Hồng đậm neon
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Biến thể màu sắc tươi sáng
function getVibrantColor(baseColor) {
  const hueShift = Math.floor(Math.random() * 40) - 20;
  const baseHue = parseInt(baseColor.substring(1), 16);
  const newHue = (baseHue + hueShift) % 360;

  // Độ bão hòa 100% và độ sáng cao (80-100%)
  return `hsl(${newHue}, 100%, ${80 + Math.random() * 20}%)`;
}

// Tăng tần suất pháo hoa
// setInterval(() => {
//   launchFireworks(4 + Math.floor(Math.random() * 4));
// }, 1200);

// Phóng nhiều pháo hoa ngay khi load
// window.addEventListener("load", () => {
//   launchFireworks(8);
// });

let timeouts = [];

document.querySelector("#mess").addEventListener("change", function() {
  const content = document.querySelector(".content");
  const mainEl = document.querySelector(".mainContent");
  const subEl = document.querySelector(".subContent");
  const img = document.querySelector(".img1");

  if (this.checked === true) {
    content.classList.add("actived");
    mainEl.innerHTML = "";
    subEl.innerHTML = "";
    img.style.opacity = 0;
    timeouts = [];

    const splitMainContentLetter = mainContentLetter.split("");
    const splitSubContentLetter = subContentLetter.split("");

    // Gõ nội dung chính
    splitMainContentLetter.forEach((val, index) => {
      const timeoutId = setTimeout(() => {
        mainEl.innerHTML += val;

        if (index === splitMainContentLetter.length - 1) {
          // Gõ nội dung phụ
          splitSubContentLetter.forEach((val2, subIndex) => {
            const subTimeoutId = setTimeout(() => {
              subEl.innerHTML += val2;

              if (subIndex === splitSubContentLetter.length - 1) {
                img.style.cssText = "opacity: 1; transition: .5s;";
                // BẮN PHÁO HOA KHI CHỮ CHẠY XONG
                launchFireworks(10); // Bắn 10 pháo hoa
                // Tiếp tục bắn ngẫu nhiên sau mỗi 1.5s
                const intervalId = setInterval(() => {
                  launchFireworks(3 + Math.floor(Math.random() * 3));
                }, 1500);
                // Lưu intervalId để clear sau
                timeouts.push({id: intervalId, isInterval: true});
              }
            }, 50 * subIndex);
            timeouts.push({id: subTimeoutId, isInterval: false});
          });
        }
      }, 50 * index);
      timeouts.push({id: timeoutId, isInterval: false});
    });
  } else {
    // Dừng tất cả hiệu ứng
    timeouts.forEach(item => {
      if (item.isInterval) {
        clearInterval(item.id);
      } else {
        clearTimeout(item.id);
      }
    });
    timeouts = [];
    
    content.classList.remove("actived");
    mainEl.innerHTML = "";
    subEl.innerHTML = "";
    img.style.opacity = 0;
  }
});

document.querySelector(".recieve").addEventListener("click", () => {
  document.querySelector(".startLetter").classList.add("close");
  setTimeout(() => {
    document.querySelector(".startForm").classList.add("close");
    setTimeout(() => {
      document
        .querySelector(".startForm")
        .setAttribute("style", "bottom: 100%");

      let getTypeDevice = document.documentElement.clientWidth;
      if (getTypeDevice <= 768) {
        createLight(20);
      } else {
        createLight(40);
      }
    }, 500);
  }, 500);
});

// Animation Drop light _ Tạo hiệu ứng kim tuyến rơi
//Bạn có thể thiết kế lại để trông chân thật hơn nhé, thiết kế của mình hơi bị cứng và thiếu sự tự nhiên
// const getBackground = document.querySelector(".backgroundParty");
// var width = getBackground.offsetWidth;
// var height = getBackground.offsetHeight;

// function createLight(a) {
//   var container = document.querySelector(".backgroundParty");
//   const blurLv = [2, 4];
//   const count = a;
//   const allDefaultColor = ["red", "lime", "yellow", "orange", "blue"];

//   for (var i = 0; i < count; i++) {
//     var randomLeft = 0;
//     randomLeft = Math.floor(Math.random() * width);
//     var randomTop = 0;
//     randomTop = Math.floor((Math.random() * height) / 2);
//     var color = "white";
//     var blur = Math.floor(Math.random() * 2);
//     var widthEle = Math.floor(Math.random() * 5) + 15;
//     var moveTime = Math.floor(Math.random() * 4) + 4;

//     var div = document.createElement("div");
//     div.classList.add = "snow";
//     div.style.position = "absolute";
//     div.style.backgroundColor = allDefaultColor[Math.floor(Math.random() * 5)];
//     div.style.borderRadius =
//       Math.floor(Math.random() * 10 + 10).toString() + "px";

//     div.style.height = "0px";
//     div.style.width = "0px";

//     div.style.height = widthEle * Math.floor(Math.random() * 4 + 1) + "px";
//     div.style.width = widthEle + "px";
//     div.style.marginLeft = randomLeft + "px";
//     div.style.marginTop = randomTop + "px";
//     div.style.filter = "blur(" + blurLv[blur] + "px" + ")";
//     div.style.animation = "moveLight " + moveTime + "s ease-in-out infinite";

//     container.appendChild(div);
//   }
// }

const imageList = [
  "./img/my1.png",
  "./img/my2.png",
  "./img/my3.png",
  "./img/my4.png",
  "./img/tim.jpg",
]; // Danh sách ảnh bạn muốn dùng

let lastTrailTime = 0;
const trailInterval = 110; // 👈 Khoảng cách thời gian giữa 2 dấu vết (ms)

document.querySelector(".startForm").addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrailTime < trailInterval) return;
  lastTrailTime = now;

  const img = document.createElement("img");
  img.src = imageList[Math.floor(Math.random() * imageList.length)];
  img.className = "trail-img";
  img.style.left = e.pageX - 20 + "px";
  img.style.top = e.pageY - 20 + "px";

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 2000); // thời gian dấu vết tồn tại
});
