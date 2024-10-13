import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accept-deny',
  templateUrl: './accept-deny.component.html',
  styleUrls: ['./accept-deny.component.css'],
})
export class AcceptDenyComponent {
  @Input() title!: string;

  @Output() acceptEvent = new EventEmitter();

  @Output() denyEvent = new EventEmitter();

  constructor() {}

  accept($event?: any) {
    this.acceptEvent.emit();
  }

  deny($event?: any) {
    this.denyEvent.emit();
  }
}
