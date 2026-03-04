export class TicTacToe {
    /* X Player Name */
    public playerX: string;
    /* O Player Name */
    public playerO: string; // Changed playerY to playerO for clarity

    // Game state properties
    private _board: number[]; // 0 for empty, 1 for X, -1 for O
    private _currentTurn: boolean; // true for X, false for O
    private _turns: number;
    public winner: string | null;
    public isGameOver: boolean;

    constructor(playerX: string, playerO: string) {
        this.playerX = playerX;
        this.playerO = playerO;
        
        // Initialize game state
        this._board = Array(9).fill(0);
        this._currentTurn = true; // X starts
        this._turns = 0;
        this.winner = null;
        this.isGameOver = false;
    }

    /**
     * Returns the current board state as a flat array.
     * 0 = empty, 1 = X, -1 = O
     */
    get board(): number[] {
        return this._board;
    }

    /**
     * Returns the name of the current player.
     */
    get currentPlayer(): string {
        return this._currentTurn ? this.playerX : this.playerO;
    }

    /**
     * Makes a move on the board. Can be called with a single index (0-8)
     * or with x, y coordinates (0-2).
     * @param player The name of the player making the move.
     * @param indexOrX The board index (0-8) or the x-coordinate (0-2).
     * @param y The y-coordinate (0-2), if using coordinate-based move.
     * @returns boolean - True if the move was successful, false otherwise.
     */
    public turn(player: string, indexOrX: number, y?: number): boolean {
        if (this.isGameOver || player !== this.currentPlayer) {
            return false;
        }

        let index: number;
        // Handle both (index) and (x, y) overloads
        if (y !== undefined) {
            const x = indexOrX;
            if (x < 0 || x > 2 || y < 0 || y > 2) return false;
            index = y * 3 + x;
        } else {
            index = indexOrX;
        }

        if (index < 0 || index > 8 || this._board[index] !== 0) {
            return false; // Invalid index or cell not empty
        }

        // Place the piece
        this._board[index] = this._currentTurn ? 1 : -1;
        this._turns++;

        // Check for a winner
        if (this.checkWin()) {
            this.winner = this.currentPlayer;
            this.isGameOver = true;
        } else if (this._turns === 9) {
            // It's a draw
            this.isGameOver = true;
        } else {
            // Switch turns
            this._currentTurn = !this._currentTurn;
        }

        return true;
    }

    /**
     * Checks if the current player has won the game.
     * @returns boolean - True if there is a winner.
     */
    private checkWin(): boolean {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        const playerValue = this._currentTurn ? 1 : -1;

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this._board[a] === playerValue && this._board[b] === playerValue && this._board[c] === playerValue) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Resets the game to its initial state.
     */
    public reset(): void {
        this._board = Array(9).fill(0);
        this._currentTurn = true; // X starts
        this._turns = 0;
        this.winner = null;
        this.isGameOver = false;
    }
}
