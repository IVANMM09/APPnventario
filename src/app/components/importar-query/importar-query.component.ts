import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-importar-query',
  templateUrl: './importar-query.component.html',
  styleUrls: ['./importar-query.component.scss'],
})
export class ImportarQueryComponent implements OnInit {
@Input() headerRow: any[] = [];
  constructor() { }

  ngOnInit() {}

}
