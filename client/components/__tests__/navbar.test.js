import renderer from 'react-test-renderer';
import NavBar from '../navbar';

it('renders correctly', () => {
  const tree = renderer
    .create(<NavBar/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});