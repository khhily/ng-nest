import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { PaginationPrefix } from './pagination.type';
import { XInputNumber, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: 'x-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPaginationComponent implements OnChanges {
  @Input() @XInputNumber() index?: number = 1;
  @Input() @XInputNumber() size?: number = 10;
  @Input() @XInputNumber() total?: number = 0;
  @Output() indexChange = new EventEmitter<number>();
  lastIndex?: number;
  indexes: number[] = [];
  indexFirst: number = 1;
  indexLast: number = 1;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer.addClass(this.elementRef.nativeElement, PaginationPrefix);
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.total, changes.size, changes.index) && this.setIndexes();
  }

  setIndexes() {
    this.lastIndex = Math.ceil(this.total / this.size);
    const indexes = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex - 1; i++) {
        indexes.push(i);
      }
    } else {
      const current = this.index;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.lastIndex - 1);
      if (current - 1 <= 2) {
        right = 5;
      }
      if (this.lastIndex - current <= 2) {
        left = this.lastIndex - 4;
      }
      for (let i = left; i <= right; i++) {
        indexes.push(i);
      }
    }
    this.indexes = indexes;
    if (this.indexes.length > 0) {
      this.indexFirst = 1;
      this.indexLast = this.lastIndex;
    }
    this.cdr.detectChanges();
  }

  jump(index: number, isDiff = false) {
    this.index = this.validateIndex(isDiff ? this.index + index : index);
    this.setIndexes();
    this.indexChange.emit(this.index);
  }

  validateIndex(value: number): number {
    if (value > this.lastIndex) {
      return this.lastIndex;
    } else if (value < 1) {
      return 1;
    } else {
      return value;
    }
  }
}
