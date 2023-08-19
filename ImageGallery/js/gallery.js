// 200521364 Ji Hee Rhou, 200530592 Jing-xian Wu

// array of images
const imagesArr = [
  "flowers-pink",
  "flowers-purple",
  "flowers-red",
  "flowers-white",
  "flowers-yellow",
];
const thumbBar = document.querySelector("ul");
const thumbImgs = document.querySelectorAll("li");
const buttonAuto = document.querySelector("#isAuto");
let isAuto = false; // image auto change button on/off
let intervalID; // interval ID
let imgIndex = 0; // index of the image

const galleryItems = [
  {
    id: 0,
    caption: imagesArr[0].toUpperCase(),
    filename: imagesArr[0],
    alt: "Pink Flowers",
  },
  {
    id: 1,
    caption: imagesArr[1].toUpperCase(),
    filename: imagesArr[1],
    alt: "Purple Flowers",
  },
  {
    id: 2,
    caption: imagesArr[2].toUpperCase(),
    filename: imagesArr[2],
    alt: "Red Flowers",
  },
  {
    id: 3,
    caption: imagesArr[3].toUpperCase(),
    filename: imagesArr[3],
    alt: "White Flowers",
  },
  {
    id: 4,
    caption: imagesArr[4].toUpperCase(),
    filename: imagesArr[4],
    alt: "Yellow Flowers",
  },
];

// Create the <img> elements
for (let i = 0; i < thumbImgs.length; i++) {
  let filename = galleryItems.find((item) => item.id === i).filename;
  // replace '[filename]' with the images' name for src attribute
  let src = thumbImgs[i]
    .querySelector("img")
    .src.replace("[filename]", filename);
  // .src.replace("[filename]", imagesArr[i]);
  // Set the <img> elements' src attribute to the images' small image
  thumbImgs[i].querySelector("img").setAttribute("src", src);

  // replace value of alt attribute with the images' name contained in the object included in the array
  let alt = thumbImgs[i]
    .querySelector("img")
    .alt.replace("", Object.values(galleryItems[i])[3]); // Access the object and get the value

  // Set the <img> elements' alt attribute to the images' name
  thumbImgs[i].querySelector("img").setAttribute("alt", alt);

  // Set the first image's large image and image's name to the figure image and caption
  if (i === 0) {
    // Set the first image's css
    thumbImgs[i].querySelector("img").style.filter = "grayscale(0)";
    // Set the figure image to the first image's large image
    document
      .querySelector("figure")
      .querySelector("img")
      .setAttribute("src", src.replace("small", "large"));

    // Set the figure image's alt attribute to the first image's name
    document
      .querySelector("figure")
      .querySelector("img")
      .setAttribute("alt", "The image source is unavailable.");
    document
      .querySelector("figure")
      .querySelector("img")
      .setAttribute("style", "font-size: 7rem;");

    // Set the caption to the first image's name
    document.querySelector("figcaption").textContent = imagesArr[i];
  }
}

// click the "AUTO PLAY" button
buttonAuto.onclick = function () {
  isAuto = !isAuto; // toggle on/off
  // If the "AUTO PLAY" button on
  if (isAuto) {
    // button css
    buttonAuto.style.color = "white";
    buttonAuto.style.background = "#0cff03";
    buttonAuto.style.border = "5px solid #0cff03";
    // The image change automatically every 3 seconds
    intervalID = setInterval(autoImage, 1000);
  }
  // If the "AUTO PLAY" button off
  else {
    // button css
    buttonAuto.style.color = "black";
    buttonAuto.style.background = "white";
    buttonAuto.style.border = "5px solid #091b93";
    // Switch the "AUTO PLAY" to off
    clearInterval(intervalID);
  }
};

// click thumbImgs image
thumbImgs.forEach(function (thumbImg) {
  thumbImg.addEventListener("click", function (event) {
    // If the images is changing automatically, then stop it
    if (isAuto) {
      // change to manually
      isAuto = false;
      // button css
      buttonAuto.style.color = "black";
      buttonAuto.style.background = "white";
      buttonAuto.style.border = "5px solid #091b93";
      clearInterval(intervalID);
    }

    // Set thumbBar's css to the default value (all grayscale(100%))
    resetThumbBar();
    // event.target is the element that was clicked
    if (event.target && event.target.nodeName === "IMG") {
      // Set the clicked image's css
      event.target.style.filter = "grayscale(0)";

      // Set the figure image to the clicked image's large image
      let imgSrc = event.target.getAttribute("src");
      let newImgSrc = imgSrc.replace("small", "large");
      document
        .querySelector("figure")
        .querySelector("img")
        .setAttribute("src", newImgSrc);

      // Set the caption to the clicked image's name
      for (let i = 0; i < imagesArr.length; i++) {
        // if the clicked image's src contains the photo in the array of images
        if (imgSrc.indexOf(imagesArr[i]) > -1) {
          // Set the caption to the clicked image's name
          document.querySelector("figcaption").textContent = imagesArr[i];
          // Set the index of the image to the index of the clicked image
          imgIndex = i;
          break;
        }
      }
    }
  });
});

// Set thumbBar's css to the default value
function resetThumbBar() {
  for (let i = 0; i < thumbImgs.length; i++) {
    thumbImgs[i].querySelector("img").style.filter = "grayscale(100%)";
  }
}

// The auto play function
function autoImage() {
  // Set thumbBar's css to the default value
  resetThumbBar();

  // Set the figure image and caption to the next image's large image and image's name
  let img = thumbImgs[imgIndex].querySelector("img");
  // Set the image's css
  img.style.filter = "grayscale(0)";
  let imgSrc = img.getAttribute("src");
  let newImgSrc = imgSrc.replace("small", "large");
  document
    .querySelector("figure")
    .querySelector("img")
    .setAttribute("src", newImgSrc);
  document.querySelector("figcaption").textContent = imagesArr[imgIndex];

  // If the index of the image equals the length of the array of images, the index of the image becomes 0, otherwise the index of the image increases 1
  imgIndex < imagesArr.length - 1 ? imgIndex++ : (imgIndex = 0);
}
