import styled, {css} from "styled-components"
const Headings = styled.h1`
    ${props => props.as === "h1" && css`
        font-size:3rem;
        font-weight: 600;
        /* line-height: 5.6rem;
        color: var(--color-grey-0);
        letter-spacing: -0.5px; */
    `}
    ${props => props.as === "h2" && css`
        font-size: 2rem;
        font-weight: 600;
        /* line-height: 4.8rem;
        color: var(--color-grey-0);
        letter-spacing: -0.5px; */
    `}
    ${props => props.as === "h3" && css`
        font-size: 2rem;
        font-weight: 500;
        /* line-height: 4rem;
        color: var(--color-grey-0);
        letter-spacing: -0.5px; */
    `}
`
export default Headings;

