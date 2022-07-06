import Head from "next/head";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { Box, Container, Toolbar, Typography, Card } from "@mui/material";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Bookap'}</title>
        <meta name="description" content={`Your best reading app` + description}/>
        <meta name="robots" content="index, follow"/>
        <meta name="keywords" content={keywords || "Books, reading, art"}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <NavBar />
      <Container sx={{ mt: 2 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default MainLayout;

interface MainLayoutProps {
  children: React.ReactElement
  title?: string;
  description?: string;
  keywords?: string;
}
