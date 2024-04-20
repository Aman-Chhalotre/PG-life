import { createContext, useContext } from "react";


export const LoginContext = createContext()

export const LoginContextProvider = LoginContext.Provider

export default function useLogin(){
    return useContext(LoginContext)
}




