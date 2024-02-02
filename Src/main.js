import "../Styles/modern-normalize.css";
import "../Styles/style.css";
import "../Styles/utils.css";
import "../Styles/Component/navbar.css";
import "../Styles/Component/box.css";

import darkMode from "./Utils/dark-mode";
darkMode();

document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("snakeBox");

  const gridSizeX = 50;
  const gridSizeY = 30;

  const initialSnakePosition = [
    Math.floor(gridSizeY / 2),
    Math.floor(gridSizeX / 2),
  ];
  const initialFoodPosition = getRandomPosition();

  const scoreLabel = document.querySelector(".score__label");
  const sizeLabel = document.querySelector(".size__label");

  const init = function () {
    scoreLabel.textContent = 0;
    sizeLabel.textContent = 1;
  };

  init();

  let snake = [initialSnakePosition];
  let direction = "right";
  let foodPosition = initialFoodPosition;
  let isGameOver = false;
  let isPaused = false;
  let intervalId;

  // Create grid
  for (let i = 0; i < gridSizeY; i++) {
    for (let j = 0; j < gridSizeX; j++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
    }
  }

  // Initial snake position
  updateSnake();

  // Initial food position
  updateFood();

  // Listen for key presses
  document.addEventListener("keydown", handleKeyPress);

  // Listen for button click
  const repeatBtn = document.querySelector(".repeat__btn");
  const pauseContainer = document.querySelector(".pause");
  const resumeContainer = document.querySelector(".resume");

  if (repeatBtn) {
    repeatBtn.addEventListener("click", resetGame);
  }

  if (pauseContainer) {
    pauseContainer.addEventListener("click", pauseGame);
  }

  if (resumeContainer) {
    resumeContainer.addEventListener("click", resumeGame);
  }

  // Game loop
  intervalId = setInterval(gameLoop, 200);

  function handleKeyPress(event) {
    if (!isGameOver && !isPaused) {
      switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
          direction = "up";
          break;
        case "arrowdown":
        case "s":
          direction = "down";
          break;
        case "arrowleft":
        case "a":
          direction = "left";
          break;
        case "arrowright":
        case "d":
          direction = "right";
          break;
      }
    }
  }

  function gameLoop() {
    if (!isGameOver && !isPaused) {
      moveSnake();
      checkCollision();
      checkFoodCollision();
      updateSnake();
    }
  }

  function moveSnake() {
    const head = [...snake[0]];
    switch (direction) {
      case "up":
        head[0] = (head[0] - 1 + gridSizeY) % gridSizeY;
        break;
      case "down":
        head[0] = (head[0] + 1) % gridSizeY;
        break;
      case "left":
        head[1] = (head[1] - 1 + gridSizeX) % gridSizeX;
        break;
      case "right":
        head[1] = (head[1] + 1) % gridSizeX;
        break;
    }
    snake.unshift(head);
    if (!checkFoodCollision()) {
      snake.pop();
    }
  }

  function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        showGameOverAlert();
        break;
      }
    }
  }

  function checkFoodCollision() {
    const head = snake[0];
    if (head[0] === foodPosition[0] && head[1] === foodPosition[1]) {
      snake.push([]);
      updateFood();
      scoreLabel.textContent = Number(scoreLabel.textContent) + 10;
      sizeLabel.textContent = Number(sizeLabel.textContent) + 2;
      return true;
    }
    return false;
  }

  function updateSnake() {
    const gridItems = document.getElementsByClassName("grid-item");
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].classList.remove("snake");
    }
    for (let i = 0; i < snake.length; i++) {
      const index = snake[i][0] * gridSizeX + snake[i][1];
      if (gridItems[index]) {
        gridItems[index].classList.add("snake");
      }
    }
  }

  function updateFood() {
    const gridItems = document.getElementsByClassName("grid-item");
    const index = foodPosition[0] * gridSizeX + foodPosition[1];
    if (gridItems[index]) {
      gridItems[index].classList.remove("food");
    }
    foodPosition = getRandomPosition();
    const foodIndex = foodPosition[0] * gridSizeX + foodPosition[1];
    if (gridItems[foodIndex]) {
      gridItems[foodIndex].classList.add("food");
    }
  }

  function showGameOverAlert() {
    isGameOver = true;
    alert("Game Over!");
  }

  function resetGame() {
    isGameOver = false;
    snake = [initialSnakePosition];
    direction = "right";

    const gridItems = document.getElementsByClassName("grid-item");
    const previousFoodIndex = foodPosition[0] * gridSizeX + foodPosition[1];
    if (gridItems[previousFoodIndex]) {
      gridItems[previousFoodIndex].classList.remove("food");
    }

    foodPosition = getRandomPosition();
    updateSnake();
    updateFood();
    init();
  }

  function getRandomPosition() {
    return [
      Math.floor(Math.random() * gridSizeY),
      Math.floor(Math.random() * gridSizeX),
    ];
  }

  function pauseGame() {
    isPaused = true;
    clearInterval(intervalId);
    pauseContainer.classList.add("hidden");
    resumeContainer.classList.remove("hidden");
  }

  function resumeGame() {
    isPaused = false;
    intervalId = setInterval(gameLoop, 200);
    resumeContainer.classList.add("hidden");
    pauseContainer.classList.remove("hidden");
  }
});
