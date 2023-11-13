import React, { useContext, useEffect, useState, useReducer } from "react";
import { Button } from "react-bootstrap";
import MessageBox from "./MessageBox";
import { useNavigate } from "react-router-dom";
import { Perftracker } from "../Perftracker";
import axios from 'axios';
import { getError } from '../util';
import LoadingBox from './LoadingBox';
import { BsXLg } from 'react-icons/bs'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const OrdersStatus = () => {
  const navigate = useNavigate();
  const { state } = useContext(Perftracker);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    orders: [],
  });

  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/orders/mine`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        const sortedOrders = data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: sortedOrders });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [sortOrder, userInfo]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const formatNumber = (number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full flex p-8 relative self-start items-center flex-col justify-start">
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
            <div className="w-full flex flex-row h-full bg-white mx-2 my-2">
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4  rounded-3xl bg-white items-start justify-center">
                  <div className="flex flex-row flex-wrap mt-8 w-full ">
                    <div className="w-full px-[1.54rem] md:flex md:max-w-2xl mx-auto flex-shrink-0 max-w-full mt-0">
                      <div className="mb-3 w-full">
                        <h1 className="w-full font-semibold text-2xl mb-6 text-center text-blue-900">Order Status </h1>
                        <div className="w-full mb-3 p-8 border-gray-300 border-[1px] rounded-lg">
                          {loading ? (
                            <LoadingBox></LoadingBox>
                          ) : error ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                          ) : (
                            <table className="w-full mb-4 border-collapse text-left border border-gray-300">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>
                                    DATE
                                    <Button variant='transparent' size="sm" onClick={toggleSortOrder}>
                                      {sortOrder === 'asc' ? <FaCaretUp /> : <FaCaretDown />}
                                    </Button>
                                  </th>
                                  <th>TOTAL</th>
                                  <th>DELIVERED</th>
                                  <th>ACTIONS</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((order) => (
                                  <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{formatNumber(order.totalPrice)}</td>
                                    <td>
                                      {order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : <BsXLg />}
                                    </td>
                                    <td>
                                      <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                          navigate(`/order/${order._id}`);
                                        }}
                                      >
                                        Details
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
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
  );
};

export default OrdersStatus;
