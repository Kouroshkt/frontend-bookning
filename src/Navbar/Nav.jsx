import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Navigation() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <StyledNavbar>
      <StyledHome to="/">Hem</StyledHome>
      <ul>
        <li>
          {!user ? <Link to="/signin">Logga in</Link> :
            <Link onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}>Logga ut</Link>}
        </li>
      </ul>
    </StyledNavbar>
  );
}

const StyledNavbar = styled(Link)`
  display: flex;
  justify-content: end;
  height: 80px;
  width: 100%;
  text-decoration: none;

  ul {
    align-items: center;
    display: flex;
    margin-right: 15px;

    li {
      list-style: none;

      a {
        color: #1820bc;
        margin: 20px;
        font-size: 20px;
        text-decoration: none;

        @media (min-width: 768px) and (max-width: 1060px) {
          margin: 15px;
        }
      }
    }
  }
`;

const StyledHome = styled(Link)`
  align-items: center;
  color: #1820bc;
  display: flex;
  font-size: 28px;
  font-weight: 500;
  width: auto;
  margin: auto;
  margin-left: 25px;
  border:none;
  text-decoration: none;
`
