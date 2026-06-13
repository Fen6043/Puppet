'use client'
import {createContext,useContext,useState} from 'react';

type Parts = {
  cpu: string;
  gpu: string;
  ram: string;
  psu: string;
  storage: string;
  cooler: string;
  motherboard: string;
  cabinet: string;
  monitor: string;
  keyboard: string;
  mouse: string;
};

type PartsContextType = {
  parts: Parts;
  setParts: React.Dispatch<React.SetStateAction<Parts>>;
};

const PartsContext = createContext<PartsContextType|null>(null)

// this can be written in layout but since I need layout to be kept as server side provider is declared here
export function PartsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const [parts,setParts] = useState<Parts>({cpu: "",gpu: "",ram: "",psu: "",storage: "",cooler: "",motherboard: "",cabinet: "",monitor: "",keyboard: "",mouse: ""})
    return(
        <PartsContext.Provider value={{parts,setParts}}>{children}</PartsContext.Provider>
    )
}

export function usePartsContext(){
    return useContext(PartsContext)!
}