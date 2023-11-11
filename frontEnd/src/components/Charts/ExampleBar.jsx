import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const ExampleBar = () => {
  const { currentMode } = useStateContext();
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/charts/barChart');
          console.log("Server Response Data:", response.data);
      
          if (Array.isArray(response.data)) {
            // Set the array directly in your state
            setChartData(response.data);
          } else {
            console.error("Data is not in the expected format in the response.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };      
  
    fetchData();
  }, []);
  
  

 return (
    <div className="flex w-full h-full items-center justify-center self-center">
      <div>
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            <SeriesDirective dataSource={chartData} xName="category" yName="value" name="Data" type="Column" />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default ExampleBar;