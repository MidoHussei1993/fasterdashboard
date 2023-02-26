import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[keyDown]',
})
export class KeyboardDirective {
  @Output() BackspaceFire: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  @HostListener('document:keydown.Backspace', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.BackspaceFire.emit();
  }
}
