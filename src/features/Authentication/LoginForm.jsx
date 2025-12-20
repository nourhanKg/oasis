import { useState } from "react";

import useLogin from "./useLogin"; 

import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import FormControlVertical from "../../components/FormControlVertical";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isLoginingIn} = useLogin();
  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return;
    login({email, password}, {
      onSettled: () => {
        setEmail("")
        setPassword("")
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormControlVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControlVertical>
      <FormControlVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControlVertical>
      <FormControlVertical>
        <Button size="large" disabled={isLoginingIn}>Login</Button>
      </FormControlVertical>
    </Form>
  );
}

export default LoginForm;
