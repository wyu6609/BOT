// import React from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@mui/material/";
// const NavBar = ({ onLogin }) => {
//   function handleLogoutClick() {
//     fetch("/logout", { method: "DELETE" }).then((r) => {
//       if (r.ok) {
//         onLogin(null);
//       }
//     });
//   }
//   return (
//     <nav>
//       <Link to="/"> Home </Link>
//       <Link to="/about"> About </Link>
//       <Button variant="contained" onClick={handleLogoutClick}>
//         Logout
//       </Button>
//     </nav>
//   );
// };

// export default NavBar;

import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function NavBar({ setUser }) {
  const logoutSound = () => {
    let logoutAudio = new Audio("/sounds/logout-sound.mp3");
    logoutAudio.play();
  };
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logoutSound();
        setUser(null);
      }
    });
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SmartToyIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">BOT MARKET</Button>
          </Typography>
          <Button color="inherit">Cart</Button>
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
