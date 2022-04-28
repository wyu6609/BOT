import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NavBar from "./NavBar";
import Error from "../pages/Error";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/">
            <Home />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
