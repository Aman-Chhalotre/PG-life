import { createContext, useContext } from "react";

export const searchContext = createContext({
    search: '',
    setSearch: ()=>{}
})

export const SearchContextProvider = searchContext.Provider

export default function useSearch(){
    return useContext(searchContext)
}