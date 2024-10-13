import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.css'],
})
export class TabellaComponent {
  @Input() title!: string;

  @Input() headers!: any;

  @Input() rows!: string[];

  @Output() notify = new EventEmitter();

  constructor() {}

  rowEvent($event: any, row: string): void {
    //Tolgo la classe css da tutte le row non selezionate
    let lista = document.querySelectorAll('tr');
    lista.forEach((node) => {
      node.classList.remove('rowSelected');
    });

    //Aggiungo la classe css alla row selezionata
    $event.target.parentElement.classList.add('rowSelected');

    this.notify.emit(row);
  }
}
