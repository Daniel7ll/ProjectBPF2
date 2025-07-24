import { useState, useEffect } from "react";  
import { FaUser } from "react-icons/fa";  
import PageHeader from "../components/PageHeader";  
// If CustomerFormModal is still needed, keep it, or remove if not  
import CustomerFormModal from "../components/CustomerFormModal";  

export default function User() {  
  const [users, setUsers] = useState([]);  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [formData, setFormData] = useState({  
    customerId: "",  
    customerName: "",  
    email: "",  
    phone: "",  
    loyalty: "Bronze",  
  });  

  // Fetch users from API on component mount  
  useEffect(() => {  
    fetch("https://dummyjson.com/users")  
      .then((res) => res.json())  
      .then((data) => {  
        // data.users contains the array of users  
        setUsers(data.users);  
      })  
      .catch((err) => console.error("Error fetching users:", err));  
  }, []);  

  const handleChange = (e) => {  
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });  
  };  

  const handleAddCustomer = () => {  
    if (!formData.customerName || !formData.email || !formData.phone) return;  

    const newId = users.length  
      ? users[users.length - 1].customerId + 1  
      : 1;  
    setUsers([...users, { customerId: newId, ...formData }]);  
    setFormData({  
      customerId: "",  
      customerName: "",  
      email: "",  
      phone: "",  
      loyalty: "Bronze",  
    });  
    setIsModalOpen(false);  
  };  

  return (  
    <div className="p-6">  
      <PageHeader title="User List" breadcrumb={["Dashboard", "Users"]} />  

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mt-6">  
        <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg text-sm">  
          <thead className="bg-gray-100">  
            <tr>  
              <th className="border border-gray-300 px-6 py-3 text-left">ID</th>  
              <th className="border border-gray-300 px-6 py-3 text-left">Name</th>
              <th className="border border-gray-300 px-6 py-3 text-left">User Name</th>    
              <th className="border border-gray-300 px-6 py-3 text-left">Email</th>  
              <th className="border border-gray-300 px-6 py-3 text-left">Phone</th>  
              <th className="border border-gray-300 px-6 py-3 text-left">Gender</th>  
              <th className="border border-gray-300 px-6 py-3 text-left">Age</th>  
            </tr>  
          </thead>  
          <tbody>  
            {users.map((user) => (  
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.id}</td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">  
                  <div className="inline-flex items-center gap-2">  
                    <FaUser className="text-gray-500" />  
                    <span>{user.firstName} {user.lastName}</span>  
                  </div>  
                </td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.username}</td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.email}</td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.phone}</td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.gender}</td>  
                <td className="border border-gray-300 px-6 py-3 text-gray-800">{user.age}</td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  
}