import { createContext, useEffect, useState } from "react"

function checkUserTheme() {
    const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
    const isDarkTheme = savedTheme ?? window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkTheme;
}



export const ThemeContext = createContext();

export default function GlobalContext({children}) {
    const [isDarkTheme, setTheme] = useState(checkUserTheme());

    useEffect(()=>{
        document.body.classList.toggle('dark', isDarkTheme);
    }, [isDarkTheme])
       

    function changeAppTheme() {
        setTheme(!isDarkTheme);
        localStorage.setItem('isDarkTheme', !isDarkTheme);
        
    }

  return (
    <ThemeContext.Provider value={{changeAppTheme, isDarkTheme}}>
        {children}
    </ThemeContext.Provider >
  )
}