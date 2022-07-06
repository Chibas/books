import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const NavBar: React.FC = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <LocalLibraryIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Bookap
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);

export default NavBar;