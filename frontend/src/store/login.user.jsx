import React, { createContext, useContext, useState } from "react";

// Create a context for user data
const userDataContext = createContext();

// Custom hook to access user data context
const useData = () => useContext(userDataContext);

// Provider component for user data
const DataProvider = ({ children }) => {
    // State to manage user data
    const [userData, setUserDataState] = useState({
        name: "",   // Default name is an empty string
        email: ""   // Default email is an empty string
    });

    // Function to update user data (partial updates allowed)
    const setUserData = (newData) => {
        setUserDataState((prevData) => ({
            ...prevData, // Keep previous data
            ...newData   // Update with new data (can be partial)
        }));
    };

    return (
        <userDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </userDataContext.Provider>
    );
};
export { useData, DataProvider };
