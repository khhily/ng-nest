import { XButtonModule } from '@ng-nest/ui/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XTooltipDirective } from './tooltip.directive';
import { Component, DebugElement, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { By } from '@angular/platform-browser';
import { XTooltipModule } from './tooltip.module';
import { XTooltipPrefix } from './tooltip.type';
import { interval } from 'rxjs';

describe(XTooltipPrefix, () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XTooltipModule, XButtonModule],
      declarations: [TestXTooltipComponent]
    }).compileComponents();
  }));
  describe(`default.`, () => {
    let fixture: ComponentFixture<TestXTooltipComponent>;
    let debugElement: DebugElement;
    let element: Element;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestXTooltipComponent);
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.directive(XTooltipDirective));
      element = debugElement.nativeElement;
    });
    it('should create.', () => {
      expect(debugElement).toBeDefined();
    });
  });
});

@Component({
  selector: 'test-x-tooltip',
  template: `
    <div class="box">
      <div class="top">
        <x-button x-tooltip content="上左上左上左上左上左上左上左上左上左上左" placement="top-start">上左</x-button>
        <x-button x-tooltip content="上中上中上中上中上中上中上中上中上中上中" placement="top">上中</x-button>
        <x-button x-tooltip content="上右上右上右上右上右上右上右上右上右上右" placement="top-end">上右</x-button>
      </div>
      <div class="left">
        <x-button x-tooltip content="左上左上左上左上左上左上左上左上左上左上" placement="left-start">左上</x-button
        ><x-button x-tooltip content="左中左中左中左中左中左中左中左中左中左中" placement="left">左中</x-button
        ><x-button x-tooltip content="左下左下左下左下左下左下左下左下左下左下" placement="left-end">左下</x-button>
      </div>
      <div class="right">
        <x-button x-tooltip content="右上右上右上右上右上右上右上右上右上右上" placement="right-start">右上</x-button
        ><x-button x-tooltip content="右中右中右中右中右中右中右中右中右中右中" placement="right">右中</x-button
        ><x-button x-tooltip content="右下右下右下右下右下右下右下右下右下右下" placement="right-end">右下</x-button>
      </div>
      <div class="bottom">
        <x-button x-tooltip content="下左下左下左下左下左下左下左下左下左下左" placement="bottom-start">下左</x-button
        ><x-button x-tooltip content="下中下中下中下中下中下中下中下中下中下中" placement="bottom">下中</x-button
        ><x-button x-tooltip content="下右下右下右下右下右下右下右下右下右下右" placement="bottom-end">下右</x-button>
      </div>
    </div>
  `,
  styles: [
    `
      .box {
        padding: 5rem 10rem;
        width: 45rem;
      }
      .box .top {
        text-align: center;
      }
      .box .left {
        float: left;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .right {
        float: right;
        width: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .box .bottom {
        clear: both;
        text-align: center;
      }
    `
  ]
})
class TestXTooltipComponent {
  constructor(public cdr: ChangeDetectorRef) {
    interval(1).subscribe(x => {
      this.cdr.detectChanges();
    });
  }
}
