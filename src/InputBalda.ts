import { Input } from "./Input"
import { Sym } from "./Sym"

export class InputBalda extends Input<GameBalda>{
    override get html(): string  {
        return "<input id='inputBalda'></input>"
    }

    get sym(): Sym<GameBalda> {
        const field = <HTMLInputElement>document.getElementById("inputBalda")
        // if (field.value.length != 1)
        //     return new Sym<GameBalda>()
        return new Sym<GameBalda>(field.value)
    }
    move(): void {
        const field = <HTMLInputElement>document.getElementById("inputBalda")
        field.value = ""
    }

}