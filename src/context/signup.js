import { createContext, useContext } from "react";


export const SignupContext = createContext()

export const SignupContextProvider = SignupContext.Provider

export default function useSignup(){
    return useContext(SignupContext)
}
