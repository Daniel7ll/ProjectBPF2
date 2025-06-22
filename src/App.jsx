import React from 'react';
import { useState } from 'react'; 
import './assets/tailwind.css'; 
import { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";   
import GuestLayout from './layouts/GuestLayout';
import ForumLayout from './layouts/ForumLayout';
// import ErrorPage from './pages/ErrorPage'; 
const Guest = React.lazy(() => import("./pages/Guest"));
const Forum = React.lazy(() => import("./pages/ForumPage"));


function App() {  
  const [count, setCount] = useState(0)   

  return (  
    <Suspense fallback={<div>Loading...</div>}> 
      <Routes>  
        <Route element={<GuestLayout/>}>  
          <Route path="/guest" element={<Guest />} />  
          {/* Dynamic error page route  
          {/* <Route path="/error/:code" element={<ErrorPage />} />    
          <Route path="products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetail />} />  */}
          {/* Auth routes */}  
        </Route>   
        <Route element={<ForumLayout/>}>
          <Route path="/" element={<Forum />} />
        </Route>
      </Routes>  
    </Suspense>  
  )  
}  

export default App