let hearts = [];
let score = 0;
let target = 10;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(width / 20);
}

function draw() {
  background(255, 200, 220); // fond rose

  if (gameOver) {
    // 🌸 Cœurs décoratifs dans le fond
    noStroke();
    for (let i = 0; i < 50; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(width / 50, width / 15);
      fill(255, 100 + random(50), 150 + random(50), 50 + random(50)); // semi-transparents
      heart(x, y, size);
    }

    // 💬 Messages de fin
    fill(255, 50, 100);
    textSize(width / 16);
    text("Tu as gagné mon cœur 🙃🫠", width / 2, height / 2 - height / 20);
    
    fill(255, 50, 100);
    textSize(width / 16);
    text("Je t’aime Step Friend 🫶💗", width / 2, height / 2 + height / 15);

    noLoop();
    return;
  }

  // Cœurs qui tombent
  if (random() < 0.03) {
    hearts.push({ x: random(20, width - 20), y: 0 });
  }

  // Cœurs "vitrés" tombants
  for (let h of hearts) {
    fill(255, 100, 150, 120); // semi-transparent
    stroke(255, 150);
    strokeWeight(2);
    heart(h.x, h.y, width / 20);
    h.y += height / 200;
  }

  hearts = hearts.filter(h => h.y < height + 20);

  // Score en haut
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
