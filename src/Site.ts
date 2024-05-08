import { BoardBalda, BoardBaldaParam } from "./BoardBalda"
import { BoardTic, BoardTicParam } from "./BoardTic"
import { Game } from "./Game"
import { GameVC } from "./GameVC"
import { InputBalda } from "./InputBalda"
import { InputTic } from "./InputTic"
import { State } from "./State"
import { Sym } from "./Sym"
import { SymTic } from "./SymTic"

type Saving = {
    key: string
    game: Game<GameType>
}

const gamesTypes: Record<string, () => Game<GameType>> = {
    "Крестики-нолики": () => {
        return new Game(
            new State(new BoardTic(), new SymTic()),
            new InputTic(), 
            BoardTicParam
        )
    },
    "Балда": () => {
        return new Game(
            new State(new BoardBalda(), new Sym("_")),
            new InputBalda(),
            BoardBaldaParam
        )
    },
}

const gameSelect = <HTMLSelectElement>document.getElementById("gameSelect")
const saveGameButton = <HTMLButtonElement>document.getElementById("saveGameButton")
const loadGameButton = <HTMLButtonElement>document.getElementById("loadGameButton")

const boardChoose = <HTMLSelectElement>document.getElementById("boardChoose")
const boardChooseButton = <HTMLButtonElement>document.getElementById("boardChooseButton")

// Основной класс программы
// Реализует интерфейс и хранение данных о играх
// Позволяет создать новую игру из списка gamesTypes
//  сохранить и загрузить сохраненные игры
export class Site {
    game: Game<GameType>
    games: Saving[] = []



    constructor(
        gameType: string = "Крестики-нолики"
    ) {
        this.game = gamesTypes[gameType]()

        this.fillGames()
        saveGameButton.onclick = () => {
            this.save()
        }
        loadGameButton.onclick = () => {
            const ops = gameSelect.options
            var index = -1
            for (let i = 0; i < ops.length; i++)
                if (ops[i].selected)
                    index = i
            if (index >= 0)
                this.load(index)
        }

        const ops = boardChoose.options
        for (let game in gamesTypes)
            ops.add(new Option(game, game))

        boardChooseButton.onclick = () => {
            var choosed = ""
            for (let i = 0; i < ops.length; i++)
                if (ops[i].selected)
                    choosed = ops[i].value
            var game = gamesTypes[choosed]
            if(game!=null){
                this.game = game()
                GameVC.load(this.game)
            }
        }

        GameVC.load(this.game)
    }

    private fillGames() {
        var ops = gameSelect.options
        for (let i = ops.length - 1; i >= 0; i--)
            ops.remove(i)
        for (let i = 0; i < this.games.length; i++) {
            const key = this.games[i].key
            const elem = new Option(key, String(i))
            ops.add(elem)
        }
    }

    save() {
        let date = new Date().toLocaleString()
        // let games_length = this.Games.length
        this.games.push({key: date, game: this.game.clone()});
        this.fillGames()
    }

    load(index: number) {
        this.game = this.games[index].game.clone()
        GameVC.load(this.game)
    }

    keys(): string[] {
        let buff_array: string[] = []
        for (let i = 0; i < this.games.length; i++){
            buff_array[i] = this.games[i].key
        }
        return buff_array
    }
}