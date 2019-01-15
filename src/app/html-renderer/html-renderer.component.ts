import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentRef,
  Injector,
  Input,
  NgModule,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// here we have all custom components allowed for dynamic render
import { DynamicComponentsModule } from '../dynamic-components/dynamic-components.module';

export async function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
  const cmpClass = class DynamicComponent {};
  const decoratedCmp = Component(metadata)(cmpClass);

  // IMPORT ALL MODULES HERE!!!
  @NgModule({ imports: [
    CommonModule, 
    RouterModule, 
    DynamicComponentsModule,
    /* All other modules including components that can be use with renderer */
  ], 
  declarations: [decoratedCmp] })
  class DynamicHtmlModule {}

  const moduleWithComponentFactory = await compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule);
  return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
}

@Component({
  selector: 'html-renderer',
  templateUrl: './html-renderer.component.html',
  styleUrls: ['./html-renderer.component.css']
})
export class HtmlRendererComponent implements OnInit, OnChanges, OnDestroy {
  @Input() content: string; // '<h1>Title...</h1> <some-component></some-component>'
  cmpRef: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnInit(): void {
    console.log('content:::', this.content);
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngOnChanges() {
    const html = this.content;
    if (!html) {
      return;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-selector',
      template: this.content,
      // todo: check styles and other options
    });

    createComponentFactory(this.compiler, compMetadata).then(factory => {
      const injector = Injector.create({ providers: [], parent: this.vcRef.injector });
      this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
    });
  }
}
