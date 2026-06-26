let estado = 0; // 0=Menú, 1=Juego, 2=Game Over, 3=Victoria

let carriles;
let carrilJugador = 1;

let carrilObstaculo;
let obstaculoX;

let puntaje = 0;
let velocidad = 5;

let jugadorX;

let fondoX = 0;
let velocidadFondo = 2;

//imagenes
let imgObstaculos = [];
let imgJugador;
let imagenActual;
let imgFondo;

function preload() {

  imgJugador = loadImage("odiseo.png");

  imgObstaculos[0] = loadImage("polifemo.png");
  imgObstaculos[1] = loadImage("tridente.png");
  imgObstaculos[2] = loadImage("circe.png");
  imgObstaculos[3] = loadImage("rayo.png");
  imgObstaculos[4] = loadImage("caribdis.png");

  imgFondo = loadImage("mar1.png")
}
  
function setup() {
  createCanvas(windowWidth, windowHeight);

  let altoCarril = height / 3;

  carriles = [
    altoCarril / 2,
    altoCarril * 1.5,
    altoCarril * 2.5
  ];

  jugadorX = width / 5;

  reiniciar();
}

function draw() {
  background(220);

  if (estado == 0) {
    mostrarMenu();
  }
  else if (estado == 1) {
    jugar();
  }
  else if (estado == 2) {
    mostrarGameOver();
  }
   else if (estado == 3) {
    mostrarVictoria();
  }
}

//mostrar la pantalla de inicio
function mostrarMenu() {
  background(0,0,225);
  textAlign(CENTER);
  textSize(80);
  text("AYUDA A ODISEO", width/2, height/2);

  textSize(20);
  text("Haz clic para comenzar", width/2, 250);
}

//bloque de código del juego
function jugar() {
  
// Fondo en movimiento
imageMode(CORNER);

// Primera copia
image(imgFondo, fondoX, 0, width, height);

// Segunda copia
image(imgFondo, fondoX + width, 0, width, height);

// Mover el fondo
fondoX -= velocidadFondo;

// Cuando la primera imagen desaparece,
// vuelve a empezar
if (fondoX <= -width) {
  fondoX = 0;
}
  
  // Dibujar imágenes desde el centro
  imageMode(CENTER);

  // Jugador
  image(
    imgJugador,
    jugadorX,
    carriles[carrilJugador],
    200,
    200
  );

  // Obstáculo
  image(
    imgObstaculos[imagenActual],
    obstaculoX,
    carriles[carrilObstaculo],
    200,
    200
  );

  // Movimiento del obstáculo
  obstaculoX -= velocidad;

  //Movimiento del fondo
  velocidadFondo = velocidad * 0.3;

  // Puntaje
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Millas: " + puntaje, 20, 30);

  // Cuando el obstáculo sale de la pantalla
  if (obstaculoX < -50) {

    puntaje += 10;

    carrilObstaculo = floor(random(3));
    imagenActual = floor(random(imgObstaculos.length));

    obstaculoX = width + 50;

    velocidad += 0.2;
  }

  // Colisión
  if (
    carrilJugador == carrilObstaculo &&
    obstaculoX > jugadorX - 45 &&
    obstaculoX < jugadorX + 45
  ) {
    estado = 2;
  }

  // Victoria
  if (puntaje >= 600) {
    estado = 3;
  }
}
//mostrar la pantalla de fin del juego
function mostrarGameOver() {

  background(237,33,0);
  
  textAlign(CENTER);

  textSize(60);
  text("¡OH NO!", width/2, height/2);
  
  textSize(30);
  text("Odiseo no logró llegar a casa :(", width/2, height*3/5);

  textSize(25);
  text("Millas recorridas: " + puntaje, width/2, 210);

  textSize(20);
  text("Haz clic para reiniciar", width/2, 280);

}

//mostrar la pantalla de victoria
function mostrarVictoria() {

  background(0,0,255);
  
  textAlign(CENTER);

  textSize(60);
  text("¡LO HICISTE!", width/2, height/2);
  
  textSize(25);
  text("Odiseo finalmente se reunió con su familia", width/2, height*3/5);

  textSize(20);
  text("Haz clic para volver a jugar", width/2, 280);

}

function mousePressed() {

  if (estado == 0) {
    estado = 1;
  }

  else if (estado == 2) {
    reiniciar();
    estado = 1;
  }

  else if (estado == 3) {
  reiniciar();
  estado = 1;
 }
}

function keyPressed() {

  if (estado == 1) {

    if (keyCode === UP_ARROW && carrilJugador > 0) {
      carrilJugador--;
    }

    if (keyCode === DOWN_ARROW && carrilJugador < 2) {
      carrilJugador++;
    }

  }

}

function reiniciar() {

  fondoX = 0;
  
  carrilJugador = 1;

  carrilObstaculo = floor(random(3));
  imagenActual = floor(random(imgObstaculos.length));

  obstaculoX = width + 50;

  puntaje = 0;
  velocidad = 5;

}
