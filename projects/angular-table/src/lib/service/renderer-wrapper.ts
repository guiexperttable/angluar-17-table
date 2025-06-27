import {AreaIdent, AreaModelIf, CellRendererIf, DomServiceIf, RendererCleanupFnType} from "@guiexpert/table";
import {
  ApplicationRef,
  ChangeDetectorRef,
  createComponent,
  EnvironmentInjector,
  EventEmitter,
  NgZone,
  Type
} from "@angular/core";
import {ComponentRendererIf} from "../component-renderer.if";
import {Subject, takeUntil} from "rxjs";
import {Observable} from "rxjs/internal/Observable";


function isObservable(value: any): value is Observable<any> {
  return value instanceof Observable || value instanceof EventEmitter;
}

export class RendererWrapper<T extends ComponentRendererIf<T>>
  implements CellRendererIf {

  public readonly event$ = new EventEmitter<any>();
  private readonly closed$ = new Subject<number>();

  constructor(
    private componentType: Type<ComponentRendererIf<T>>,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private cdr: ChangeDetectorRef,
    private readonly zone: NgZone
  ) {
  }

  render(
    cellDiv: HTMLDivElement,
    rowIndex: number,
    columnIndex: number,
    areaIdent: AreaIdent,
    areaModel: AreaModelIf,
    cellValue: any,
    domService: DomServiceIf): RendererCleanupFnType | undefined {

    const componentRef = createComponent(this.componentType, {
      environmentInjector: this.injector
    });
    componentRef.instance.setData(
      rowIndex,
      columnIndex,
      areaIdent,
      areaModel,
      cellValue);


    const emmiterNames = Object.keys(componentRef.instance)
      .filter(key => {
        const value = (componentRef.instance as any)[key];
        return value && isObservable(value);
      });

    const observables: (Observable<any>|EventEmitter<any>)[] = (emmiterNames.map(key => ((componentRef.instance as any)[key] as Observable<any>)));
    observables.forEach(obs => obs
      .pipe(
        takeUntil(this.closed$)
      )
      .subscribe((event: any) => {
        this.event$.next(event);
      })
    );

    if (cellDiv) cellDiv.appendChild(componentRef.location.nativeElement);

    this.appRef.attachView(componentRef.hostView);

    this.zone.run(() => {
      this.cdr.detectChanges();
    });

    return () => {
      // clean up:
      this.appRef.detachView(componentRef.hostView);
      this.closed$.next(Date.now());
    };
  }


}
