import styled from "@emotion/styled";
import { Link, NavLink } from "react-router-dom";

const HeadingNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #d3d3d3;
  margin-bottom: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  outline: none;
  margin: 0 10px;
  font-weight: bold;

  &.active {
    color: #2863fb;
  }
`;

const StlyedLink = styled(Link)`
  color: black;
  text-decoration: none;
  outline: none;
  margin: 0 10px;
  font-weight: bold;
`;

const HeadingList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const HeadingUser = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export { HeadingNav, HeadingList, HeadingUser, StyledNavLink, StlyedLink };
