import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";


export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <StyledNavbar>
      <Logo to="/" onClick={closeMenu}>
        <LogoImg src="logo.jpeg" alt="Logo" />
      </Logo>

      <Hamburger onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </Hamburger>

      <Menu isOpen={isOpen}>
        {user && (
          <StyledLink to="/profile" onClick={closeMenu}>
            Mitt konto
          </StyledLink>
        )}
        <StyledLink to="/about" onClick={closeMenu}>
          Om oss
        </StyledLink>
        <StyledLink to="/contact" onClick={closeMenu}>
          Hitta oss
        </StyledLink>
        {!user ? (
          <StyledLink to="/createaccount" onClick={closeMenu}>
            Skapa konto
          </StyledLink>
        ) : (
          <StyledHello>Hej {user.name}</StyledHello>
        )}
        {!user ? (
          <StyledLink to="/signin" onClick={closeMenu}>
            Logga in
          </StyledLink>
        ) : (
          <StyledLogout
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logga ut
          </StyledLogout>
        )}
      </Menu>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #04162C;
  padding: 1rem 2rem;
  position: relative;
`;

const Logo = styled(Link)`
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 120px;

  @media (max-width: 768px) {
    width: 90px;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;

  span {
    height: 3px;
    width: 25px;
    background: white;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #04162C;
    position: absolute;
    top: 70px;
    right: 0;
    width: 90%;
    padding: 1rem;
    display: ${props => (props.isOpen ? "flex" : "none")};
    z-index: 10;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1rem;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  background: none;
  border: none;

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

const StyledHello = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: 500;
`;

const StyledLogout = styled.button`
  color: white;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #c0dffc;
  }
`;
