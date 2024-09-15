import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JuegoService {
  // Puntaje
  score = { x: 0, o: 0 };

  constructor() { }

  // Registrar el ganador
  registerWinner(winner: 'X' | 'O'): void {
    if (winner === 'X') {
      this.score.x++;
    } else {
      this.score.o++;
    }
    this.saveScore(); // Guardar puntaje en localStorage
  }

  // Guardar el puntaje en localStorage
  saveScore(): void {
    localStorage.setItem('ticTacToeScore', JSON.stringify(this.score));
  }

  // Cargar el puntaje desde localStorage
  loadScores(): void {
    const savedScore = localStorage.getItem('ticTacToeScore');
    if (savedScore) {
      this.score = JSON.parse(savedScore);
    }
  }

  // Resetear el puntaje
  resetScore(): void {
    this.score = { x: 0, o: 0 };
    this.saveScore();
  }
}
