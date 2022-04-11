import Header from "../components/Header";

const Home = ({setAuth, isAuthenticated}) => {
  
  return (
    <>
      <div className="contac">
        
        <Header isAuthenticated={isAuthenticated}/>
      </div>
      <br />
      <h1>Home</h1>
    </>
  )
}

export default Home