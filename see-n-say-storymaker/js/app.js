// Assignment 1 | COMP1073 Client-Side JavaScript
// 200521364 Ji Hee Rhou, 200530592 Jing-xian Wu
/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
var synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak

let textToSpeak = "";
let sbutton = document.querySelector("button#s");
let vbutton = document.querySelector("button#v");
let abutton = document.querySelector("button#a");
let obutton = document.querySelector("button#o");
let ppbutton = document.querySelector("button#pp");
var speakButton = document.querySelector("button#text");
let randomButton = document.querySelector("button#random");
let resetButton = document.querySelector("button#reset");
let myStoryButton = document.querySelector("button#myStory");
let isMakeMyStory = false;

const sarrayDefault = [
  "The turkey",
  "Mom",
  "Dad",
  "The dog",
  "My teacher",
  "The elephant",
  "The cat",
];
const varrayDefault = [
  "sat on",
  "ate",
  "danced with",
  "saw",
  "doesn't like",
  "kissed",
];
const aarrayDefault = [
  "a funny",
  "a scary",
  "a goofy",
  "a slimy",
  "a barking",
  "a fat",
];
const oarrayDefault = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
const pparrayDefault = [
  "on the moon",
  "on the chair",
  "in my spaghetti",
  "in my soup",
  "on the grass",
  "in my shoes",
];

let sarray = sarrayDefault;
let varray = varrayDefault;
let aarray = aarrayDefault;
let oarray = oarrayDefault;
let pparray = pparrayDefault;

let speakArray = [];

let index = 0;

let divP = document.querySelector("div.paragraph");

// set the items on the columns using each array
function setColumn() {
  const columns = document.querySelectorAll("ul");

  let i = 0;
  columns.forEach((column) => {
    removeItems(column);
    addItems(i, column);
    i++;
  });
}

// remove all items on the columns
function removeItems(column) {
  let items = column.querySelectorAll("li");
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      items[i].remove();
    }
  }
}

// add the items of the arrays to the columns
function addItems(i, column) {
  let items = [];
  if (i == 0) {
    items = sarray;
  } else if (i == 1) {
    items = varray;
  } else if (i == 2) {
    items = aarray;
  } else if (i == 3) {
    items = oarray;
  } else if (i == 4) {
    items = pparray;
  }

  for (let j = 0; j < items.length; j++) {
    let list = document.createElement("li");
    list.innerHTML = items[j];
    column.appendChild(list);
  }

  // in 'Make My Story' mode, the user can input a maximum of 7 items on each column
  if (isMakeMyStory) {
    items = column.querySelectorAll("li");
    if (items.length >= 7) {
      if (i == 0) {
        document.getElementById("addSValue").style.display = "none";
        document.getElementById("addSValue").style.display = "none";
      } else if (i == 1) {
        document.getElementById("addVValue").style.display = "none";
        document.getElementById("addVButton").style.display = "none";
      } else if (i == 2) {
        document.getElementById("addAValue").style.display = "none";
        document.getElementById("addAButton").style.display = "none";
      } else if (i == 3) {
        document.getElementById("addOValue").style.display = "none";
        document.getElementById("addOButton").style.display = "none";
      } else if (i == 4) {
        document.getElementById("addPpValue").style.display = "none";
        document.getElementById("addPpButton").style.display = "none";
      }
    }
  }
}

// randomly generate a number from 0 to length of array
function randomNum(len) {
  return Math.floor(Math.random() * len);
}

/* Functions
-------------------------------------------------- */
function speakNow(string) {
  // Create a new speech object, attaching the string of text to speak
  var utterThis = new SpeechSynthesisUtterance(string);
  // Actually speak the text
  synth.speak(utterThis);
}

/* Event Listeners
-------------------------------------------------- */
// Onclick handler for the button that speaks the text contained in the above var textToSpeak
// when window loaded, set the columns
window.addEventListener("load", (event) => {
  setColumn();
});

sbutton.onclick = function (isSpeak) {
  if (sarray.length > 0) {
    index = randomNum(sarray.length);
    speakArray[0] = sarray[index];
    setHighlight(0, index);
    if (isSpeak) {
      speakNow(sarray[index]);
    }
  }
};

vbutton.onclick = function (isSpeak) {
  if (varray.length > 0) {
    index = randomNum(varray.length);
    speakArray[1] = varray[index];
    setHighlight(1, index);
    if (isSpeak) {
      speakNow(varray[index]);
    }
  }
};

abutton.onclick = function (isSpeak) {
  if (aarray.length > 0) {
    index = randomNum(aarray.length);
    speakArray[2] = aarray[index];
    setHighlight(2, index);
    if (isSpeak) {
      speakNow(aarray[index]);
    }
  }
};

obutton.onclick = function (isSpeak) {
  if (oarray.length > 0) {
    index = randomNum(oarray.length);
    speakArray[3] = oarray[index];
    setHighlight(3, index);
    if (isSpeak) {
      speakNow(oarray[index]);
    }
  }
};

ppbutton.onclick = function (isSpeak) {
  if (pparray.length > 0) {
    index = randomNum(pparray.length);
    speakArray[4] = pparray[index];
    setHighlight(4, index);
    if (isSpeak) {
      speakNow(pparray[index]);
    }
  }
};

// speak the story
speakButton.onclick = function () {
  let isFilled = true;
  if (isMakeMyStory) {
    isFilled = checkUserInputList();
  }

  if (isFilled) {
    textToSpeak = "";
    for (let i = 0; i < speakArray.length; i++) {
      if (speakArray[i] !== "" && speakArray[i] !== undefined) {
        if (textToSpeak.length > 0) textToSpeak += " ";
        textToSpeak += speakArray[i];
      }
    }

    if (textToSpeak === "") {
      alert("Please click on the buttons to create a story.");
    } else {
      clearStory();
      speakNow(textToSpeak);
      printStory(textToSpeak);
    }
  }
};

// check the user filled the columns when 'Make My Story' mode
function checkUserInputList() {
  if (
    sarray.length == 0 &&
    varray.length == 0 &&
    aarray.length == 0 &&
    oarray.length == 0 &&
    pparray.length == 0
  ) {
    alert('Please fill in columns and click "+".');
    return false;
  }
  return true;
}

// randomly generate a story
randomButton.onclick = function () {
  let isFilled = true;
  if (isMakeMyStory) {
    isFilled = checkUserInputList();
  }

  if (isFilled) {
    clearStory();
    // call the buttons' onclick function without speak function
    sbutton.onclick(false);
    vbutton.onclick(false);
    abutton.onclick(false);
    obutton.onclick(false);
    ppbutton.onclick(false);

    // call the speakButton's onclick function
    speakButton.onclick();
  }
};

// reset the story
resetButton.onclick = function () {
  textToSpeak = "";
  speakArray = [];
  clearStory();
  removeHighlight(-1);
};

// Make My Story mode or default mode and set the items of the arrays on the column
myStoryButton.onclick = function () {
  // call the resetButton's onclick function
  resetButton.onclick();
  // change to 'Make My Story' mode
  if (!isMakeMyStory) {
    // alert the instruction of 'Make My Story' mode
    let instruction =
      "\nMake your own story!\n\n" +
      'Please fill in the columns and click "+", then click on "Speak the Story".';
    alert(instruction);

    // clear all arrays
    sarray = [];
    varray = [];
    aarray = [];
    oarray = [];
    pparray = [];

    // display the user input text boxes and buttons
    displayUserInput("inline");
    // change the button text
    myStoryButton.innerText = "Default";
  }
  // change to 'Default' mode
  else {
    // set each array to default
    sarray = sarrayDefault;
    varray = varrayDefault;
    aarray = aarrayDefault;
    oarray = oarrayDefault;
    pparray = pparrayDefault;

    // not display the user input text boxes and buttons
    displayUserInput("none");
    // change the button text
    myStoryButton.innerText = "Make My Story";
  }

  setColumn();
  // toggle isMakeStroy
  isMakeMyStory = !isMakeMyStory;
};

// display or not the user inputs text boxes and buttons
function displayUserInput(display) {
  // display or not text boxes
  let textAdd = document.querySelectorAll(".textAdd");
  textAdd.forEach((t) => {
    t.style.display = display;
  });

  // display or not buttons
  let buttonAdd = document.querySelectorAll(".buttonAdd");
  buttonAdd.forEach((b) => {
    b.style.display = display;
  });
}

// add the user input to the array and set them on the column
function addList(val) {
  let addValue = document.getElementById("add" + val + "Value").value;
  document.getElementById("add" + val + "Value").value = "";

  if (val === "S") {
    sarray.push(addValue);
  } else if (val === "V") {
    varray.push(addValue);
  } else if (val === "A") {
    aarray.push(addValue);
  } else if (val === "O") {
    oarray.push(addValue);
  } else if (val === "Pp") {
    pparray.push(addValue);
  }

  setColumn();
}

// highlight the random item
function setHighlight(col, row) {
  removeHighlight(col);

  let selItem = document.querySelectorAll("ul")[col].querySelectorAll("li")[
    row
  ];
  selItem.style.backgroundColor = "black";
  selItem.style.color = "white";
}

// remove the highlight
function removeHighlight(col) {
  // remove the highlight on the selected column
  if (col >= 0) {
    let items = document.querySelectorAll("ul")[col].querySelectorAll("li");
    items.forEach((item) => {
      item.style.backgroundColor = "#ffe569";
      item.style.color = "black";
    });
  }
  // remove the highlight on all of the column
  else {
    let columns = document.querySelectorAll("ul");
    columns.forEach((col) => {
      let items = col.querySelectorAll("li");
      items.forEach((item) => {
        item.style.backgroundColor = "#ffe569";
        item.style.color = "black";
      });
    });
  }
}

// print the story in the div
function printStory(textToSpeak) {
  let p = document.createElement("p");
  p.innerText = textToSpeak;
  divP.appendChild(p);
  divP.style.border = "dashed 0.01rem rgb(0, 0, 0)";
}

// clear the story written in the div
function clearStory() {
  divP.innerHTML = "";
  divP.style.border = "none";
}
