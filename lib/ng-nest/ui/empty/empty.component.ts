import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  Input
} from '@angular/core';
import { XEmptyPrefix } from './empty.type';
import { XTemplate } from '@ng-nest/ui/core';

@Component({
  selector: `${XEmptyPrefix}`,
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XEmptyComponent {
  @Input() img?: XTemplate;
  @Input() content?: XTemplate;
  @ViewChild('empty', { static: true }) empty: ElementRef;
  isImageTemp: boolean = false;
  isContentTemp: boolean = false;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}
}
