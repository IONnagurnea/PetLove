import { Search } from "@mui/icons-material";
import React, { useContext } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {toast} from 'react-toastify';


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Header = ({setSearchBreed}) => {

  const { user, dispatch} = useContext(AuthContext);

  const logout = async() => {
    dispatch({type: "LOGOUT"});
    window.localStorage.removeItem("user");
    const {data} = await axios.get("/logout");
    toast(data.message);
  };

  const handleChange = e => {
    setSearchBreed(e.target.value.toLowerCase());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search for breeds" onChange={handleChange} />
            <Search style={{ color: "gray", fontSize: 16 }}/>
          </SearchContainer>
          <Link style={{textDecoration: "none"}} to="/add-pet">
            <MenuItem>Add a pet</MenuItem>
          </Link> 
        </Left>
        <Center>
         <Link style={{textDecoration: "none"}} to="/">
          <Logo>Pet Love</Logo>
         </Link>
        </Center>
        <Right>
          {!user ? (
            <>
              <Link style={{textDecoration: "none"}} to="/signup">
                <MenuItem>Register</MenuItem>
              </Link>   
              <Link style={{textDecoration: "none"}} to="/signin">
                <MenuItem>Login</MenuItem>
              </Link>
            </>
            ) : (
            <>
              <Link style={{textDecoration: "none"}} to="/">
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;