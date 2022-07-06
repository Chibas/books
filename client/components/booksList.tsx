import Link from 'next/link';
import { useMediaQuery } from '@mui/material';
import { ImageList, ImageListItem, ImageListItemBar, Tooltip, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { IBook } from "../types/books";

const BooksList: React.FC<BookListProps> = ({ books = [] }) => {
  const matchesMobile: boolean = useMediaQuery('(max-width:400px)');
  return (
    <>
      <Typography variant="h4">All books</Typography>
      <ImageList cols={matchesMobile ? 1 : 3}>
        {
          books.length ? books.map((item) => (
            <ImageListItem
              key={item.cover}
              sx={{ transition: 'all 0.3s ease-in', '&:hover': { transform: 'scale(1.03)', zIndex: 10 }}}
            >
              <img
                src={`${item.cover}?w=248&fit=crop&auto=format`}
                srcSet={`${item.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <Link href={`/books/${item.id}`}>
                    <Tooltip title="More Information">
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={'More information'}
                        data-testid="more-button"
                      >
                        <ArrowCircleRightIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                }
              />
            </ImageListItem>
          ))
          :
          <Typography variant="h2">No books availabe at this time</Typography>
         }
      </ImageList>
    </>
  )
};

export default BooksList;

type BookListProps = {
  books: IBook[]
}