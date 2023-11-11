import React, {useState, useEffect, useReducer} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import axios from 'axios';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationLegend, PieSeries, AccumulationDataLabel, Inject, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

import { useStateContext } from '../../contexts/ContextProvider';
import { pieChartData } from '../../data/dummy';


const ExamplePie = ({ id, legendVisiblity, height }) => {
 

    const [data, setData] = useState([]);
  const { currentMode } = useStateContext();


  const navigate = useNavigate();
  const { state } = useAuth();
  const { userInfo } = state;


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/charts/pieChart');
          console.log("Server Response Data:", response.data);
      
          if (Array.isArray(response.data)) {
            // Set the array directly in your state
            setData(response.data);
          } else {
            console.error("Data is not in the expected format in the response.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };      
  
    fetchData();
  }, []);
  
  

  console.log(data);


    return (
        <div className="flex w-full h-full items-center justify-center self-center">
            <div>
                <AccumulationChartComponent
                    id={id}
                    legendSettings={{ visible: legendVisiblity, background: 'white' }}
                    height={height}
                    background={currentMode === 'Dark' ? '#33373E' : '#fff'}
                    tooltip={{ enable: true }}
                >
                    <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective
                            name="Items"
                            dataSource={data}
                            xName="x"
                            yName="y"
                            innerRadius="0%"
                            startAngle={0}
                            endAngle={360}
                            radius="80%"
                            explode
                            explodeOffset="10%"
                            explodeIndex={0}
                            dataLabel={{
                                visible: true,
                                name: 'text',
                                position: 'Inside',

                                font: {
                                    fontWeight: '600',
                                    color: '#fff',
                                },
                            }}
                        />
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>

        </div>


    );
};

export default ExamplePie;