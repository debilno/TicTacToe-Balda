import { Board, BoardParam } from "./Board"

const boardDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("board")

// Объект для работы с интерфейсом доски
export const BoardVC: {
    // Кнопки на доске. Инициализируеются в initButtonTable при каждой загрузке игры. 
    buttons: HTMLButtonElement[]
    // Обработчики кликов. Инициализируеются в load при каждой загрузке игры
    move: (index: number) => boolean
    // Загрузка игры
    load: (board: BoardParam, move: (index: number) => boolean) => void
    // Перерисовка доски при выполнении хода или загрузке игры.
    draw: (board: Board<GameType>) => void
} = {
    buttons: new Array(9),
    move(index: number) { return false },
    load(
        board: BoardParam,
        move: (index: number) => boolean
    ) {
        Board.row = board.row
        Board.col = board.col
        boardDiv.innerHTML = getButtonTable()
        this.move = move
        initButtonTable()
    },
    draw(board: Board<GameType>) {
        for (let i = 0; i < this.buttons.length; i++)
            this.buttons[i].textContent = board.cells[i].sym
    }
}

function getButtonTable(): string {
    let html = "<table>"
    let num = 0
    for (let _row = 0; _row < Board.row; _row++) {
        html += "<tr>"
        for (let _col = 0; _col < Board.col; _col++) {
            html += "<td><button id='f"
            html += num++
            html += "'>_</button></td>"
        }
        html += "</tr>"
    }
    html += "</table>"
    return html
}

function initButtonTable() {
    const size = Board.row * Board.col
    BoardVC.buttons = new Array(size)
    for (let i = 0; i < size; i++) {
        BoardVC.buttons[i] = <HTMLButtonElement>document.getElementById("f" + i)
        BoardVC.buttons[i].onclick = () => {
            BoardVC.move(i)
        }
    }
}
