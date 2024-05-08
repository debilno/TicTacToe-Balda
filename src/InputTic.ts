import { Input } from "./Input"
import { SymTic } from "./SymTic"

export class InputTic extends Input<GameTic>{
    private static x = new SymTic("X")
    private static o = new SymTic("0")
    private _sym: SymTic

    constructor() {
        super()
        this._sym = InputTic.x
    }

    get sym(): SymTic {
        return this._sym
    }

    move(): void {
        if (this._sym == InputTic.x)
            this._sym = InputTic.o
        else
            this._sym = InputTic.x
    }

}