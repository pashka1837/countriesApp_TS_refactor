import { useContext } from 'react';
import  './Navbar.css';
// import { BsMoonFill, BsFillSunFill } from 'react-icons/bs';
import { LuFlashlightOff, LuFlashlight } from 'react-icons/lu';
import { ThemeContext } from '../../context/GlobalContext';
LuFlashlightOff
export default function Navbar() {
  const {changeAppTheme, isDarkTheme} = useContext(ThemeContext)
  return (
    <nav>
      <h3 className='logo'>Where in the world?</h3>
      <div className='switch-theme-container'>        
        <button onClick={changeAppTheme} className='switch-theme-btn' type="button">
          {!isDarkTheme          
          ? <><LuFlashlightOff className='moon-icon'/> <span>Dark Mode</span></>
          :<><LuFlashlight className='moon-icon'/> <span>Light Mode</span></>        
          }
        </button>
      </div>

    </nav>
  )
}