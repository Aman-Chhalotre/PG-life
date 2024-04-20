import { useContext, createContext } from "react";

export const interestedProperty = createContext()

export const InterestedPropertyProvider = interestedProperty.Provider

export default function useInterested(){
    return useContext(interestedProperty)
}