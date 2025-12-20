import styled from "styled-components";
import Logo from "../components/Logo";
import LoginForm from "../features/Authentication/LoginForm";
import Headings from "../components/Headings";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return <LoginLayout>
    <Logo/>
    <Headings as="h4">Please log in to the app!</Headings>
    <LoginForm/>
  </LoginLayout>;
}

export default Login;
