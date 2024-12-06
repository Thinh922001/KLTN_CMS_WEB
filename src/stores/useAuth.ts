import { create } from "zustand";
import { IAuth } from "../Types/Auth";



type State = {
    info: IAuth | null;
    setInfo: (info: IAuth) => void;
  };

const useAuth = create<State>((set) => ({
    info: null,
    setInfo: (info) => set({ info }),
  }));
  
  export default useAuth;