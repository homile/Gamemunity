import styled from "@emotion/styled";

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 756px;
  margin: 0 auto;
  margin-top: 20px;

  @media (max-width: 756px) {
    width: 90%;
  }
`;

const SortSelect = styled.select`
  margin: 0 10px;
  font-size: 16px;
  text-align: center;
  width: 100px;
`;

const SearchInput = styled.input`
  margin: 0 10px;
  padding: 0 10px;
  font-size: 16px;
  height: 30px;
  width: 100%;
  max-width: 500px;
`;

export { SearchDiv, SortSelect, SearchInput };
