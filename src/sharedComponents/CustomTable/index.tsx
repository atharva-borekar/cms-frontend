import React, { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ITableComponent } from "./types";
import "./table.scss";

const CustomTable: React.FC<ITableComponent> = ({ data, columns }) => {
  const ref = useRef<any>(null);
  const onFirstDataRendered = useCallback((params: any) => {
    ref.current?.api.sizeColumnsToFit();
  }, []);
  return (
    <div className="ag-theme-alpine w-100">
      <AgGridReact
        className="w-100"
        ref={ref}
        rowData={data}
        columnDefs={columns}
        domLayout="autoHeight"
        onFirstDataRendered={onFirstDataRendered}
        enableBrowserTooltips={true}
      />
    </div>
  );
};

export default CustomTable;
