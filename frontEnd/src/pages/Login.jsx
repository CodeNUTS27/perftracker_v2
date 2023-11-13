

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MyCarousel } from '../components';
import { getError } from '../util';
import { Perftracker } from '../Perftracker';


const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameSignup, setNameSignup] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [confirmPasswordSignup, setConfirmPasswordSignup] = useState('');

  //Show-Hide Pass
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  }

  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  const { userInfo } = state;

  const [isRegistering, setIsRegistering] = useState(false);

  const toggleSection = () => {
    console.log('isRegistering:', isRegistering);
    setIsRegistering(!isRegistering);
  };


  //Login form
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Logging in...');
    try {
      console.log('Data to be sent:', {
        email,
        password,
      });
      const response = await axios.post('http://localhost:8000/api/users/signin', {
        email,
        password,
      });
      const data = response.data; // Get data from the response
      console.log('Login response:', data);
  
      // Check if data is defined before accessing properties
      if (data) {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
  
        console.log('Before navigate. Redirecting to:');
        if (data.isReseller) {
          // Redirect to the reseller dashboard
          navigate('/reseller/dashboard');
        } else if (data.isAdmin) {
          // Redirect to the admin dashboard
          navigate('/admin/dashboard');
        } 
      } else {
        console.error('Data is not defined in the response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(getError(error));
    }
  };
  

  useEffect(() => {
    if (userInfo) {
      // Check if userInfo is defined
      console.log('Before navigate. Redirecting to:');
      if (userInfo.isReseller) {
        // Redirect to the reseller dashboard
        navigate('/reseller/dashboard');
      } else if (userInfo.isAdmin) {
        // Redirect to the admin dashboard
        navigate('/admin/dashboard');
      }
    }
  }, [userInfo, navigate, redirect]);
  


  //Signup Form
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Name:', nameSignup);
    console.log('Email:', emailSignup);
    console.log('Password:', passwordSignup);
    console.log('Signing up...');
    try {
      console.log('Data to be sent:', {
        nameSignup,
        emailSignup,
        passwordSignup,
      });

      const { data } = await axios.post('http://localhost:8000/api/users/signup', {
        nameSignup,
        emailSignup,
        passwordSignup,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log("Signup successful!");
      console.log('Redirection complete.');
      navigate(redirect || '/');

    } catch (err) {
      console.error(err); // Log the error to the console
      toast.error(getError(err));
    }



  };


  //Hover Effects For InputFields
  useEffect(() => {
    if (typeof window !== 'undefined') {

      //hover for Username Fieldnpm install
      const inputs = document.querySelectorAll(".input-field-user");
      const inputs_pass = document.querySelectorAll(".input-field-pass");
      const bullets = document.querySelectorAll(".bullets span");
      const images = document.querySelectorAll(".image");


      inputs.forEach((inp) => {
        inp.addEventListener("focus", () => {
          inp.classList.add("active");
        });
        inp.addEventListener("blur", () => {
          if (inp.value != "") return;
          inp.classList.remove("active");
        });
      });

      //hover for password
      inputs_pass.forEach((inp) => {
        inp.addEventListener("focus", () => {
          inp.classList.add("active");
        });
        inp.addEventListener("blur", () => {
          if (inp.value != "") return;
          inp.classList.remove("active");
        });
      });

      function moveSlider() {
        let index = this.dataset.value;

        let currentImage = document.querySelector(`.img-${index}`);
        images.forEach((img) => img.classList.remove("show"));
        currentImage.classList.add("show");

        const textSlider = document.querySelector(".text-group");
        textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

        bullets.forEach((bull) => bull.classList.remove("active"));
        this.classList.add("active");
      }

      bullets.forEach((bullet) => {
        bullet.addEventListener("click", moveSlider);
      });


      //signup-switching
      const toggle_btn = document.querySelectorAll(".toggle");
      const main = document.querySelector("main");

      toggle_btn.forEach((btn) => {
        btn.addEventListener("click", () => {
          main.classList.toggle("sign-up-mode");
        });
      });
    }
  }, []);


  return (


    <main>

      <div className="box">
        <div className="inner-box">

          {/*FORM CONTAINER */}
          <div className={`forms-wrap justify-center item-center ${isRegistering ? 'sign-up-mode' : ''}`}>


            {isRegistering ? (

              //SignUp Form

              <div className="sign-up-form mt-[4rem] justify-center item-center self-center">
                <div className="actual-form overflow-y-auto justify-center items-center flex-col flex self-center h-full w-full border-gray-500 rounded-[30px]">

                  <div className="logo">
                    <p className="logo-title">PerfTracker</p>
                  </div>

                  <div className="heading">
                    <h2 className="mt-6 mb-6 text-center ">Start your journey as Reseller!</h2>
                  </div>


                  <form onSubmit={handleSignUp} className="sign-up-form w-full mx-auto flex flex-col col-span-1 row-span-1 transition-opacity duration-20 delay-400">

                    {/*TEXTBOX NAME */}
                    <div className="relative w-full h-12 mt-2">
                      <input
                        id="name-signup"
                        type="text"
                        className="input-field"
                        autoComplete="off"
                        required
                        placeholder="Name"
                        onChange={(e) => setNameSignup(e.target.value)}
                        name='name-signup'

                      />
                    </div>

                    {/*TEXTBOX EMAIL */}
                    <div className="relative w-full h-12 mt-2">
                      <input
                        id="email-signup"
                        type="email"
                        className="input-field"
                        autoComplete="off"
                        required
                        placeholder="Email"
                        onChange={(e) => setEmailSignup(e.target.value)}
                        name='email-signup'

                      />
                    </div>


                    {/*TEXTBOX PASSWORD */}
                    <div className="relative w-full h-12 mt-2">
                      <input
                        id="password-signup"
                        type="password"
                        placeholder="Password"
                        minLength="4"
                        className="input-field"
                        autoComplete="off"
                        onChange={(e) => setPasswordSignup(e.target.value)}
                        name="password-signup"
                        required
                      />

                    </div>

                    {/*TEXTBOX CONFIRM PASSWORD */}
                    <div className="relative w-full h-12 mt-2">
                      <input
                        id="confirm-password-signup"
                        type="password"
                        placeholder="Confirm Password"
                        minLength="4"
                        className="input-field"
                        autoComplete="off"
                        onChange={(e) => setConfirmPasswordSignup(e.target.value)}
                        name="confirm-password-signup"
                        required
                      />
                    </div>

                    <button type="submit" className="sign-btn" >Sign Up</button>

                  </form>
                </div>
              </div>

            ) : (

              //login
              <form onSubmit={handleLogin} className="sign-in-form mt-[4rem] justify-center item-center self-center max-w-[260px] w-full mx-auto h-full flex flex-col col-span-1 row-span-1 transition-opacity duration-20 delay-400" >
                <div className="logo">
                  <p className="logo-title">PerfTracker</p>
                </div>

                <div className="heading">
                  <h2 className="my-6">Let's get started!</h2>
                </div>

                <div className="actual-form">
                  {/*TEXTBOX EMAIL */}
                  <div className="input-wrap">
                    <input
                      type="email"
                      placeholder="Email address"
                      minLength="4"
                      className="input-field focus:border-blue-400"
                      autoComplete="off"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/*TEXTBOX PASSWORD */}
                  <div className="input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      minLength="4"
                      className="input-field"
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex flex-row justify-between">
                    {/*CHECKBOX FORGOT PASSWORD */}
                    <div className=" w-full relative ">
                      <div>
                        <label className="text-[#308FFF] text-xs font-normal w-full ml-5">
                          Show Password
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          className="check relative"
                          checked={showPassword}
                          onChange={handleShowPasswordChange}
                        />
                      </div>


                    </div>
                    {/*Forgot password */}
                    <div className="flex flex-row w-full ml-6 items-center">
                      <Link className="text-[#308FFF] text-xs w-full" to="/forgot-password">Forgot password?</Link>
                    </div>
                  </div>
                </div>

                <button type="submit" className="sign-btn" >Log In</button>

              </form>

            )}


            {/* Toggle button for switching between login and registration sections */}
            <div className="bottom-text">
              <p className="text-center">
                {isRegistering ? 'Become a reseller! ' : 'Already have an account? '}
                <span
                  className="toggle"
                  onClick={toggleSection}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {isRegistering ? 'Log In' : 'Sign up'}
                </span>
              </p>
            </div>


          </div>



          <div className="carousel w-full -z-10 ">
            <div className="images-wrapper rounded-[3rem] w-full h-full">
              <MyCarousel />
            </div>


          </div>
        </div>
      </div>
    </main>


  );
};
export default Login
