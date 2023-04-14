import { Dispatch, SetStateAction, createContext, useContext } from "react";

export type UserDataType = string | null;


type UserDataContextType = [UserDataType,Dispatch<SetStateAction<UserDataType>>] | null;

export const userDataContext = createContext<UserDataContextType>(null);

export const useUserData = () => useContext(userDataContext);
