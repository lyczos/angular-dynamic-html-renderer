import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hello-dynamic',
  templateUrl: './hello-dynamic.component.html',
  styleUrls: ['./hello-dynamic.component.css']
})
export class HelloDynamicComponent implements OnInit {
  @Input() testInput: string;
  constructor() { }

  ngOnInit() {
  }

}