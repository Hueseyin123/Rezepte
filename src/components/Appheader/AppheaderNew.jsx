"use client";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import FoodBankIcon from "@mui/icons-material/FoodBank";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { deepOrange } from "@mui/material/colors";

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  const initials = `${name?.split(" ")[1]?.[0] || ""}${name?.split(" ")[0]?.[0] || ""}`;
  return {
    sx: {
      bgcolor: name ? stringToColor(name) : deepOrange[500],
      width: 32,
      height: 32,
      fontSize: 14,
    },
    children: initials || "U",
  };
}


export default function AppHeaderNew() {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuthContext();


  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "theme-blue"
  );

  const applyTheme = (t) => {
    setTheme(t);
    document.documentElement.className = t;
    localStorage.setItem("theme", t);
  };

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  if (isLoading) {
    return <header className="header">Lade…</header>;
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "var(--appbar-bg)",
        color: "var(--appbar-text)",
        backdropFilter: "blur(12px)"
      }}
      elevation={1}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FoodBankIcon sx={{ fontSize: 34 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Rezepte
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", gap: 1, mr: 3 }}>
            <button
              onClick={() => applyTheme("theme-light")}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer"
              }}
            >
              ☀️
            </button>

            <button
              onClick={() => applyTheme("theme-dark")}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #333",
                background: "#222",
                color: "white",
                cursor: "pointer"
              }}
            >
              🌙
            </button>

            <button
              onClick={() => applyTheme("theme-blue")}
              style={{
                padding: "5px 10px",
                borderRadius: "6px",
                border: "1px solid #1976d2",
                background: "#1976d2",
                color: "white",
                cursor: "pointer"
              }}
            >
              🔵
            </button>
          </Box>

          {!user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <LoginIcon sx={{ fontSize: 26 }} />
                <Typography
                  variant="body1"
                  component={RouterLink}
                  to="/signin"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".12rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Einloggen
                </Typography>
              </Box>

              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <ExitToAppIcon sx={{ fontSize: 26 }} />
                <Typography
                  variant="body1"
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".12rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Registrieren
                </Typography>
              </Box>

            </Box>
          ) : (

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar {...stringAvatar(user?.username)} />

              <Typography
                variant="body1"
                component={RouterLink}
                to="/profile"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".12rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {user?.username}
              </Typography>

              <Box
                onClick={handleLogout}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                }}
              >
                <LogoutIcon sx={{ fontSize: 26 }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "inherit",
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}