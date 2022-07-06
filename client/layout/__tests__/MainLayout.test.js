import renderer from 'react-test-renderer';
import MainLayout from "../MainLayout";

it('renders correctly', () => {
  const tree = renderer
    .create(<MainLayout title="Booka" description="Books web app">
      <div>Child component</div>
    </MainLayout>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});