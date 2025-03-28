import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./authSlice";
import { loginUser } from "./AuthApi";
import { NavLink, useNavigate } from "react-router-dom";
import Image from '../../assets/login2.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      dispatch(loginSuccess(data));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if(data.user.role === "user"){
        navigate("/user");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container
  sx={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Paper
    elevation={6}
    sx={{
      width: "850px",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "white",
    }}
  >
    <Grid container>
      <Grid
  item
  xs={12}
  md={6}
  sx={{
    background: "#051149", 
    backgroundImage: `url(${Image})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", 
    alignItems: "center",
    p: 4,
    color: "white",
  }}
>
  <Typography variant="body2" textAlign="center" sx={{ fontSize: "18px", opacity: 0.8 }}>
    Bienvenue sur la plateforme de gestion des dépenses des établissements
  </Typography>
</Grid>


      <Grid item xs={12} md={6} sx={{ p: 5, position: "relative" }}>
        <Typography
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "#1B6EBC",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Bienvenue à nouveau
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 6, mb: 1 }}>
          Connectez-vous à votre compte
        </Typography>

        <TextField
          fullWidth
          label="Adresse email"
          variant="standard"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Mot de passe"
          variant="standard"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#1B6EBC",
            "&:hover": { backgroundColor: "#24619b" },
            borderRadius: "20px",
            py: 1,
          }}
          onClick={handleLogin}
        >
          Connexion
        </Button>

        <Typography textAlign="center" mt={2}>
          <NavLink to="/register" style={{ color: "#6E1ED5", fontSize: "14px", display: "block", marginBottom: "10px" }}>
            Créer un compte
          </NavLink>
        </Typography>
      </Grid>
    </Grid>
  </Paper>
</Container>

  );
};

export default Login;
