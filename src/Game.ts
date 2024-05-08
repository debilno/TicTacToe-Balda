import { BoardParam } from "./Board"
import { SymError } from "./Error"
import { GameVC } from "./GameVC"
import { Input } from "./Input"
import { State } from "./State"

// Класс
export class Game<T extends GameType> {
    // Шаги игры
    steps: State<T>[]
    // Номер текущей игры    
    current: number
    // Параметры доски (размеры)    
    boardParam: BoardParam
    // интерфейс для пользовательского ввода    
    input: Input<T>

    constructor(
        steps: State<T>[] | State<T>,
        input: Input<T>,
        boardParam: BoardParam,
        current: number = 0
    ) {
        if (Array.isArray(steps))
            this.steps = steps
        else
            this.steps = [steps]
        this.current = current
        this.boardParam = boardParam
        this.input = input
    }

    get state(): State<T> {
        return this.steps[this.current]
    }

    clone(): Game<T> {
        let buff_arr: State<T>[] = []
        for (let i = 0; i < this.steps.length; i++){
            buff_arr.push(this.steps[i].clone())
        }
        return new Game<T>(buff_arr, Object.assign(this.input), Object.assign(this.boardParam), this.current)
    }

    move(index: number): boolean {
        const turn = this.input.sym
        try{       
            if (turn.checkSym(turn.sym) === false || turn.sym === undefined) throw SymError
            
            if ((this.state.board.status() !== "X" && this.state.board.status() !== "0")){
                this.steps.push(this.state.clone())
    
                this.current += 1
                this.state.board.move(index, turn)
                GameVC.draw()
    
                this.input.move()
                return true
            }
        } catch(e) {
            alert(e)
        }
        return false
    }

    toStep(step: number) {
        if (this.current > step){
            if ((this.current - step) % 2 != 0) this.input.move()

            this.current = step
            this.steps.splice(this.current + 1, this.steps.length)
            GameVC.draw()
            return true
        }
        return false 
    }
}