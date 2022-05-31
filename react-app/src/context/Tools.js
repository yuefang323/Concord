import { useState, useContext, createContext } from "react";

export const ToolsContext = createContext();
export const useTools = () => useContext(ToolsContext);

export default function ToolsProvider({ children }) {
	const [toggleUsers, setToggleUsers] = useState("");

	return (
		<ToolsContext.Provider value={{ toggleUsers, setToggleUsers }}>
			{children}
		</ToolsContext.Provider>
	);
}
