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
          variant="body1"
          color="text.secondary"
          sx={{ margin: "8px" }}
        >
          <b> USUARIOS: </b> 
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ margin: "5px" }}
        >
          <b> email: </b> admin@example.com
          <br />
          <b> contraseña: </b> 12345678
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ margin: "5px" }}
        >
          <b> email: </b>: donquijote@example.com
          <br />
          <b> contraseña: </b> 12345678
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
