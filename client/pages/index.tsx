import { Card, CardContent } from '@mui/material';
import { Link, Typography } from "@mui/material";

const Index: React.FC<any> = ({ data = {} }) => {
  return (
      <Card>
        <CardContent>
          <Typography>You will be redirected soon...</Typography>
          <Typography>If not - click <Link href="/books">here</Link></Typography>
        </CardContent>
      </Card>
  );
}

export default Index;