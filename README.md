# Tetris

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Future Improvements](#future-improvements)
4. [Tech Highlights](#tech-highlights)
   <img width="547" alt="Screenshot 2024-04-09 at 3 13 49 PM" src="https://github.com/RachNovo/tetris/assets/44451197/f9a5985c-813a-46f1-a883-3fabedb4f21e">

## Overview

Hello :) This is a custom tetris mock built by me, [RachNovo](https://github.com/RachNovo)!

To play the game, visit https://tetris-cb2dc.web.app/.

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

### Running the Tests _(in progress: details in next section)_

Run the test suite using the following command:

```bash
$ npm test
```

## Future Improvements

- Add the classic Tetris music and animations
- Add start, pause, game over pages
- Add highscore tracking and user authentication
- Although the tests for the game engine are complete, the test suite is currently under construction as I am still working on mocking the HTML Canvas elements

## Tech Highlights

> Details of my thoughts and approach for this project:

#### Game Engine

- <u>Formulas:</u> Tetris, by nature, requires many formulas. I went old school with a drawn out tetris board and created tetriminos (the tetris pieces) out of paper to figure out where the tetris sub-pieces would move when going left, right and down and where they would spawn. I organized these formulas in data structures created with a focus on readability and ease of use within the code.
- <u>Testing:</u> I started this project using Test Driven Development. I made a list of requirements and built my test suite, adding and updating as requirements clarified. I finished with a suite of 75+ tests, significantly reducing debugging time, ensuring reliable and maintainable code.

#### UI

- <u>HTML Canvas:</u> After completing the game engine, I needed a UI! I first built a game board using React but found that the way React updates was not quick enough for gameplay. I chose to use HTML Canvas to draw the pieces. It was a bit of a learning curve and things went wrong in interesting ways 😂 but I figured it out and would love to learn more complex graphic rendering tools in the future!
- <u>Tailwind CSS:</u> I had heard about Tailwind CSS and wanted to take this opportunity to try it out. Tailwind CSS is a utility-first CSS framework that streamlines web development by providing pre-defined utility classes for styling HTML elements. With a focus on simplicity and flexibility, Tailwind CSS enables rapid prototyping and efficient styling without the need for writing custom CSS.

#### Hosting

- <u>Firebase:</u> This project leverages Firebase Hosting for seamless deployment, ensuring fast and reliable access to the game. Additionally, I plan to use Firebase's backend features to store user highscores securely, enabling personalized and interactive experiences.
