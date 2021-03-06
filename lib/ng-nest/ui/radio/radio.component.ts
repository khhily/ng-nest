import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  ChangeDetectorRef,
  HostBinding,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { XRadioPrefix, XRadioNode } from './radio.type';
import { Subscription, Observable } from 'rxjs';
import {
  XData,
  XValueAccessor,
  XControlValueAccessor,
  XInputBoolean,
  XDataConvert,
  XIsObservable,
  XToDataConvert,
  removeNgTag,
  XSize,
  XIsChange
} from '@ng-nest/ui/core';
import { map } from 'rxjs/operators';

@Component({
  selector: `${XRadioPrefix}`,
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRadioComponent)]
})
export class XRadioComponent extends XControlValueAccessor implements OnInit, OnChanges {
  @Input() @XDataConvert() data?: XData<XRadioNode[]>;
  @Input() @XInputBoolean() button?: boolean;
  @Input() @XInputBoolean() icon?: boolean;
  @Input() size?: XSize;
  @ViewChild('radio', { static: true }) radio: ElementRef;
  radioNodes: XRadioNode[] = [];
  private data$: Subscription | null = null;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super(renderer);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.data) && this.setData();
  }

  ngOnDestroy(): void {
    this.data$ && this.data$.unsubscribe();
  }

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  radioClick(event: Event, node: XRadioNode) {
    event.preventDefault();
    if (this.disabled || node.disabled || node.id === this.value) return;
    this.value = node.id;
    this.cdr.detectChanges();
    if (this.onChange) this.onChange(this.value);
  }

  private setData() {
    if (typeof this.data === 'undefined') return;
    if (XIsObservable(this.data)) {
      this.data$ && this.data$.unsubscribe();
      this.data$ = (this.data as Observable<any>).pipe(map(x => XToDataConvert(x))).subscribe(x => {
        this.setDataChange(x);
      });
    } else {
      this.setDataChange(this.data as XRadioNode[]);
    }
  }

  private setDataChange(value: XRadioNode[]) {
    this.radioNodes = value;
    this.cdr.detectChanges();
  }
}
