import styled, { css } from "styled-components";
import { Link } from "react-router";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variants = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
  link: css`
    background: none;
    border: none;
    color: var(--color-brand-600);
    padding: 0;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: var(--color-brand-700);
      text-decoration: none;
    }
  `,
};

// Shared styling logic
const buttonStyles = css`
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  ${({ size = "medium" }) => sizes[size]}
  ${({ variant = "primary" }) => variants[variant]}
`;

// Base <button>
const StyledButton = styled.button`${buttonStyles}`;

// Same styles but for <Link>
const StyledLink = styled(Link)`
  ${buttonStyles}
  display: inline-block;
  text-align: center;
`;

// Wrapper component
function Button({ to, children, ...props }) {
  if (to) {
    // If "to" prop is passed, render a <Link>
    return (
      <StyledLink to={to} {...props}>
        {children}
      </StyledLink>
    );
  }

  // Otherwise, render a <button>
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
