import '../styles/logo.scss'
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to='/'><h1 className='logo'>Ask Ba</h1></Link>
  )
}

export default Logo