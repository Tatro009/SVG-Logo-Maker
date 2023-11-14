const fs = require("fs");
const inquirer = require("inquirer");
const { Triangle, Circle, Square } = require("./lib/shapes");

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters for the text:",
    },
    {
      type: "input",
      name: "textColor",
      message: "Enter preferred text color (keyword or hex value):",
    },
    {
      type: "list",
      name: "shape",
      message: "Select a shape:",
      choices: ["Circle", "Triangle", "Square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Enter preferred shape color (keyword or hex value):",
    },
  ]);

  return userInput;
}

function saveSVG(content) {
  fs.writeFileSync("./examples/am.svg", content);
  console.log("Generated logo2.svg");
}

async function run() {
  const userInput = await getUserInput();
  let shape;

  switch (userInput.shape) {
    case "Circle":
      shape = new Circle();
      break;
    case "Triangle":
      shape = new Triangle();
      break;
    case "Square":
      shape = new Square();
      break;
    default:
      console.error("Invalid shape");
      return;
  }

  shape.setColor(userInput.shapeColor);

  const textElement = `<text x="150" y="122" font-size="60" fill="${userInput.textColor}" text-anchor="middle">${userInput.text}</text>`;

  const svgContent = `<svg width="300" height="200">${shape.render()}${textElement}</svg>`;
  saveSVG(svgContent);
}

run();

