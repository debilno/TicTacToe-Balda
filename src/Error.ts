export class GameError extends Error{}
export const SymError = new GameError("Wrong symbol")
export const YachError = new GameError("Cell wrong")