import { Sym } from "./Sym"

// Абстрактный класс для ввода хода
export abstract class Input<T extends GameType> {
    // Символ, который выставляется на поле
    abstract get sym(): Sym<T>
    // Действия, выполнениямы при ходе
    //  сменить символ для крестиков-ноликов
    //  очистить поле ввода для балды    
    abstract move(): void
    // дополнительные html элементы для хода
    //  для балды - поле для ввода буквы    
    get html(): string {
        return ""
    }
}