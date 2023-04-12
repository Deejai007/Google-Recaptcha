import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
function App() {
  const recaptchaRef = useRef(null);
  const [currentForm, setForm] = useState("");
  const handleExpire = () => {
    setForm((currentForm) => {
      return { ...currentForm, token: null };
    });
  };
  const handleToken = (token) => {
    console.log(token);
    setForm((currentForm) => {
      return { ...currentForm, token };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputVal = await e.target[0].value;
    console.log(inputVal);
    const token = recaptchaRef.current.getValue();
    console.log(token);
    if (!token) {
      alert("Please checkmark captcha");
      return;
    }

    recaptchaRef.current.reset();
    axios
      .post("http://localhost:2000/post", {
        inputVal: inputVal,
        token: token,
      })
      .then((response) => {
        if (response.data) {
          console.log("Other things to do");
        }
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="input" />
        <ReCAPTCHA
          ref={recaptchaRef}
          onChange={handleToken}
          onExpired={handleExpire}
          sitekey="6LeSGHwlAAAAAG9hjh0QAO6Vzn-Sw5dOWHSvxjBD"
        />
        <button type="submit">Submit</button>
      </form>
      ;
    </div>
  );
}

export default App;
