// Seleccionamos el canvas del HTML y obtenemos su contexto de renderizado 2D
const canvas = document.getElementById('laberintoCanvas');
const ctx = canvas.getContext('2d');

// Objeto que representa al jugador
const player = {
  x: 13, // Posición inicial en el eje X
  y: 13, // Posición inicial en el eje Y
  size: 10, // Tamaño del jugador (cuadrado)
  color: 'blue', // Color del jugador
  speed: 2, // Velocidad de movimiento del jugador
  dx: 0, // Cambio en la posición X (dirección horizontal)
  dy: 0  // Cambio en la posición Y (dirección vertical)
};

// Array de objetos que representan las paredes del laberinto 

const walls = [
  // Paredes externas
  { x: 0, y: 0, width: 600, height: 10 }, // Pared superior
  { x: 0, y: 0, width: 10, height: 400 }, // Pared izquierda
  { x: 0, y: 390, width: 600, height: 10 }, // Pared inferior
  { x: 590, y: 0, width: 10, height: 400 }, // Pared derecha
  // Barreras internas del laberinto
   { x: 40, y: 40, width: 10, height: 330 },
  { x: 100, y: 200, width: 150, height: 10 },
  { x: 200, y: 250, width: 10, height: 100 },
  { x: 50, y: 300, width: 100, height: 10 },
  { x: 300, y: 50, width: 10, height: 200 },
  { x: 250, y: 150, width: 100, height: 10 },
  { x: 400, y: 50, width: 10, height: 300 },
  { x: 350, y: 100, width: 100, height: 10 },
  { x: 150, y: 350, width: 10, height: 50 },
  { x: 450, y: 200, width: 50, height: 10 },
  { x: 500, y: 250, width: 10, height: 60 },
  { x: 400, y: 350, width: 100, height: 10 },
  { x: 150, y: 200, width: 10, height: 130 },
  { x: 200, y: 100, width: 10, height: 100 },
  { x: 350, y: 250, width: 10, height: 100 },
  { x: 500, y: 50, width: 10, height: 120 },
  { x: 450, y: 300, width: 100, height: 10 },
  { x: 300, y: 200, width: 150, height: 10 },
  { x: 50, y: 150, width: 100, height: 10 },
  { x: 200, y: 300, width: 10, height: 100 },
  { x: 70, y: 330, width: 10, height:60},
  { x: 70, y: 330, width: 60, height:10},
  { x: 120, y: 330, width: 10, height:30},
  { x: 120, y: 360, width: 40, height:10},
  { x: 120, y: 235, width: 10, height:40},
  { x: 75, y: 200, width: 10, height:80},
  { x: 80, y: 250, width: 40, height:10},
  { x: 80, y: 0, width: 10, height:60},
  { x: 80, y: 60, width: 40, height:10},
  { x: 120, y:60, width: 10, height:50},
  { x: 120, y: 100, width: 90, height:10},
  { x: 75, y: 110, width: 40, height:10},
  { x: 150, y: 130, width: 10, height:50},
  { x: 200, y: 300, width: 100, height:10},
  { x: 230, y: 310, width: 10, height:60},
  { x: 260, y: 340, width: 100, height:10},
  { x: 300, y: 340, width: 10, height:60},
  { x: 250, y: 200, width: 10, height:60},
  { x: 300, y: 250, width: 100, height:10},
  { x: 400, y: 40, width: 110, height:10},
  { x: 440, y: 70, width: 10, height:70},
  { x: 450, y: 160, width: 60, height:10},
  { x: 540, y: 30, width: 10, height:280},
  { x: 540, y: 250, width: 50, height:10},
  { x: 440, y: 210, width: 10, height:60},
  { x: 230, y: 0, width: 10, height:90},
  { x: 140, y: 40, width: 100, height:10},
  { x: 340, y: 0, width: 10, height:60},
  
];

// Objeto que representa la salida del laberinto
const exit = {
  x: 570, // Posición X de la salida
  y: 370, // Posición Y de la salida
  size: 20, // Tamaño del área de salida
  color: 'green' // Color de la salida
};

// Indicador de si el juego ha terminado
let gameOver = false;

// Función para dibujar al jugador
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Función para dibujar todas las paredes del laberinto
function drawWalls() {
  ctx.fillStyle = 'black'; // Color de las paredes
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
}

// Función para dibujar la salida del laberinto
function drawExit() {
  ctx.fillStyle = exit.color;
  ctx.fillRect(exit.x, exit.y, exit.size, exit.size);
}

// Función para mover al jugador basado en su velocidad
function movePlayer() {
  player.x += player.dx; // Actualiza posición X
  player.y += player.dy; // Actualiza posición Y

  // Evita que el jugador salga del canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
  if (player.y < 0) player.y = 0;
  if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;
}

// Función para verificar colisiones con paredes
function checkCollision() {
  walls.forEach(wall => {
    if (
      player.x < wall.x + wall.width &&
      player.x + player.size > wall.x &&
      player.y < wall.y + wall.height &&
      player.y + player.size > wall.y
    ) {
      // Si hay colisión, el jugador vuelve a la posición inicial
      player.x = 13;
      player.y = 13;
    }
  });
}

// Función para verificar si el jugador ha alcanzado la salida
function checkWin() {
  if (
    player.x < exit.x + exit.size &&
    player.x + player.size > exit.x &&
    player.y < exit.y + exit.size &&
    player.y + player.size > exit.y
  ) {
    document.getElementById('mensaje').textContent = '¡Ganaste! Encontraste la salida 🎉';
    gameOver = true; // El juego termina
  }
}

// Función para manejar la presión de teclas para mover al jugador
function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'd') player.dx = player.speed; // Mover derecha
  if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -player.speed; // Mover izquierda
  if (e.key === 'ArrowUp' || e.key === 'w') player.dy = -player.speed; // Mover arriba
  if (e.key === 'ArrowDown' || e.key === 's') player.dy = player.speed; // Mover abajo
}

// Función para detener el movimiento cuando se sueltan las teclas
function keyUp(e) {
  if (['ArrowRight', 'ArrowLeft', 'd', 'a'].includes(e.key)) player.dx = 0;
  if (['ArrowUp', 'ArrowDown', 'w', 's'].includes(e.key)) player.dy = 0
}

// Función principal de actualización del juego
function update() {
  if (!gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    drawWalls();
    drawExit();
    drawPlayer();
    movePlayer();
    checkCollision();
    checkWin();
    requestAnimationFrame(update); // Llamada recursiva para actualizar el juego
  }
}

// Inicializar eventos de teclado y empezar el juego
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
update(); // Iniciar el bucle del juego




/* ahora lo que se va a proceder hacer es: 
 crear mas niveles aumentando la complejidad del laberinto
 implementar un sistema de puntuación o un limite de intentos
 deben agregar un boton de comenzar 

 */