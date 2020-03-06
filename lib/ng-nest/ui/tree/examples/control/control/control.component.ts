import { Component, ViewChild } from '@angular/core';
import { XTreeNode, XTreeComponent } from '@ng-nest/ui/tree';

@Component({
  selector: 'ex-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ExControlComponent {
  data: XTreeNode[] = [
    { id: 1, label: '一级 1' },
    { id: 2, label: '一级 2' },
    { id: 3, label: '一级 3' },
    { id: 5, label: '二级 1-1', pid: 1 },
    { id: 6, label: '二级 1-2', pid: 1 },
    { id: 7, label: '二级 1-3', pid: 1 },
    { id: 8, label: '二级 1-4', pid: 1 },
    { id: 9, label: '二级 2-1', pid: 2 },
    { id: 10, label: '二级 2-2', pid: 2 },
    { id: 11, label: '二级 2-3', pid: 2 },
    { id: 12, label: '二级 2-4', pid: 2 },
    { id: 13, label: '二级 3-1', pid: 3 },
    { id: 14, label: '二级 3-2', pid: 3 },
    { id: 15, label: '二级 3-3', pid: 3 },
    { id: 16, label: '二级 3-4', pid: 3 },
    { id: 21, label: '三级 1-1-1', pid: 5 },
    { id: 22, label: '三级 1-1-2', pid: 5 },
    { id: 23, label: '三级 1-1-3', pid: 5 },
    { id: 24, label: '三级 1-1-4', pid: 5 }
  ];
  @ViewChild('treeCom', { static: true }) treeCom: XTreeComponent;
  activatedNode: XTreeNode;
  selectedNodes: XTreeNode[] = [];
  expandedAll: boolean = true;
  content: any;
  constructor() {}

  activatedChange(node: XTreeNode) {
    this.activatedNode = node;
  }

  getCheckedKeys() {
    this.content = this.treeCom.getCheckedKeys();
  }

  setCheckedKeys(keys = []) {
    this.treeCom.setCheckedKeys(keys);
  }

  setExpandedAll() {
    this.expandedAll = !this.expandedAll;
  }
}
