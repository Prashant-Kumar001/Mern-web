import React, { createContext, useContext, useState } from "react";
const TokenContext = createContext();
const useToken = () => useContext(TokenContext);
const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const [name, setName] = useState('');
    const callSetToken = (newToken, name) => {
        setToken(newToken);
        setName(name);
        if (newToken) {
            localStorage.setItem("token", newToken);
            localStorage.setItem("name", name);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
        }
    };

    const deleteToken = () => {
        setToken(null);
        setName('');
        localStorage.removeItem("token");
        localStorage.removeItem("name");
    };
    return (
        <TokenContext.Provider value={{ token, callSetToken, deleteToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export { useToken, TokenProvider };
