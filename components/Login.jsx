import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/user";
import { Typography, Paper, Button, Container } from "@mui/material";
import { customMessage } from "../commons/CustomMessage/CustomMessage";
import axios from "axios";
import Image from "next/image";
import Input from "../commons/Input/Input";

export const Login = () => {
  const initialFormState = {
    email: "",
    password: "",
  };
  // Redux
  const dispatch = useDispatch();
  // Router
  const router = useRouter();
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  // Handlers
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = handleEmail(formData.email);
    let cookie;

    if (validEmail) {
      try {
        cookie = await axios.post("/api/auth/login", formData, {
          withCredentials: true,
        });
        dispatch(logIn(cookie.data));
        customMessage("success", "Sesión Iniciada!");
        router.push("/");
      } catch (error) {
        return error;
      }
    } else {
      customMessage("error", "Credenciales inválidas, intente otra vez");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          borderRadius: "8px",
        }}
        elevation={3}
      >
        <Typography>Te damos la bienvenida a</Typography>
        <Image
          src="/Performance Feedback.png"
          alt="Performance Feedback Logo"
          width={190}
          height={50}
          priority
        />
        <form
          style={{ width: "100%", marginTop: "2rem" }}
          onSubmit={handleSubmit}
        >
          <Typography
            variant="subtitle2"
            style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Usuario
          </Typography>
          <Input
            name="email"
            label="mail@example.com"
            handleChange={handleChange}
            type="email"
          />
          <Typography
            variant="subtitle2"
            style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
          >
            Contraseña
          </Typography>
          <Input
            name="password"
            label="Ingresar 6 dígitos"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Button
            style={{
              marginTop: "1.5rem",
              backgroundColor: "#E4E4E4",
              color: "#8D8D8D",
              padding: "10px",
              borderRadius: "8px",
            }}
            type="submit"
            fullWidth
            variant={
              formData.email === "" || formData.password.length < 6
                ? "disabled"
                : "contained"
            }
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
