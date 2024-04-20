import { createContext, useContext } from "react";

export const DetailContext = createContext({
    detail: null,
    setDetail : ()=>{}
})

export const DetailContextProvider = DetailContext.Provider

export default function useDetail(){
    return useContext(DetailContext)
}

