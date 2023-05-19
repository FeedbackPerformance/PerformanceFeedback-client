import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Tag, Popconfirm } from "antd";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Table from "../../commons/Table";
import { customMessage } from "../../commons/CustomMessage/CustomMessage";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TeamCard = ({ team }) => {
  // States
  const [openCard, setOpenCard] = useState(false);
  const [teamMembers, setTeamMembers] = useState(team.users);
  const [removeUserTeam, setRemoveUserTeam] = useState(false);
  // Redux
  const user = useSelector((store) => store.user);
  // Togglers
  const toggleCard = () => {
    setOpenCard((prevState) => !prevState);
  };

  const alertConfirm = (member) => {
    setRemoveUserTeam((prevState) => !prevState);
    handleRemoveUser(member);
  };
  const alertCancel = () => {
    customMessage("info", "Acción cancelada");
  };
  useEffect(() => {
    axios
      .get(`/api/teams/${team.id}`, { withCredentials: true })
      .then((res) => setTeamMembers(res.data.users))
      .catch((err) => customMessage("error", err.response));
  }, [removeUserTeam, openCard]);

  const handleRemoveUser = (member) => {
    axios
      .put(
        `/api/users/${member.id}`,
        { team: null },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        customMessage(
          "success",
          `Usuario (${user.fileNumber}) Eliminado del Equipo`
        ),
          setRemoveUserTeam(false);
      })
      .catch((err) => customMessage("error", err.message));
  };
  const headersUser = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerClassName: "theme--header",
      headerAlign: "flex",
      sx: { paddingLeft: "5px" },
    },
    {
      field: "firstName",
      headerName: "Nombre",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "fileNumber",
      headerName: "Legajo",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "shift",
      headerName: "Turno",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "position",
      headerName: "Puesto",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => `${params.value?.name || ""}`,
    },
    {
      field: "category",
      headerName: "Categoría",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => `${params.value?.name || ""}`,
    },
  ];
  const headersAdmin = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerClassName: "theme--header",
      headerAlign: "flex",
      sx: { paddingLeft: "5px" },
    },
    {
      field: "firstName",
      headerName: "Nombre",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "lastName",
      headerName: "Apellido",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "fileNumber",
      headerName: "Legajo",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "shift",
      headerName: "Turno",
      flex: 1,
      headerClassName: "theme--header",
    },
    {
      field: "position",
      headerName: "Puesto",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => `${params.value?.name || ""}`,
    },
    {
      field: "category",
      headerName: "Categoría",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => `${params.value?.name || ""}`,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      type: "number",
      headerClassName: "theme--header",
      renderCell: (index) => (
        <Tooltip placement="left" title="Quitar del Equipo">
          <IconButton aria-label="remove">
            <Popconfirm
              title="Remover Usuario del Equipo"
              description="Seguro que quiere remover este Usuario?"
              onConfirm={() => alertConfirm(index.row)}
              onCancel={alertCancel}
              okText="Sí"
              cancelText="No"
            >
              <PersonRemoveIcon />
            </Popconfirm>
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  return (
    <Grid item xs={12} sm={6} md={openCard ? 12 : 6} lg={openCard ? 12 : 6}>
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          style={{
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tag
              style={{
                borderRadius: 25,
                color: "#565659",
                backgroundColor: "#EBCDFF",
                borderColor: "#EBCDFF",
                maxHeight: "24px",
              }}
            >
              <Typography variant="subtitle2">{team.name}</Typography>
            </Tag>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={toggleCard}>
                {openCard ? "Cerrar" : "Ver Equipo"}
              </Button>
              {user.isAdmin ? (
                <Tooltip placement="top" title="Editar">
                  <IconButton
                    aria-label="edit-team"
                    onClick={() => console.log(team)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </div>
          </div>
          {openCard ? (
            <>
              <Typography variant="h6">Integrantes:</Typography>
              {user.isAdmin ? (
                <Table
                  columns={headersAdmin}
                  rows={teamMembers || team.users}
                  pageSize={5}
                />
              ) : (
                <Table
                  columns={headersUser}
                  rows={teamMembers || team.users}
                  pageSize={5}
                />
              )}
            </>
          ) : (
            <Image
              src="/team.jpg"
              alt="default-team-img"
              width={350}
              height={200}
              priority
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TeamCard;
