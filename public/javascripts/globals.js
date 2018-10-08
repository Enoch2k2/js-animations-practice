
// globals
const canvas = document.getElementById("gameWindow");
const ctx = canvas.getContext('2d');
const animate = window.requestAnimationFrame;
const HEIGHT = 600;
const WIDTH = 800;

const SPACEBAR = 32;
const KEYS = {
    'a': 65
}

// images
var gokuImage = new Image();
gokuImage.src = '../images/goku.gif';