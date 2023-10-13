import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../../context/GlobalContext'
import Navbar from '../../components/Navbar/Navbar'

export default function HomeLayout() {
    const {changeAppTheme} = useContext(ThemeContext)
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}