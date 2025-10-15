const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nivelDisplay = document.getElementById('nivel');
const sonido = document.getElementById('sonidoFondo');



let nivelActual = 1;
let animacion = 0;
let juegoTerminado = false;

let jugador = {
  x: 200,
  y: 100,
  ancho: 20,
  alto: 20
};

let velocidad = 5;

let teclas = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
};

document.addEventListener('keydown', (e) => {
  if (e.key in teclas) {
    teclas[e.key] = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key in teclas) {
    teclas[e.key] = false;
  }
});

function dibujarFondo() {
  animacion += 1;
  
  if (nivelActual === 1) {
    // Fondo nivel 1
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(i + (animacion % 40), 0, 20, canvas.height);
    }
  } else {
    // Fondo nivel 2
    ctx.fillStyle = '#FFB6C1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(0, i + (animacion % 40), canvas.width, 20);
    }
  }
}

function dibujarTextoMeta() {
  ctx.save();
  ctx.translate(canvas.width - 50, canvas.height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  
  if (nivelActual === 1) {
    ctx.strokeText('PASA AL NIVEL 2', 0, 0);
    ctx.fillText('PASA AL NIVEL 2', 0, 0);
  } else {
    ctx.strokeText('META FINAL', 0, 0);
    ctx.fillText('META FINAL', 0, 0);
  }
  
  ctx.restore();
}

function actualizarJugador() {
  if (juegoTerminado) return;
  
  if (teclas.ArrowLeft) jugador.x -= velocidad;
  if (teclas.ArrowRight) jugador.x += velocidad;
  if (teclas.ArrowUp) jugador.y -= velocidad;
  if (teclas.ArrowDown) jugador.y += velocidad;
  
  // Limites
  if (jugador.x < 0) jugador.x = 0;
  if (jugador.y < 0) jugador.y = 0;
  if (jugador.y > canvas.height - jugador.alto) jugador.y = canvas.height - jugador.alto;
  
  // Cambiar de nivel al llegar al lado derecho
  if (jugador.x >= canvas.width - jugador.ancho) {
    if (nivelActual === 1) {
      nivelActual = 2;
      nivelDisplay.textContent = '2';
      nivelDisplay.style.color = '#FF5252';
      jugador.x = 0;
    } else {
      // Nivel 2 completado
      juegoTerminado = true;
    }
  }
}

function dibujar() {
  dibujarFondo();
  
  if (!juegoTerminado) {
    actualizarJugador();
    dibujarTextoMeta();
    
    // Dibujar jugador
    ctx.fillStyle = nivelActual === 1 ? 'green' : 'red';
    ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);
  } else {
    // Mostrar mensaje GANASTE
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.strokeText('¡GANASTE!', canvas.width / 2, canvas.height / 2);
    ctx.fillText('¡GANASTE!', canvas.width / 2, canvas.height / 2);
  }
  
  requestAnimationFrame(dibujar);
}

dibujar();