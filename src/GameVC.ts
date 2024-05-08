import { BoardVC } from "./BoardVC"
import { Game } from "./Game"

const input = <HTMLInputElement>document.getElementById("input")
const infoDiv = <HTMLDivElement>document.getElementById("info")
const stepSelect = <HTMLSelectElement>document.getElementById("stepSelect")
const stepButton = <HTMLButtonElement>document.getElementById("stepButton")

// Объект для работы с интерфейсом игры
export const GameVC: {
    // Текущая игра
    game: Game<GameType> | null
    // Загрузка игры происходит при инициализации программы, выборе игры или загрузке из сохраненных игр
    load: (game: Game<GameType>) => void
    // Отрисовка интерфейса
    draw: () => void
} = {
    game: null,
    load(game: Game<GameType>) {
        this.game = game
        BoardVC.load(
            game.boardParam,
            function (index: number) {
                return game.move(index)
            })
        input.innerHTML = game.input.html
        stepButton.onclick = (_) => {
            const ops = stepSelect.options
            var index = 0
            for (let i = 0; i < ops.length; i++)
                if (ops[i].selected)
                    index = i
            game.toStep(index)
        }
        this.draw()
    },
    draw() {
        if (this.game == null)
            throw new Error()
        BoardVC.draw(this.game.state.board)
        infoDiv.textContent = this.game.state.board.status()
        fillGames()
    },
}


function fillGames() {
    const game = GameVC.game
    if (game == null)
        throw new Error()
    const ops = stepSelect.options
    for (let i = ops.length - 1; i >= 0; i--)
        ops.remove(i)
    for (let i = 0; i < game.steps.length; i++) {
        const elem = new Option(String(i), String(i))
        ops.add(elem)
    }
}
