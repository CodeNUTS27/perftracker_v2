import React, { useReducer, useState, useEffect, useContext } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { SidebarAdmin, Navbar, Footer, Button, LoadingBox, FurnitureSets } from '.';
import { MdOutlineCancel } from 'react-icons/md';
import avatar from '../data/avatar.jpg';
import { userProfileData } from '../data/dummy';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { Perftracker } from '../Perftracker';
import MessageBox from './MessageBox';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

const Furniture = () => {

  // Use useParams directly
  const { slug } = useParams();
  console.log('Slug:', slug);



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

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState('');

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('http://localhost:8000/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result.data)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);



  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry, product is out of stock');
    //   return;
    // }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  return (
    <div>
      {/* ORDERFORMS ADMIN CONTAINER */}
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
                <Header category="Page" title="Furniture Sets" />
              </div>
              <div className="flex flex-row h-full w-full bg-white mx-2 my-2">
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col w-full h-full mb-10">
                    {/* Card 1: Personal Information */}
                    <div className="flex flex-col w-full border-1 shadow-md mb-10 p-4 mr-4 rounded-3xl bg-white items-start justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading ? (
                          <LoadingBox />
                        ) : error ? (
                          <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                          <>
                            {products.map((productItem) => (
                              <FurnitureSets key={productItem.slug} product={productItem} />
                            ))}
                          </>
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

  );
}

export default Furniture;
