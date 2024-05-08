import { SymError } from "./Error"

// Обощенный класс для проверки символа хода
export class Sym<T extends GameType> {
    private field: string = ""

    constructor(sym: string = "_") {
        try {
            if (!this.checkSym(sym)) throw SymError

            this.field = sym 
        }
        catch(e){
            console.log(e)
        }
        this.field = sym 
    }

    make(sym: string): Sym<T> {
        return new Sym<T>(sym)
    }

    clone(): Sym<T> {
        return this.make(this.sym)
    }

    checkSym(sym: string): boolean {
        if (sym.length == 1) return true
        return false
    }

    get sym() {
        return this.field
    }

    StringToSyms<T extends GameType>(str: string): Sym<T>[] {
        const result: Sym<T>[] = new Array(str.length)
        for (let i = 0; i < str.length; i++)
            result[i] = this.make(str[i])
        return result
    }

    SymsToString(syms: Sym<T>[]): string {
        let result: string = ""
        for (let i = 0; i < syms.length; i++)
            result = result + syms[i].sym
        return result
    }

}



