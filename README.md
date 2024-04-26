# Block Fall

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Tech Highlights](#tech-highlights)

<img width="557" alt="Screenshot 2024-04-26 at 10 19 26 AM" src="https://github.com/RachNovo/tetris/assets/44451197/d6fa7ccb-4734-40c9-b3cb-a0d3ce3c8f88">

## Overview

Hello :) This is a custom tetris mock built by me, [RachNovo](https://github.com/RachNovo)!

To play the game, visit https://tetris-cb2dc.web.app/.

### Built With

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Firebase](https://firebase.google.com/)
- [Mocha/Chai.js](https://mochajs.org/)
- [Prettier](https://prettier.io/docs/en/)

## Getting Started

> Follow these steps to install and run this application on your local machine.

_Prerequisites:_ Git, Node.js, npm

### Installing and Set-up

1. Navigate to the local directory where you want to host the application.

2. Access the application by cloning the Github repository:

```bash
$ git clone https://github.com/RachNovo/tetris.git
```

3. Navigate inside the directory: 'tetris' and run:

```bash
$ npm install
```

4. Start the application by running:

```bash
$ npm start
```

### Running the Tests

Run the test suite using the following command:

```bash
$ npm test
```

<img width="819" alt="Screenshot 2024-04-26 at 10 21 51 AM" src="https://github.com/RachNovo/tetris/assets/44451197/ad03c993-4c9c-4372-ac15-4bab2714805c">

<img width="915" alt="Screenshot 2024-04-26 at 10 22 06 AM" src="https://github.com/RachNovo/tetris/assets/44451197/2563bfc6-622d-4e64-ba1c-a5a798c18e83">


## Tech Highlights

> Details of my thoughts and approach for this project:

#### Game Engine

- <u>Formulas:</u> Tetris, by nature, requires many formulas. I went old school with a pencil and paper, drew out the tetris board and created little tetriminos (the tetris pieces) out of paper to figure out where the tetris sub-pieces would move when going left, right and down and where they would spawn. I organized these formulas in data structures created with a focus on readability and ease of use within the code.
- <u>Testing:</u> I started this project using Test Driven Development. I made a list of requirements and built my test suite, adding and updating as requirements clarified. I finished with a suite of 74 tests, significantly reducing debugging time, ensuring reliable and maintainable code.

#### UI

- <u>HTML Canvas:</u> After completing the game engine, I needed a UI! I first built a game board using React but found that the way React updates was not quick enough for gameplay. I chose to use HTML Canvas to draw the pieces. It was a bit of a learning curve and things went wrong in interesting ways 😂 For example, the board is 101px wide to make sure the piece outlines are not cut off on one side or the other. I would love to learn more complex graphic rendering tools in the future!
- <u>Tailwind CSS:</u> I had heard about Tailwind CSS and wanted to take this opportunity to try it out. Tailwind CSS is a utility-first CSS framework that streamlines web development by providing pre-defined utility classes for styling HTML elements. With a focus on simplicity and flexibility, Tailwind CSS enables rapid prototyping and efficient styling without the need for writing custom CSS. I used the tailwind css prettier plugin to keep my classNames in order.
- <u>Audio:</u> I used the built in HTML Audio Element for my audio and added controls for playing, pausing and adjusting the volume! There are three royalty free versions of the classic tetris theme song to choose from: piano, strings or cossack!

#### Hosting

- <u>Firebase:</u> This project leverages Firebase Hosting for seamless deployment, ensuring fast and reliable access to the game.
