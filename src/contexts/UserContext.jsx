import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; // Import Supabase client

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);

  /*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('id', user.id)
            .single();
          if (error) {
            throw error;
          }
          setUserData(data);
          setUserID(user.id);
          setUserRole(user.role);
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);
*/
  const value = {
    userID,
    userData,
    userRole,
    error,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

