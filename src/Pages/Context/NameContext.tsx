import React, {  ReactNode, createContext, useCallback, useState } from 'react';

// Define the shape of the context state
interface NameContextType {
    namepro: object;
    setNamepro: (name: string) => void;
    logoutpro: () => void;
    setProImage:any;
    proImage:any;
    setProPercentage:any;
    ProPercentage:any;
  }
  
  // Create the context with a default value
  const NameContext = createContext<NameContextType | undefined>(undefined);


export const NameProvider = ({ children }: { children: ReactNode }) => {
  const [namepro, setNamepro] = useState({});
  const [proImage, setProImage] = useState("");
  const [ProPercentage, setProPercentage] = useState();
  const logoutpro = useCallback(() => {
    setNamepro({});
    setProImage("")
  }, []);

  return (
    <NameContext.Provider value={{ namepro, setNamepro,logoutpro,setProImage,proImage ,setProPercentage,ProPercentage}}>
      {children}
    </NameContext.Provider>
  );
};

export default NameContext;
