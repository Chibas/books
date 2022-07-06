import { Typography, Container } from "@mui/material";
import styles from "../styles/footer.module.scss"

const Footer = () => {
  return (
    <footer className={ styles.footer }>
      <Typography variant="caption">
        Bookap 2022
      </Typography>
    </footer>
  )
};

export default Footer;