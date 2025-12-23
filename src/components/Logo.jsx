import styled from "styled-components";

import { useDarkMode } from "../context/DarkModeContext";
import logo from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={darkMode ? logoDark : logo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
