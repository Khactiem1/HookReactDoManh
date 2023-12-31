import { createContext, useState } from "react";
import { getAccesTokenLST } from "../Utils/Auth";
interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccesTokenLST()),
  setIsAuthenticated: () => null,
};
export const AppContext = createContext<AppContextInterface>(initialContext);
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialContext.isAuthenticated
  );
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};
