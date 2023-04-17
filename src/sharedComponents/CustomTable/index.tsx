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
    <div className="ag-theme-alpine custom-table">
      <AgGridReact
        ref={ref}
        rowData={data}
        columnDefs={columns}
        domLayout="autoHeight"
        autoSizePadding={20}
        onFirstDataRendered={onFirstDataRendered}
      />
    </div>
  );
};

export default CustomTable;
