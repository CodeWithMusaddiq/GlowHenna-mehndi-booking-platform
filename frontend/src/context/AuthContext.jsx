// import { createContext, useState, useEffect, useContext } from "react";

// export const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("token", userData.token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthProvider;
import { createContext, useState, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components -- Context is intentionally exported with its provider.
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- Shared hook belongs with the context it consumes.
export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });
  const loading = false;

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;