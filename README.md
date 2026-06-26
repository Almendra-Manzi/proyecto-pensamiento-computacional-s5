## examen

## Link de web 

<https://almendra-manzi.github.io/proyecto-pensamiento-computacional-s5/>

### El épico viaje de Odiseo

### Referencia de origen

Proyecto basado en "Epic: the musical" un recuento de la Odisea como obra musical
más informacion: <https://en.wikipedia.org/wiki/Epic:_The_Musical>

### Imagen de referencia
<img width="869" height="770" alt="Captura de pantalla (20)" src="https://github.com/user-attachments/assets/047223ce-7c87-43b3-bc14-930bfa31a508" />


### Integrantes

[Almendra-Manzi](https://github.com/Almendra-Manzi)

### Enlace de p5.js 

<https://editor.p5js.org/SoftBlue_Ali/sketches/GVHJ_b4t1>

### Relato inicial

Odiseo, Rey de Itaca, debe enfrentarse a un montón de obstaculos en el ancho mar para volver a su hogar

### Storyboard

### Estados

Estado 1, pagina de inicio del juego, Estado 2, mecanica del juego, Estado 3, pantalla de game over, Estado 4, pantalla de Victoria

#### Estado 1

En el primer estado, menú

al hacer click, empieza el juego

```js
//mostrar la pantalla de inicio
function mostrarMenu() {
  background(0,0,225);
  textAlign(CENTER);
  textSize(80);
  text("AYUDA A ODISEO", width/2, height/2);

  textSize(20);
  text("Haz clic para comenzar", width/2, 250);
}
```


#### Estado 2

Juego, evitar obstaculos

el objetivo es recorrer 600 millas, la velocidad del juego aumenta con cada obstaculo, si chocas con un obstaculo pierdes.

```js
//código del juego
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
```

#### Estado 3

chocaste con un obstaculo y perdiste

```js
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
```
#### Estado 4

al completar las 600 millas ganaste

```js
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
```
