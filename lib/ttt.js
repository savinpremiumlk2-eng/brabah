export default class TicTacToe {
    constructor(playerX = "x", playerO = "o") {
        this.playerX = playerX;
        this.playerO = playerO;
        this._currentTurn = false; // false for X, true for O
        this._x = 0; // Bitmask for X's positions
        this._o = 0; // Bitmask for O's positions
        this.turns = 0;
    }

    get board() {
        return this._x | this._o;
    }

    get currentTurn() {
        return this._currentTurn ? this.playerO : this.playerX;
    }

    get enemyTurn() {
        return this._currentTurn ? this.playerX : this.playerO;
    }

    static check(state) {
        // Winning combinations as bitmasks
        const winCombos = [7, 56, 73, 84, 146, 273, 292, 448];
        for (let combo of winCombos) {
            if ((state & combo) === combo) return true;
        }
        return false;
    }

    /**
     * Converts board coordinates (0-2) to a binary bitmask.
     * @example
     * TicTacToe.toBinary(1, 2) // returns 256 (which is 1 << 8 or 0b100000000)
     */
    static toBinary(x = 0, y = 0) {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error("Invalid position");
        return 1 << (x + 3 * y);
    }

    /**
     * Processes a player's turn.
     * @param {number} player - `0` for X, `1` for O.
     * @param {number} x - The x-coordinate (0-2) or the cell index (0-8).
     * @param {number} [y] - The y-coordinate (0-2). If omitted, x is treated as the cell index.
     * @returns {number} - Status code:
     * - `-3`: Game Ended (Draw)
     * - `-2`: Not player's turn
     * - `-1`: Invalid Position
     * - ` 0`: Position Occupied
     * - ` 1`: Success
     */
    turn(player = 0, x = 0, y) {
        if (this.board === 511 || this.winner) return -3; // 511 (0b111111111) means board is full

        let pos = 0;
        if (y === undefined) {
            if (x < 0 || x > 8) return -1; // Invalid index
            pos = 1 << x;
        } else {
            if (x < 0 || x > 2 || y < 0 || y > 2) return -1; // Invalid coordinates
            pos = TicTacToe.toBinary(x, y);
        }

        if (Boolean(this._currentTurn) !== Boolean(player)) return -2; // Not this player's turn
        if (this.board & pos) return 0; // Position is already occupied

        if (this._currentTurn) { // O's turn
            this._o |= pos;
        } else { // X's turn
            this._x |= pos;
        }

        this._currentTurn = !this._currentTurn;
        this.turns++;
        return 1;
    }

    /**
     * Renders the board state into a human-readable array.
     * @param {number} boardX - The bitmask for X's positions.
     * @param {number} boardO - The bitmask for O's positions.
     * @returns {Array<('X'|'O'|number)>}
     */
    static render(boardX = 0, boardO = 0) {
        const board = [];
        for (let i = 0; i < 9; i++) {
            const pos = 1 << i;
            if (boardX & pos) {
                board.push('X');
            } else if (boardO & pos) {
                board.push('O');
            } else {
                board.push(i + 1);
            }
        }
        return board;
    }

    /**
     * Renders the current instance's board state.
     * @returns {Array<('X'|'O'|number)>}
     */
    render() {
        return TicTacToe.render(this._x, this._o);
    }

    get winner() {
        const xWon = TicTacToe.check(this._x);
        const oWon = TicTacToe.check(this._o);
        return xWon ? this.playerX : oWon ? this.playerO : null;
    }
}
