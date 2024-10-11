import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount(){

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch(name){
      case "name": setName(value); break;
      case "email": setEmail(value); break;
      case "password": setPassword(value); break;
      default: break;
    }
  }

  const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || name === "" || email === "" || password === "" ) return;

    try{
      console.log(">> onSubmit..")

      setLoading(true);
      // create an account 
      // Promise<UserCredential> 성공하면 사용자는 즉시 로그인됨, 계정생성이 실패 (계정이 이미 존재하거나 패스워드가 유효하지 않을 경우) 에러
      const credentials = await createUserWithEmailAndPassword(auth, email, password); 
      console.log(name, email);
      // console.log(credentials);
      console.log(credentials.user);

      // set the name fo the user.
      await updateProfile(credentials.user, { displayName: name })

      // redirect to the home page
      navigate("/");

    } catch(e) {
      // 계정생성이 실패 (계정이 이미 존재하거나 패스워드가 유효하지 않을 경우) 에러
      console.log(e);
      // setError
    }
    finally{
      setLoading(false);
    }

  }

  return(
    <Wrapper>
      <Title>Create Account</Title>
      <Form onSubmit={onSubmit}>
        <Input name="name" onChange={onChange} value={name} placeholder="Name" type="text" required />
        <Input name="email" onChange={onChange} value={email} placeholder="Email" type="email" required />
        <Input name="password" onChange={onChange} value={password} placeholder="Password" type="password" required />
        <Input type="submit" value={ isLoading ? "Loading..." : "Create Account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
  </Wrapper>
  )
}
