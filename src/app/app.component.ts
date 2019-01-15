import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  testHtml = `
  <h2>H2 and interpolaton: 2+2={{2+2}}</h2>
  <hello-dynamic [testInput]="'yeahString'"></hello-dynamic>
  `;
}
