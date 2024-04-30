import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; // Import Supabase client

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = supabase.auth.getUser();
        if (data) { 
          const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('id, role')
          .eq('email', email)
          .single();
          console.log(profileData, "inside context")
          
          if (profileError) {
            throw profileError;
          }
  
          if (profileData) {
            console.log('User ID:', profileData.id);
            console.log('User Role:', profileData.role);
            router.push('/home');
          }
        } else { console.log('No user data found in usercontext') };
      }  catch (error) {
        console.error('Sign in error:', error.message);
        toast({
          title: 'Signin Error',
          description: error.message,
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      } 
    };

    fetchUserData();
  }, []);

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

