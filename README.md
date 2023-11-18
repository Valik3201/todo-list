# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [What's Done](#whats-done)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [SCSS Theme Handling](#SCSS-theme-handling)
  - [Firebase Integration](#firebase-integration)
  - [Webpack](#webpack)
  - [Drakuja.js](#drakuja.js)
  - [Deployment](#deployment)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### What's Done

- Responsive design for optimal viewing on various screen sizes 📱💻
- Interactive hover states for all elements 🖱️
- Addition of new todos to the list ✅
- Marking todos as complete ✔️
- Deletion of todos from the list ❌
- Filtering by all/active/complete todos 🗂️
- Clearing all completed todos 🧹
- Toggle between light and dark mode 🌞🌚
- **Bonus**: Drag and drop to reorder items on the list 🔄

## Screenshot

![](./screenshot.jpg)

## Links

- Solution URL: [Add solution URL here](https://github.com/Valik3201/todo-list)
- Live Site URL: [Add live site URL here](https://valik3201.github.io/todo-list/)

## My Process

### Built With

- SCSS for enhanced styling 🎨
- Firebase for seamless data management 🔥
- Webpack for efficient bundling and optimization ⚙️
- `Drakula.js` for drag-and-drop functionality in managing todos 🌓

### SCSS Theme Handling

In SCSS, I employed the following mixin and function to handle themes:

```scss
// Mixin for handling themes
@mixin themify($themes) {
  @each $name, $values in $themes {
    .#{$name}-theme {
      $theme-map: $values !global;
      @content;
    }
  }
}

// Function to get themed values
@function themed($key) {
  @return map-get($theme-map, $key);
}
```

This SCSS code provides a flexible theming system, allowing easy adjustment of styles based on the selected theme.

### Firebase Integration

From version 9 and higher, the Firebase JavaScript SDK is optimized to work with bundlers like Webpack. Firebase code is efficiently bundled with the application-specific code, reducing the final build size.

In `public/index.html`, near the bottom of the body tag, the following code loads `bundle.js`:

```html
<script src="bundle.js"></script>
```

This placement ensures that everything else in `index.html` becomes visible first, and then the potentially longer `bundle.js` load process begins.

With this setup, the Firebase initialization code in `index.js` becomes operational:

```javascript
// Firebase initialization
import { initializeApp } from 'firebase/app';

// Your Firebase config object here
const firebaseConfig = {
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### Webpack 

Webpack serves as the modular bundler for Firebase integration. It optimizes the code, handles assets, and ensures a streamlined build process.

### Drakula.js 

Enhance user experience with the power of drag-and-drop using Drakula.js. Drakula.js has been seamlessly integrated into the project to provide an intuitive and visually appealing way to organize todos.

The simplicity of Drakula.js enables smooth drag-and-drop interactions. Users can effortlessly grab a todo item, drag it to the desired position, and drop it with ease. Whether tasks need prioritization or todos require rearrangement, Drakula.js ensures a delightful and responsive experience.

```javascript
import dragula from "dragula";

// Drakula.js is initialized on the todo-items container
const drake = dragula([document.querySelector(".todo-items")]);
```

Now, todo management is not only functional but also a pleasure, thanks to the elegant integration of Drakula.js.

### Deployment

The live demo is hosted on GitHub Pages. The `gh-pages` branch is used for deployment, and the live site can be accessed [here](https://valik3201.github.io/todo-list/).

## Useful Resources

1. [Figma](https://www.figma.com/) - An indispensable tool for design, serving as the foundation for translating visual concepts into functional code. Figma's collaborative interface design platform facilitated a seamless integration between the design and development phases of the project. 🎨

2. [Firebase Documentation](https://firebase.google.com/docs) - A comprehensive and well-structured resource that played a pivotal role in mastering and implementing Firebase functionalities. The documentation not only provided clear instructions but also served as an educational guide for optimizing Firebase features in the project. 🔥

3. [Stack Overflow](https://stackoverflow.com/) - A vibrant community where coding challenges turn into learning opportunities. Stack Overflow was an invaluable resource for troubleshooting, problem-solving, and gaining insights into best practices. The diverse range of questions and answers provided practical solutions to intricate coding issues. 🚑💻

## Author

- GitHub - [Valik3201](https://github.com/Valik3201)
- Frontend Mentor - [@Valik3201](https://www.frontendmentor.io/profile/Valik3201)
- LinkedIn - [Valentyn Chernetskyi](https://www.linkedin.com/in/valentynchernetskyi/)


Feel free to explore the code and provide feedback!
