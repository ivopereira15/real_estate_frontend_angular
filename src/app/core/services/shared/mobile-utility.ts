import { Injectable, Inject, OnDestroy, OnInit } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { IWindowData, IMobileUtility } from 'src/app/shared/models/mobile-utility/mobile-utility';

@Injectable({
    providedIn: 'root'
})
export class MobileUtilityService implements IMobileUtility, OnDestroy {

    private windowData: IWindowData = { isBiggerAsLaptop: false,
        isBiggerAsTablet: false, isBiggerAsPhone: false, isLandscape: false } as IWindowData;
    private subscriptions: Subscription = new Subscription();
    private windowChanges$: BehaviorSubject<IWindowData> = new BehaviorSubject(this.windowData);

    constructor(
        @Inject(BreakpointObserver) public breakpointObserver: BreakpointObserver
    ) {
        // create Subscriptions
        this.subscriptions.add(this.breakpointObserver
            .observe(["(min-width: 1025px)"])
            .subscribe((state: BreakpointState) => {
                this.windowData.isBiggerAsLaptop = state.matches;

                this.windowChanges$.next(this.windowData);
            }));

        this.subscriptions.add(this.breakpointObserver
            .observe(["(min-width: 769px)"])
            .subscribe((state: BreakpointState) => {
                this.windowData.isBiggerAsTablet = state.matches;

                this.windowChanges$.next(this.windowData);
            }));

        this.subscriptions.add(this.breakpointObserver
                .observe(["(min-width: 426px)"])
                .subscribe((state: BreakpointState) => {
                    this.windowData.isBiggerAsPhone = state.matches;

                    this.windowChanges$.next(this.windowData);
                }));

        this.subscriptions.add(this.breakpointObserver
                .observe(["(orientation: landscape)"])
                .subscribe((state: BreakpointState) => {
                    this.windowData.isLandscape = state.matches;

                    this.windowChanges$.next(this.windowData);
                }));
    }

    public ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.windowChanges$.unsubscribe();
    }

    public getWindowObservable(): Observable<IWindowData> {
        return this.windowChanges$;
    }

    public getWindowData(): IWindowData {
        return this.windowChanges$.value;
    }
}
