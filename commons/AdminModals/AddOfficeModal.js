import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { customMessage } from "../CustomMessage/CustomMessage";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import axios from "axios";
import Input from "../Input/Input";

const AddOfficeModal = ({ open, onClose, countries }) => {
  const officeFormData = {
    name: "",
    countryId: null,
  };
  // States
  const [formData, setFormData] = useState(officeFormData);
  // Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "/offices",
        { name: formData.name, countryId: formData.countryId },
        { withCredentials: true }
      )
      .then((newOffice) =>
        customMessage("success", `Nueva Oficina: ${newOffice.data.name}`)
      )
      .catch((err) => customMessage("error", err.message));
    onClose();
  };

  const handleCancel = (e) => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            borderRadius: "25px",
          }}
          elevation={3}
        >
          <Avatar
            style={{
              margin: "1rem",
              backgroundColor: "#FB9B14",
            }}
          >
            <DomainAddIcon />
          </Avatar>
          <Typography variant="h5">Nueva Oficina:</Typography>
          <form
            style={{ width: "100%", marginTop: "2rem" }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Input
                name="name"
                label="Denominación"
                handleChange={handleChange}
                type="text"
              />
              <FormControl
                fullWidth
                sx={{ mb: 2, marginTop: "1rem", marginLeft: "1rem" }}
              >
                <InputLabel id="country-label">País</InputLabel>
                <Select
                  labelId="country-label"
                  id="country-select"
                  value={formData.countryId}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value);
                    setFormData({ ...formData, countryId: e.target.value });
                  }}
                  label="País"
                  required
                >
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={handleCancel}
                sx={{
                  mr: 1,
                  backgroundColor: "#1369B4",
                  "&:hover": {
                    backgroundColor: "#FB9B14",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{
                  mr: 1,
                  backgroundColor: "#1369B4",
                  "&:hover": {
                    backgroundColor: "#FB9B14",
                  },
                }}
                type="submit"
              >
                Crear
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
};

export default AddOfficeModal;
