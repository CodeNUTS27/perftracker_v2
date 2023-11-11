    import React, { useState } from "react";

    import '../App.css';
    import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

    function NumericUpdownControl() {
        const [quantity, setQuantity] = useState(0);

        const handleIncrement = () => {
          setQuantity(quantity + 1);
        };
      
        const handleDecrement = () => {
          if (quantity > 0) {
            setQuantity(quantity - 1);

          }
        };
      
        return (
          <div className="flex flex-row">
            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-red-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
              <button className="flex w-[40px] h-full border-gray-800" onClick={handleDecrement}>
                <div className="mx-[10px] justify-center items-center self-center">
                  <AiOutlineMinus />
                </div>
              </button>
            </div>
            <div className="flex flex-col">
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                max="100"
                step="1"
                value={quantity}
                className="hide-number-arrows px-4 w-[50px] text-center p-2 border-1 border-blue-700 rounded flex justify-end"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-[40px] text-lg font-semibold text-green-500 bg-white border-[2px] rounded-tr rounded-br fill-slate-600">
              <button className="w-[40px] h-full border-gray-800" onClick={handleIncrement}>
                <div className="mx-[10px] justify-center items-center self-center">
                  <AiOutlinePlus />
                </div>
              </button>
            </div>
          </div>
        );
      }
      
      export default NumericUpdownControl;