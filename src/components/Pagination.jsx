import { useSearchParams } from "react-router";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import { PAGE_SIZE } from "../utils/constants"; 
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({totalCount}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const numOfPages = Math.ceil(totalCount / PAGE_SIZE);
  function nextPage() {
    if (currentPage === numOfPages) return;
    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }
  function prevPage() {
    if (currentPage === 1) return;
    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }
  if(numOfPages === 1) return null
  return (
    <StyledPagination>
      <P>Showing <span>{(currentPage -1 )*PAGE_SIZE + 1}</span> to <span>{ currentPage === numOfPages ? totalCount : (currentPage * PAGE_SIZE)}</span> of <span>{totalCount}</span> results</P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}><IoIosArrowBack /> Previous</PaginationButton>
        <PaginationButton onClick={nextPage} disabled={currentPage === numOfPages}>Next <IoIosArrowForward /></PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}
