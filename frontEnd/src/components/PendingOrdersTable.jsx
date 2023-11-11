import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Toolbar, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid, pendingOrdersGrid, pendingOrdersData } from '../data/dummy';
import { Header } from '../components';

const PendingOrdersTable = () => {
    const selectionsettings = { persistSelection: true };
    
    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div>
            {/* PRODUCTS ADMIN CONTAINER */}
            <div className="w-full flex px-4 relative self-start items-start flex-col justify-start">

                <div className="w-full flex flex-row justify-start items-start">
                    <div className="w-full m-2 md:m-5 mt-24 p-2 md:p-5 bg-white rounded-3xl">
                        <Header category="Table" title="Pending Orders" />
                        <div className="grid-container h-full w-full">
                            <GridComponent
                                id="gridcomp"
                                dataSource={pendingOrdersData}
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
                                    {pendingOrdersGrid.map((item, index) => (
                                        <ColumnDirective key={index} {...item} />
                                    ))}
                                </ColumnsDirective>
                                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
                            </GridComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingOrdersTable;
