import React from "react";  
import { useParams } from "react-router-dom";  
import { FaFileAlt, FaKey, FaLock } from "react-icons/fa";  

// The ErrorPage component  
export default function ErrorPage() {  
  const { code } = useParams();  

  const errorDetails = {  
    "404": {  
      message: "Sorry, the page you're looking for doesn't exist.",  
      icon: <FaFileAlt className="w-8 h-8" />,  
      bgColor: "bg-gray-500",  
      imageSrc: "/images/404.png",
    },  
    "401": {  
      message: "You need to login to view this page.",  
      icon: <FaKey className="w-8 h-8" />,  
      bgColor: "bg-yellow-500",  
      imageSrc: "/images/401.png",
    },  
    "403": {  
      message: "You are not authorized to access this page.",  
      icon: <FaLock className="w-8 h-8" />,  
      bgColor: "bg-red-500",  
      imageSrc: "/images/403.png",
    },  
  };  

  // Fallback to 404 if code not recognized  
  const error = errorDetails[code] || errorDetails["404"];  

  return (  
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">  
      <div className="max-w-3xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">  
        {/* Icon */}  
        {/* <div className={`mx-auto mb-6 p-4 rounded-full ${error.bgColor} text-white`}>  
          {error.icon}  
        </div>   */}
        
        {/* Error Code */}  
        <div className="mb-4">  
          <img src={error.imageSrc} alt={`Error ${code}`} className="mx-auto max-w-xs" />  
        </div> 

        {/* Message */}  
        <p className="text-lg mb-6 text-gray-600">{error.message}</p>  
        {/* Button to go back */}  
        <button  
          onClick={() => window.history.back()}  
          className="flex items-center justify-center gap-2 px-4 py-2 bg-hijau text-white rounded-lg hover:bg-green-600 transition"  
        >  
          Back  
        </button>  
      </div>  
    </div>  
  );  
}