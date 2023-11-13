import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Perftracker } from "../Perftracker";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";

function FurnitureSets(setProps) {
  const { product } = setProps;
  console.log('Product in FurnitureSets:', product);


  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
    const {
        cart: { cartItems },
    } = state;

    const AddToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity, selectedDescription, selectedDescriptionValue },
        });
    };




  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(
    descriptionOptions.length > 0 ? descriptionOptions[0] : null
  );

  useEffect(() => {
    if (product.description && typeof product.description === "object") {
      const options = Object.keys(product.description);

      setDescriptionOptions(options);

      // If no option is selected, set the default to the first item
      if (!selectedDescription && options.length > 0) {
        setSelectedDescription(options[0]);
      }
    }
  }, [product.description]);

  // Handle change in the ComboBox selection
  const handleDescriptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedDescription(selectedOption);
  };

  // Get the price or value based on the selected option
  const selectedDescriptionValue =
    selectedDescription && product.description
      ? product.description[selectedDescription]
      : null;

  // Map description keys to user-friendly labels
  const descriptionLabels = {
    twoStools: "2 Stools",
    twoChairBackrest: "2 Chairs with Backrest",
    fourStools: "4 Stools",
    fourChairBackrest: "4 Chairs with Backrest",
    // Add more mappings as needed
  };

  // Display the user-friendly label in the ComboBox
  const displayLabel = selectedDescription
    ? descriptionLabels[selectedDescription]
    : "Select Description";



  return (

    <Card className="m-4 rounded-[1rem] border-2 border-gray-300 shadow-md transition duration-300 transform hover:scale-105">
      <Link to={`/product/${product.slug}`}>
        <div className="bg-[#f1f3f7] rounded-[15px]">
          <img
            src={product.image}
            className="product-image w-full h-40 object-cover"
            alt={product.name}
          />
        </div>
      </Link>
      <Card.Body className="p-4">
        <div className="block">
          <Link
            style={{ textDecoration: "none" }}
            to={`/product/${product.slug}`}
          >
            <div className="text-muted">
              <Card.Title className="w-full text-center font-semibold mb-2">
                {product.name}
              </Card.Title>
            </div>
          </Link>
          <Card.Text className=" ml-4 text-left text-xs font-semibold text-gray-700 mb-4">
            Dimension: {product.dimension}
          </Card.Text>

          {/* Render ComboBox with options */}
          <div className="text-center">
            <select
              className="border text-sm p-2 rounded"
              value={selectedDescription || undefined}
              onChange={handleDescriptionChange}
            >
              <option value="" disabled>
                Select Type of Chair
              </option>
              {descriptionOptions.map((option) => (
                <option key={option} value={option}>
                  {descriptionLabels[option]}
                </option>
              ))}
            </select>
            {/* Display the selected description value or price */}
            {selectedDescription && (
              <p className="text-green-800 my-3 text-lg font-bold">
                ₱{selectedDescriptionValue}.00
              </p>
            )}
          </div>
          <div className="text-center self-center flex justify-center ">
            <Button
              onClick={() => AddToCartHandler(product)}
              className="bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 focus:ring focus:border-blue-700 active:bg-blue-800 disabled:opacity-50 rounded w-3/4 flex justify-center self-center items-center"
            >
              <AiOutlineShoppingCart className="mr-2" /> Add to cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FurnitureSets;
