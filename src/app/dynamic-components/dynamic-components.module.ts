import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloDynamicComponent } from './hello-dynamic/hello-dynamic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HelloDynamicComponent],
  exports: [HelloDynamicComponent]
})
export class DynamicComponentsModule { }