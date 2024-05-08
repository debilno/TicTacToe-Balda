import { Board, BoardParam } from "./Board"
import { Sym } from "./Sym"

export class BoardBalda extends Board<GameBalda> {
    constructor(
        str: string | Sym<GameBalda>[] = "балда",
        init: boolean = true
        // public init: boolean = true     // добавлен public из-за проблемы с clone()
    ) {
        // super({} as Sym<GameBalda>[])
        if (typeof str !== 'string'){
            const sym = new Sym<GameBalda>()
            str = sym.SymsToString(str)
        }
        
        if (str.length == 5){
            const empty_space = "__________"
            str = empty_space + str + empty_space
        }

        const sym = new Sym<GameBalda>()
        const new_str: Sym<GameBalda>[] = sym.StringToSyms(str)
        super(new_str)
        if (init == true){
            Board.row = BoardBaldaParam.row
            Board.col = BoardBaldaParam.col
        }
    }
    clone(init: boolean = false): BoardBalda {
        let buff_arr: Sym<GameBalda>[] = []
        for (let i = 0; i < this.cells.length; i++){
            buff_arr[i] = this.cells[i].clone()
        }
        return new BoardBalda(buff_arr, init)
    }
}

export const BoardBaldaParam: BoardParam = {
    row: 5,
    col: 5
}