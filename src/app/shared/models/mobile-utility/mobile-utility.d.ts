import { Observable } from "rxjs";

export interface IWindowData {
    isBiggerAsLaptop: boolean; // Width is bigger as 1024px
    isBiggerAsTablet: boolean; // Width is bigger as 768px
    isBiggerAsPhone: boolean; // Width is bigger as 425px
    isLandscape: boolean;
}

export interface IMobileUtility {
    getWindowObservable(): Observable<IWindowData>;

    getWindowData(): IWindowData;
}
