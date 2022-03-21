import { atom } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: true
})

export interface ICoordinates {
    latitude: number;
    longitude: number;
    position: any;
}