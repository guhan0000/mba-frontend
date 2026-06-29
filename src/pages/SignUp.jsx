import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [custName, setCustName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return <div>SignUp</div>;
};

export default SignUp;
