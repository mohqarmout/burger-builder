import injectRouter from 'test/utils/injectRouter';
import { Logout } from './Logout';

const logout = jest.fn();

test('renders without error', () => {
  const wrapper = injectRouter(Logout, { logout }, '/logout');
  expect(wrapper).toHaveLength(1);
});

test('should call logout on component mount ', () => {
  expect(logout).toHaveBeenCalled();
});
