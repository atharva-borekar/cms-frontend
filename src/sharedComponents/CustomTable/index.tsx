import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ITableComponent } from "./types";
import "./table.scss";

const CustomTable: React.FC<ITableComponent> = ({
  data,
  columns,
  className,
  onGridReady,
  onCellEditRequest,
}) => {
  const defaultColDef = {
    editable: false,
    suppressMovable: true,
  };

  return (
    <div className={`mb-3 ag-theme-alpine ${className}`}>
      <AgGridReact
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        rowData={data}
        rowSelection="single"
        columnDefs={columns}
        enableBrowserTooltips
        readOnlyEdit={true}
        onCellEditRequest={onCellEditRequest}
      />
    </div>
  );
};

export default CustomTable;
