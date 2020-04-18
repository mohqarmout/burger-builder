import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import { Logout } from './Logout';

const logout = jest.fn();

test('renders without error', () => {
  const wrapper = setupShallowWrapper(Logout, { logout });
  expect(wrapper).toHaveLength(1);
});

test('should call logout on component mount ', () => {
  expect(logout).toHaveBeenCalled();
});
