import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <StyledNavbar>
      <Logo to="/">MyCarApp</Logo>
      <Menu>
        {!user ? (<StyledLink to="/createaccount">Skapa konto</StyledLink>) 
        : (<StyledHello   as="a" >Hej {user.name}</StyledHello>)}
          {!user ? (
            <StyledLink to="/signin">Logga in</StyledLink>
          ) : (
            <StyledLink
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logga ut
            </StyledLink>
          )}
      </Menu>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1e3c72, #2a5298); 
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
 
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  font-weight: 500;

  &:hover {
    color: #c0dffc;
  }

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: white;
    bottom: -4px;
    left: 0;
    transition: width 0.3s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;
const StyledHello = styled(Link)`
  color: white;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 500;
`;
