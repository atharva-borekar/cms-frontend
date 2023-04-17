import { ColDef } from 'ag-grid-community';

export interface ITableComponent {
  data: Array<object>;
  columns: Array<ColDef>;
  className?: string;
}
