import { useState } from "react";
import { Container, Grid, Paper, TextField, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { registerUser } from "./AuthApi";
import { NavLink, useNavigate } from "react-router-dom";
import Image from '../../assets/login2.jpg';


const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password, role);
      alert("Inscription réussie !");
      navigate("/");
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
      display: "flex",
      width: "850px",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "white",
    }}
  >
    <Grid container sx={{ width: "100%" }}>
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

      <Grid
        item
        xs={6} 
        sx={{ p: 5, position: "relative" }}
      >
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
          Enregistrez votre compte
        </Typography>

        <TextField
          fullWidth
          label="Nom"
          variant="standard"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          margin="normal"
          type="email"
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

        <FormControl fullWidth margin="normal">
          <Select value={role} onChange={(e) => setRole(e.target.value)} variant="standard">
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

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
          onClick={handleRegister}
        >
          Enregistrer
        </Button>

        <Typography textAlign="center" mt={2}>
          <NavLink to="/" sx={{ color: "#6E1ED5", fontSize: "14px", display: "block", mb: 1 }}>
            Si vous avez une compte? Connecter
          </NavLink>
        </Typography>
      </Grid>
    </Grid>
  </Paper>
</Container>

  );
};

export default Registration;
