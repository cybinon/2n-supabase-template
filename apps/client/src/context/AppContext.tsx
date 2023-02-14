import { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../utils/axiosHook";

const AppContext = createContext<any>({})
export default function AppContextProvider({ children }: any) {
  const [app, setApp] = useState<any>({});
  const { fetch } = useAxios("/init", {}, "GET");

  useEffect(() => {
    fetch().then((data) => setApp(data));
  }, []);

  return (
    <AppContext.Provider value={app}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext);
