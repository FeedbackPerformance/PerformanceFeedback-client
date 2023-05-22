import * as React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function Welcome() {
  return (
    <Card
      sx={{
        maxWidth: "600px",
        margin: "10px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image="/Performance Feedback.png"
        alt="Bloqued"
        sx={{
          p: "10px",
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Bienvenido
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por favor, Inicie Sesión:
        </Typography>

        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Email: 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"->"} admin@example.com
          {"->"} donquijote@example.com
        </Typography>

        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Contraseña: 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          12345678
        </Typography>
      </CardContent>

      <CardActions>
        <Link href="/login">
          <Button size="small" color="primary">
            Login
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
