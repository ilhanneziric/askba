import Logo from "../components/Logo";

const Home = ({setAuth}) => {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  }
  return (
    <>
      <Logo/> <br />
      <h1>Home</h1>
      <button onClick={(e) => logout(e)}>Log Out</button>
    </>
  )
}

export default Home