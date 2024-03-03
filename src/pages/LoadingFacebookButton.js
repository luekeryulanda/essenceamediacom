import React, { useState, useEffect } from "react";

export const LoadingFacebookButton = (props) => {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent(percent + 10);
  };

  const checkScreenSwitch = () => {
    // let unique_id = localStorage.getItem("unique_id");
    // let form_data = localStorage.getItem("form_data");

    // if (unique_id || form_data) {
    //   form_data = JSON.parse(form_data);
    //   unique_id = JSON.parse(unique_id);
    //   fetch(`${API_BE}/users/` + unique_id)
    //     .then((res) => res.json())
    //     .then((response) => {
    //       props.setValue(response.data.status)
    //     })
    //     .catch(() => { });
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((oldValue) => {
        const newValue = oldValue + 1;
        checkScreenSwitch();
        // if (newValue > 20) {
        //   checkScreenSwitch();
        // }

        if (newValue > 80) {
          // newValue;
          // clearInterval(interval);
        }

        return newValue;
      });
    }, 3000);

    if (!props.isModalVisible) {
      clearInterval(interval)
    }


    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loading__facebook">
      <div className="facbook__logo">
        <img src="/facebook__loading.png" />
      </div>
      <div>

        <img src="/97443-loading-gray.gif" />
      </div>
    </div>
  )
}