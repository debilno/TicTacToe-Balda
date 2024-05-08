import { Board, BoardParam } from "./Board"
import { Sym } from "./Sym"
import { SymTic } from "./SymTic"

export class BoardTic extends Board<GameTic> {

    constructor(
        str: string | SymTic[] = "_________",
        init: boolean = true
    ) {
        // super({} as Sym<GameTic>[])
        let str_buff: string = ""
        if (typeof str !== "string"){
            // console.log(str)
            const sym = new SymTic()
            str_buff = sym.SymsToString(str)
        } else str_buff = str
        
        const sym_return = new SymTic()
        if (str_buff.length == 9){
            const new_str: SymTic[] = sym_return.StringToSyms(str_buff)
            super(new_str)
        } else {
            const new_str: SymTic[] = sym_return.StringToSyms("_________")
            super(new_str)
        }

        if (init == true){
            Board.row = BoardTicParam.row
            Board.col = BoardTicParam.col
        }
    }

    clone(init: boolean = false): BoardTic {
        let buff_arr: SymTic[] = []
        for (let i = 0; i < this.cells.length; i++){
            buff_arr[i] = this.cells[i].clone()
        }
        return new BoardTic(buff_arr, init)
    }

    private getLineChar(line: number[]): string[] {
        return [
            this.cells[line[0]].sym,
            this.cells[line[1]].sym,
            this.cells[line[2]].sym,
        ]
    }

    private static winPos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    private checkWin() {
        for (let j = 0; j < 8; j++){
            const pos_arr = BoardTic.winPos[j]
            const board_pos_slice = this.getLineChar(pos_arr)
            if (board_pos_slice[0] != "_" && board_pos_slice[0] == board_pos_slice[1] && board_pos_slice[0] == board_pos_slice[2]){
                return board_pos_slice[0]
            }
        }
        return "_"
    }

    override status(): string {
        if (this.checkWin() != "_"){
            return this.checkWin()
        }
        return super.status()
    }
}

export const BoardTicParam: BoardParam = {
    row: 3,
    col: 3
}