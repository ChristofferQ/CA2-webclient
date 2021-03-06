import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import Chuck from "./router/Chuck";



function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )

}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => { facade.fetchData().then(data => setDataFromServer(data.msg)); }, [])

  return (
    <div>
      <h3>{dataFromServer}</h3>
    </div>
  )

}

function Menu(){
  return(
    <div>
    <h1>Book viewing</h1>

  </div>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }



  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>
          <LoggedIn />
          <Chuck/>
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )

}
export default App;
