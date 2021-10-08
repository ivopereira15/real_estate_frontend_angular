import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[setValue]'
})
export class SetValueDirective {
  @Input()
  set setValue(val: any) {
    this.ngControl.control.setValue(val, { emitEvent: false });
  }

  constructor(private ngControl: NgControl) {}
}
