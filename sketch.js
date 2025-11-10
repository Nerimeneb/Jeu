let hearts = [];
let score = 0;
let target = 10;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight); // plein écran
  textAlign(CENTER, CENTER);
  textSize(width / 20);
}

function draw() {
  background(255, 200, 220);

  if (gameOver) {
    fill(255, 50, 100);
    textSize(width / 10);
    text("💖 Tu as gagné mon cœur ! 💖", width / 2, height / 2 - height / 10);
    
    fill(255, 80, 120);
    textSize(width / 9);
    text("Je t’aime Step Friend 💘", width / 2, height / 2 + 10);
    
    fill(255, 0, 100);
    textSize(width / 20);
    text("Score final : " + score, width / 2, height / 2 + height / 10);
    noLoop();
    return;
  }

  // Crée des cœurs aléatoires
  if (random() < 0.03) {
    hearts.push({ x: random(20, width - 20), y: 0 });
  }

  // Dessine et déplace les cœurs
  fill(255, 100, 150);
  for (let h of hearts) {
    heart(h.x, h.y, width / 20);
    h.y += height / 200;
  }

  // Supprime les cœurs sortis de l’écran
  hearts = hearts.filter(h => h.y < height + 20);

  // Score
  fill(255, 0, 100);
  textSize(width / 25);
  text("Score : " + score, width / 2, height / 15);

  if (score >= target) gameOver = true;
}

function mousePressed() {
  for (let i = hearts.length - 1; i >= 0; i--) {
    let h = hearts[i];
    if (dist(mouseX, mouseY, h.x, h.y) < width / 20) {
      hearts.splice(i, 1);
      score++;
    }
  }
}

function heart(x, y, s) {
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.1) {
    let xh = x + 16 * pow(sin(t), 3) * s / 16;
    let yh = y - (13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) * s / 16;
    vertex(xh, yh);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
