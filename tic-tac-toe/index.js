// const box = document.querySelector(".box")
const boxes = []
//keep track of turn
let isXTurn = true

const wrapper = document.querySelector(".box")



for (let i = 0; i < 9; i++) {
    const box = document.querySelector(`.b${i}`)
    boxes.push(box)
    box.addEventListener("click", handleBoxClick)
}

console.log(boxes)

function handleBoxClick(e) {

    console.log(e.target)
    //check if there is text
    if (!e.target.innerText) {

        //if it is X turn, place and x otherwise place a 0
        e.target.innerText = isXTurn ? "X" : "O"
        if (isWinner()) {
            alert("Winner")
            resetBoard()
        } else {
            isXTurn = !isXTurn
        }
    }

}

function isWinner() {

    // const winningCombo = [
    //     [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    //     []
    // ]
    const currentPlayer = isXTurn ? "X" : "O"

    return (
        boxes[0].innerText === currentPlayer &&
        boxes[1].innerText === currentPlayer &&
        boxes[2].innerText === currentPlayer
    ) ||
        (
            boxes[3].innerText === currentPlayer &&
            boxes[4].innerText === currentPlayer &&
            boxes[5].innerText === currentPlayer
        ) ||
        (
            boxes[6].innerText === currentPlayer &&
            boxes[7].innerText === currentPlayer &&
            boxes[8].innerText === currentPlayer
        ) ||
        (
            boxes[0].innerText === currentPlayer &&
            boxes[3].innerText === currentPlayer &&
            boxes[6].innerText === currentPlayer
        ) ||
        (
            boxes[1].innerText === currentPlayer &&
            boxes[4].innerText === currentPlayer &&
            boxes[7].innerText === currentPlayer
        ) ||
        (
            boxes[2].innerText === currentPlayer &&
            boxes[5].innerText === currentPlayer &&
            boxes[8].innerText === currentPlayer
        ) ||
        (
            boxes[0].innerText === currentPlayer &&
            boxes[4].innerText === currentPlayer &&
            boxes[8].innerText === currentPlayer
        ) ||
        (
            boxes[2].innerText === currentPlayer &&
            boxes[4].innerText === currentPlayer &&
            boxes[6].innerText === currentPlayer
        )
}

function resetBoard() {
    boxes.forEach(box => {
        box.innerText = ""
        isXTurn = true
    })
}