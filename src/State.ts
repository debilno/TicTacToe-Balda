import { Board } from "./Board"
import { Sym } from "./Sym"


export class State<T extends GameType> {
    board: Board<T>
    sym: Sym<T>

    constructor(
        board: Board<T>,
        sym: Sym<T>
    ) {
        this.board = board
        this.sym = sym
    }

    clone(): State<T>{
        return new State<T>(this.board.clone(), this.sym.clone())
    }
}