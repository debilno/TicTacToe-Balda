import { Sym } from "./Sym"

export class SymTic extends Sym<GameTic> {

    override checkSym(sym: string): boolean {
        if (super.checkSym(sym)){
            if (sym == "_" || sym == "X" || sym == "0")
                return true
        }
        return false
    }

}