import { atom, selector } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: false
})

export interface ICoordinates {
    latitude: number;
    longitude: number;
    position: any;
}
export interface IToDo {
    text: string;
    id: number;
}
export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: []
})

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        return toDos.map((toDo) => toDo)
    }
})

export const DateState = atom({
    key: "date",
    default: []
})