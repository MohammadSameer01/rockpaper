let gameNumCount = 1;
let userWinCount = 0;
let computerWinCount = 0;
let userWinCountContainer = document.querySelector(".userWinCount");
let computerWinCountContainer = document.querySelector(".computerWinCount");

let userOptions = document.querySelectorAll(".userOption");

let mainImageContainer = document.querySelectorAll(".mainImageContainer");
let userChoiceImage = document.querySelector(".userSelectedImage");
let computerChoiceImage = document.querySelector(".computerSelectedImage");

let sound1 = new Audio("assets/sound1.mp3");
let sound2 = new Audio("assets/sound2.mp3");

let historyContainer = document.querySelector(".historyContainer");

userOptions.forEach((choice) => {
  choice.addEventListener("click", () => {
    let userChoice = choice.getAttribute("id");
    gameFunc(userChoice);

    mainImageContainer.forEach((image) => {
      image.classList.remove("image-shake");

      void image.offsetWidth;

      image.classList.add("image-shake");
    });

    userChoiceImage.setAttribute("src", "assets/rockImage.png");
    computerChoiceImage.setAttribute("src", "assets/rockImage.png");

    setTimeout(() => {
      userSelectedChoice(userChoice);
    }, 900);

    //
  });
});

userSelectedChoice = (userChoice) => {
  if (userChoice === "Rock") {
    userChoiceImage.setAttribute("src", "assets/rockImage.png");
  } else if (userChoice === "Paper") {
    userChoiceImage.setAttribute("src", "assets/paperImage.png");
  } else {
    userChoiceImage.setAttribute("src", "assets/siccorsImage.png");
  }
};

computerSelectedChoice = (compChoice) => {
  if (compChoice === "Rock") {
    computerChoiceImage.setAttribute("src", "assets/rockImage.png");
    computerChoiceImage.style.transform = "rotateY(180deg)";
  } else if (compChoice === "Paper") {
    computerChoiceImage.setAttribute("src", "assets/paperImage.png");
    computerChoiceImage.style.transform = "rotateY(180deg)";
  } else {
    computerChoiceImage.setAttribute("src", "assets/siccorsImage.png");
    computerChoiceImage.style.transform = "rotateY(180deg)";
  }
};

const computerChoice = () => {
  let choicesArray = ["Rock", "Paper", "Scissors"];
  let choicesArrayIndex = Math.floor(Math.random() * 3);

  return choicesArray[choicesArrayIndex];
};

function gameFunc(userChoice) {
  let compChoice = computerChoice();

  if (userChoice === compChoice) {
    drawGameFunc(userChoice);
  } else {
    let isUserWin = true;
    if (userChoice === "Rock") {
      //scissors ,paper
      isUserWin = compChoice === "Paper" ? false : true;
    } else if (userChoice === "Paper") {
      //scissors ,rock
      isUserWin = compChoice === "Scissors" ? false : true;
    } else {
      //rock,paper
      isUserWin = compChoice === "Rock" ? false : true;
    }
    showWinner(isUserWin, compChoice, userChoice);
    historyUpdation(isUserWin, compChoice, userChoice);
    gameNumCount++;
  }

  setTimeout(() => {
    computerSelectedChoice(compChoice);
    userWinCountContainer.innerText = userWinCount;
    computerWinCountContainer.innerText = computerWinCount;

    historyContainer.style.position = "unset";
    historyContainer.style.transform = "translate(0)";
    historyContainer.style.visibility = "visible";
    historyContainer.style.scale = " 1";
  }, 900);
}

showWinner = (isUserWin, compChoice, userChoice) => {
  setTimeout(() => {
    if (isUserWin) {
      console.log(`Your Choice is = ${userChoice}`);
      console.log(`Computer Choice is = ${compChoice}`);
      console.log(`as ${userChoice} beats ${compChoice} ,You Won`);
      userWinCount++;
      sound1.play();
    } else {
      console.log(`Your Choice is = ${userChoice}`);
      console.log(`Computer Choice is = ${compChoice}`);
      console.log(`as ${compChoice} beats ${userChoice} ,You Lost`);
      computerWinCount++;
      sound2.play();
    }
  }, 900);
};

drawGameFunc = (userChoice) => {
  console.log(
    "Game has been drawn as both user and computer choosed ",
    userChoice
  );
  historyUpdation();
  gameNumCount++;
};

//HISTORY UPDATION CONTAINER
historyUpdation = (isUserWin, compChoice, userChoice) => {
  //Elements creation
  let gameinfoCnt = document.createElement("div");
  let gameCount = document.createElement("div");

  let gameUCchoices = document.createElement("div");
  let gameinfoUserChoice = document.createElement("div"); //userChoice
  let gameinfoComputerChoice = document.createElement("div"); //computerChoice

  let gameWinInfo = document.createElement("div");

  //Assigining Classes to Elements
  gameinfoCnt.setAttribute("class", "gameinfoCnt");
  gameCount.setAttribute("class", "gameCount");
  gameUCchoices.setAttribute("class", "gameUCchoices");
  gameinfoUserChoice.setAttribute("class", "gameinfoUserChoice");
  gameinfoComputerChoice.setAttribute("class", "gameinfoComputerChoice");
  gameWinInfo.setAttribute("class", "gameWinInfo");

  //alignment of  items
  historyContainer.prepend(gameinfoCnt);
  gameinfoCnt.append(gameCount);
  gameinfoCnt.append(gameUCchoices);
  gameUCchoices.append(gameinfoUserChoice);
  gameUCchoices.append(gameinfoComputerChoice);
  gameinfoCnt.append(gameWinInfo);

  //adding innerText
  gameinfoUserChoice.innerText = userChoice;

  gameCount.innerText = gameNumCount;
  setTimeout(() => {
    if (isUserWin) {
      gameWinInfo.innerText = "Won";
      gameWinInfo.style.background = "green";
    } else if (isUserWin === false) {
      gameWinInfo.innerText = "Lost";
      gameWinInfo.style.background = "red";
    } else {
      gameWinInfo.innerText = "DRAW";
      gameWinInfo.style.background = "#222";
      gameWinInfo.style.color = "#fff";
      gameUCchoices.innerHTML = `Both Choosed Same`;
    }

    gameinfoComputerChoice.innerText = compChoice;
  }, 900);
};
