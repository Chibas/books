import axios, { AxiosResponse } from "axios";
import React from "react";
import { Grid, Typography, Card, Box, Button, Link } from "@mui/material";
import { IBook } from "../../types/books";
import styles from "../../styles/book.module.scss";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useRouter, NextRouter } from "next/router";

const BookDetails: React.FC<BookProps> = ({ book, booksWithSameAuthor }) => {
  const router: NextRouter = useRouter();
  return (
    <Box>
      <Button
        startIcon={<ArrowCircleLeftIcon />}
        color="secondary" variant="text"
        onClick={() => router.push('/books')}
        className={styles.backButton}
      >
          Back to list
      </Button>
      <Card className={styles.bookCard}>
        <Grid container>
          <Grid xs={12} sm={7} md={7} item>
            <img src={book.cover} alt={book.title} />
          </Grid>
          <Grid item xs={12} sm={5} md={5} container>
            <Grid item>
              <Typography variant="h2">{book.title}</Typography>
              <Typography variant="subtitle2">by {book.author}</Typography>
              <Typography variant="subtitle2">ISBN: {book.isbn}</Typography>
             </Grid>
          </Grid>
        </Grid>
        { booksWithSameAuthor.length ? 
          <Box className={styles.slider_wrapper}>
            <Typography variant="h3">You might also like from {book.author}</Typography>
            <div className={styles.slider}>
              {booksWithSameAuthor.map(book => (
                <Link className={styles.slider_slide_link} href={`/books/${book.id}`} key={book.id}>
                  <div className={styles.slider_slide}>
                    <div className={styles.slider_slide_content}> 
                      <img src={book.cover} className={styles.slider_slide_image} alt={book.cover} />
                      <Typography variant="h4">{book.title}</Typography>
                      <Typography variant="subtitle2" >by {book.author}</Typography>
                    </div>
                  </div>
                </Link>
                )
              )}
            </div>
          </Box>
          :
          null
        }
      </Card>
    </Box>
  )
};

export default BookDetails;

export const getServerSideProps =  async (context) => {
  const id: string = context.params.id;
  const res: AxiosResponse = await axios.get('https://hokodo-frontend-interview.netlify.app/data.json'); // with real BE it would be a single entiry request, so it goes for author
  const book: IBook = res.data.books.find(book => book.id === id);
  const booksWithSameAuthor: IBook[] = res.data.books.filter(bookItem => bookItem.author === book.author && bookItem.id !== id);

  return {
    props: {
      book,
      booksWithSameAuthor
    }
  }
};

type BookProps = {
  book: IBook,
  booksWithSameAuthor: IBook[]
};