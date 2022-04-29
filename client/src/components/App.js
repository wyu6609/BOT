import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NavBar from "./NavBar";
import Market from "../pages/Market";
import Error from "../pages/Error";
import Footer from "./Footer";
import Checkout from "./checkout/Checkout";

function App() {
  const [user, setUser] = useState(null);
  const [marketBlink, setMarketBlink] = useState(true);
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        marketBlink={marketBlink}
        setMarketBlink={setMarketBlink}
      />
      <main>
        <Switch>
          <Route path="/market">
            <Market />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>

          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
