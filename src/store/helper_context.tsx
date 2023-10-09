import {createContext, useState} from 'react';


export const Helper_Context = createContext(null);

export const Helper_Context_Provider = ({children}) => {


  //Helper Main Application
 const [role, setRole] = useState<string>('learn')
 const [learn_mode, setLearn_mode] = useState<boolean>(true)

  //Helper application ports


  
  return <Helper_Context.Provider value={{
    //Helper Application ports
    setRole,role,setLearn_mode,learn_mode
  }}>{children}</Helper_Context.Provider>;
};