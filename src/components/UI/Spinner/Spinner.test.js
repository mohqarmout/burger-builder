import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Spinner from './Spinner';

it('NavigationItem should render correctly', () => {
  const component = setupShallowWrapper(Spinner);
  expect(component).toMatchSnapshot();
});
