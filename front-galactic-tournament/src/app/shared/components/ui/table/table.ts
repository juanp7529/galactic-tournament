import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

export interface Column {
  key: string;
  header: string;
  render?: TemplateRef<any>;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
}
