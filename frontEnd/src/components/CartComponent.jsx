import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import MessageBox from "./MessageBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Perftracker } from "../Perftracker";
import Header from "./Header";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash, BsTrashFill } from "react-icons/bs";


const CartComponent = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  function formatSubtotal(subtotal) {
    return subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }


  const { currentColor } = useStateContext();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);

  const handleFileChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (event) => {
      setSelectedFile(file);
      setImagePreviewURL(event.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };




  return (
    <div>
      <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
        {/* DATE AND TIME */}
        <div className="w-full flex flex-row items-center justify-between ">
          <div>
            <p className="w-full self-start text-[20px] ml-4">October 21, 2023</p>
          </div>
          <div>
            <p className="self-end text-[20px] mr-4">Wednesday, 10:30 AM</p>
          </div>
        </div>

        <div className="w-full flex flex-row">
          <div className="flex flex-row w-full h-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="w-full flex h-full flex-col m-2 items-center justify-center rounded-3xl">
              <div className="flex flex-row items-start justify-start self-start">
                <Header category="Page" title="Cart" />
              </div>
              <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col w-full h-full mb-10">
                    {/* Card 1: Personal Information */}
                    <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">
                      <div className="flex flex-row text-center justify-center items-center p-5">
                        <h1 className="font-semibold text-blue-500 text-2xl">Furniture Sets </h1>
                      </div>
                      {/* Section: Upper */}
                      <div className="flex flex-row w-full px-8 pt-8 pb-0 bg-white items-start justify-start self-start">

                        <div className="flex flex-row ml-8 w-full h-full">
                          <div className="flex flex-col w-full h-full">
                            <div className="md:flex">
                              <div className="md:w-8/12">
                                {cartItems.length === 0 ? (
                                  <MessageBox>
                                   No Pending Orders in Cart. <Link to="/reseller/furnituresets" className="text-blue-500 underline">Add a Furniture Set</Link>
                                  </MessageBox>
                                ) : (
                                  <div className="bg-blue-100">
                                    {cartItems.map((item) => (
                                      <div key={item._id} className="mb-4 border-b border-gray-300 pb-4">
                                        <div className="md:flex md:items-center">
                                          <div className="md:w-4/12">
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              className="w-full h-auto rounded-md"
                                            />
                                            <Link to={`/product/${item.slug}`} className="text-blue-500 mt-2 block">{item.name}</Link>
                                          </div>
                                          <div className="md:w-3/12">
                                            <div className="flex items-center space-x-2">
                                              <Button
                                                variant="light"
                                                onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                disabled={item.quantity === 1}
                                              >
                                                 <AiOutlineMinus />
                                              </Button>
                                              <input
                                                className="input w-12 text-center"
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                max={item.countInStock}
                                                onInput={(e) => {
                                                  // Prevent any non-numeric characters from being entered
                                                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                                  updateCartHandler(item, Number(e.currentTarget.value));
                                                }}
                                              />
                                              <Button
                                                variant="light"
                                                onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                disabled={item.quantity === item.countInStock}
                                              >
                                                <AiOutlinePlus />
                                              </Button>
                                            </div>
                                          </div>
                                          <div className="md:w-3/12">₱{item.price}</div>
                                          <div className="md:w-2/12">
                                            <Button variant="light" onClick={() => removeItemHandler(item)}>
                                              <BsTrashFill/>
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="md:w-4/12 md:ml-4 bg-red-100">
                                <Card>
                                  <Card.Body>
                                    <div>
                                      <h3 className="text-2xl mb-4">
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}items) : ₱
                                        {formatSubtotal(cartItems.reduce((a, c) => a + c.price * c.quantity, 0))}
                                      </h3>
                                      <div className="flex justify-center">
                                        <Button
                                          type="button"
                                          variant="primary"
                                          onClick={checkoutHandler}
                                          disabled={cartItems.length === 0}
                                        >
                                          Checkout
                                        </Button>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CartComponent;
