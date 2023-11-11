import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Toolbar, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid, pendingOrdersGrid, pendingOrdersData } from '../data/dummy';
import { Header } from '../components';

const Products = () => {
    const selectionsettings = { persistSelection: true };
    const toolbarOptions = [
        { text: 'Add to Cart', tooltipText: 'Add', prefixIcon: 'e-add' }, // Custom command
    ];
    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div>
            {/* PRODUCTS ADMIN CONTAINER */}
            <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
                {/* DATE AND TIME */}
                <div className="w-full flex flex-row items-center justify-between ">
                    <div>
                        <p className="w-full self-start text-[20px] ml-4 ">October 21, 2023</p>
                    </div>
                    <div>
                        <p className="self-end text-[20px] mr-4">Wednesday, 10:30 AM</p>
                    </div>
                </div>

                <div className="w-full flex flex-row">
                    <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                        <Header category="Page" title="Products" />
                        <div className="grid-container">
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
                                toolbar={toolbarOptions}
                                width="100%" 
                            >
                                <ColumnsDirective>
                                    {pendingOrdersGrid.map((item, index) => (
                                        <ColumnDirective key={index} {...item} />
                                    ))}
                                </ColumnsDirective>
                                <Inject services={[Resize, Sort, ContextMenu, Toolbar, Filter, Page, ExcelExport, Edit, PdfExport]} />
                            </GridComponent>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
