import { YachError } from "./Error"
import { Sym } from "./Sym"

export type BoardParam = {
    row: number,
    col: number
  }

// Абстрактный класс доски
export abstract class Board<T extends GameType>{
    cells: Sym<T>[]

    static row: number
    static col: number

    constructor(
        str: Sym<T>[],
        row?: number,
        col?: number,
    ) {
        this.cells = []
        if (row !== undefined) Board.row = row
        if (col !== undefined) Board.col = col
        
        for (let i = 0; i < str.length; i++){
            this.cells[i] = str[i]
        }
    }

    abstract clone(): Board<T>     

    isFill(): boolean {
        const even = (element: Sym<T>) => element.sym === "_";
        if (this.cells.findIndex(even) == -1) return true
        return false
    }

    move(index: number, sym: Sym<T>): boolean {
        if (this.cells[index].sym == "_"){
            this.cells[index] = this.cells[index].make(sym.sym)
            return true
        }
        throw YachError 
    }

    status(): string { 
        if (this.isFill()) return "Игра закончена"
        return "Идет игра"
    }

}
