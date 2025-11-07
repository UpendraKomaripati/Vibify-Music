import { createContext, useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ REGISTER USER
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);

    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setBtnLoading(false);
    }
  }

  // ✅ FETCH CURRENT USER
  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }
useEffect (()=>{

},[])
  return (
    <UserContext.Provider
      value={{
        registerUser,
        fetchUser,
        user,
        isAuth,
        btnLoading,
        loading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export default UserContext;

// ✅ The hook you use inside components
export const UserData = () => useContext(UserContext);
