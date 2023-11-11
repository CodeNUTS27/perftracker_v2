import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Toolbar, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, resellerGrid, resellerData } from '../data/dummy';
import { Header } from '../components';

const ResellerList = () => {
    const selectionsettings = { persistSelection: true };
    
    const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div>
            {/* PRODUCTS ADMIN CONTAINER */}
            <div className="w-full h-full flex px-4 relative self-start items-start flex-col justify-start">
                <div className="w-full h-full flex flex-row justify-start items-start">
                        <div className=" h-full w-full">
                            <GridComponent
                                id="gridcomp"
                                dataSource={resellerData}
                                allowPaging
                                allowSorting
                                allowExcelExport
                                allowPdfExport
                                contextMenuItems={contextMenuItems}
                                enableHover={true}
                                editSettings={editing}
                                selectionSettings={selectionsettings}
                                width="100%" 
                            >
                                <ColumnsDirective>
                                    {resellerGrid.map((item, index) => (
                                        <ColumnDirective key={index} {...item} />
                                    ))}
                                </ColumnsDirective>
                                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
                            </GridComponent>
                        </div>
                </div>
            </div>
        </div>
  )
}

export default ResellerList