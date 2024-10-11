import { Outlet } from "react-router-dom";

export default function Layout(){
  return (
    <>
      <h2>layout Test</h2>
      <Outlet />
    </>
  )
}