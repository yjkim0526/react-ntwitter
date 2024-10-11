import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Profile from "./routes/porfile"
import Home from "./routes/home"
import Layout from "./components/layout"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import LoadingScreen from "./components/loading-screen"
import { useEffect, useState } from "react"
import { auth } from './firebase';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      },      
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  // Add more routes as needed...
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
  box-sizing: border-box;
  }
  body{
  background-color:black;
  color:white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoding] = useState(true);
  const init = async() => {
    // wait for firebase 
    await auth.authStateReady(); // 최초 인증 상태가 완료될때 실행되는 Promise를 return ( Firebase가 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인하는 동안 기다림 )

    setLoding(false);
    //setTimeout(() => setLoding(false), 2000) // test
  }
  useEffect(() => {
    init();
  },[])

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  )
}

export default App
