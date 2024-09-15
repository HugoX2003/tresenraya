import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})

export class TableroComponent implements OnInit {
  // Estado del tablero
  board: ('X' | 'O' | null)[] = Array(9).fill(null);
  // Jugador actual
  currentPlayer: 'X' | 'O' = 'X';
  // Ganador
  winner: 'X' | 'O' | null = null;

  // Puntaje
  score = { x: 0, o: 0 };

  ngOnInit(): void {
    this.loadScores();
  }

  // Manejar clic en una celda
  handleCellClick(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.winner = this.checkWinner();
      if (this.winner) {
        this.updateScore(this.winner);
      } else {
        this.switchPlayer();
      }
    }
  }

  // Cambiar jugador
  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // Verificar ganador
  checkWinner(): 'X' | 'O' | null {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return this.board[a];
      }
    }

    return null;
  }

  // Reiniciar el juego
  resetGame(): void {
    this.board = Array(9).fill(null);
    this.winner = null;
    this.currentPlayer = 'X';
  }

  // Reiniciar el puntaje
  resetScore(): void {
    this.score = { x: 0, o: 0 };
    this.saveScore();
    this.resetGame();
  }

  // Actualizar puntaje
  updateScore(winner: 'X' | 'O'): void {
    if (winner === 'X') {
      this.score.x++;
    } else if (winner === 'O') {
      this.score.o++;
    }
    this.saveScore();
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
}
