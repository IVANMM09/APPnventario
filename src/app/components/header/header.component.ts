import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  fechaActual: Date = new Date();
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {

  }

}
