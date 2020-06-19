class TicTacToe {
    constructor() {
        //state will be an object
        //to keep track of difference pieces of state
        //eg which player, which box is occupied
        this.state = {
            board: [
                "", "", "",
                "", "", "",
                "", "", ""
            ],
            isXTurn: true,
            boardElement: document.querySelector(".wrapper")
        }

        this.initalizeBoard()
        this.render()
    }

    //draw out the board
    initalizeBoard() {
        for (let i = 0; i < this.state.board.length; i++) {
            const squareElement = document.createElement("div")
            squareElement.className = "box"
            squareElement.id = i
            this.state.boardElement.appendChild(squareElement)

            squareElement.addEventListener("click", (e) => this.handleBoxClick(e))
        }
    }
    handleBoxClick(e) {
        let boxIndex = parseInt(e.target.id)
        if (!this.state.board[boxIndex]) {
            this.state.board[boxIndex] = this.state.isXTurn ? "X" : "O"
            this.state.isXTurn = !this.state.isXTurn
        }
        this.render()
    }

    render() {
        Array.from(this.state.boardElement.children).forEach((square, i) => {

            if (square.innerText !== this.state.board[i]) {
                square.innerText = this.state.board[i]
            }
            console.log(square)
        })
    }
}

const ticTacToe = new TicTacToe()