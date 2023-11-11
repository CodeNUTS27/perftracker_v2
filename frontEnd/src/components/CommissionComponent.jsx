import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Toolbar, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { commissionsData } from '../data/dummy';
import { commissionsGrid } from '../data/dummy';
import { Header } from '../components';

const CommissionComponent = () => {
    const selectionsettings = { persistSelection: true };

    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div>
            {/* COMMISSION ADMIN CONTAINER */}
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
                <div className="w-full flex flex-row justify-start items-start">
                    <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                        <Header category="Table" title="Commisions" />
                        <div className="grid-container h-full w-full">
                            <GridComponent
                                id="gridcomp"
                                dataSource={commissionsData}
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
                                    {commissionsGrid.map((item, index) => (
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

export default CommissionComponent;
