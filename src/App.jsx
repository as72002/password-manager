import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import { createBrowserRouter , RouterProvider ,Outlet} from "react-router-dom";

function Layout(){

  return  (
    <>
      <Navbar />
      <Outlet /> {/* This is where the routed content will appear */}
      <Manager />
      <Footer />
    </>
  );
}

function App() {

  const router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      },]
    }
  ])
  
  return (
    
      <>
        
       
        <RouterProvider router={router}/>
        
      </>
  
  );
}

export default App;
