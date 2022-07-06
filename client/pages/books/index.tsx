import BooksList from '../../components/booksList';
import { Card, CardContent } from '@mui/material';
import axios, { AxiosResponse } from 'axios';

const Index: React.FC<any> = ({ data = {} }) => {
  return (
      <Card>
        <CardContent>
          <BooksList books={data.books}/>
        </CardContent>
      </Card>
  );
}

export default Index;

export async function getStaticProps() {
  const url: string = 'https://hokodo-frontend-interview.netlify.app/data.json';
  const res: AxiosResponse = await axios.get(url);
  const data = res.data;

  return {
    props: { data }, // will be passed to the page component as props
  }
};