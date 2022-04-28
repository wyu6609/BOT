// import { React, useState } from "react";

// const SignUpForm = ({ onLogin, loginSound, errorSound }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");

//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setErrors([]);
//     setIsLoading(true);
//     fetch("/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//         password_confirmation: passwordConfirmation,
//         first_name: firstName,
//         last_name: lastName,
//       }),
//     }).then((r) => {
//       setIsLoading(false);
//       if (r.ok) {
//         r.json().then((user) => {
//           alert("success");
//           loginSound();
//           onLogin(user);
//         });
//       } else {
//         r.json().then((err) => {
//           errorSound();
//           setErrors(err.errors);
//         });
//       }
//     });
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         first name
//         <input
//           type="text"
//           name="first-name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </label>
//       <label>
//         last name
//         <input
//           type="text"
//           name="last-name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </label>
//       <label>
//         username:
//         <input
//           type="text"
//           name="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <label>
//         password:
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         password!:
//         <input
//           type="password"
//           name="pass-confirmation"
//           value={passwordConfirmation}
//           onChange={(e) => setPasswordConfirmation(e.target.value)}
//         />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// };

// export default SignUpForm;
import * as React from "react";
import useState from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignUpForm({
  onLogin,
  showLogin,
  setShowLogin,
  loginSound,
  errorSound,
  signUpSound,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    let passwordConfirmation = data.get("passwordConfirmation");
    let firstName = data.get("firstName");
    let lastName = data.get("lastName");
    console.log(username, password, passwordConfirmation, firstName, lastName);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          alert("success");
          loginSound();
          onLogin(user);
        });
      } else {
        r.json().then((err) => {
          errorSound();
        });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    signUpSound();
                    setShowLogin(!showLogin);
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUpForm;
