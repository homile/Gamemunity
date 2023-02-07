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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const LoadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 10px;
  font-weight: 500;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export { SearchDiv, SortSelect, SearchInput, ButtonDiv, LoadButton };
