import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import setupMountWrapper from 'test/helpers/setupMountWrapper';
import Spinner from 'components/UI/Spinner/Spinner';

import { Auth } from './Auth';

test('renders without error', () => {
  const wrapper = setupShallowWrapper(Auth);
  expect(wrapper).toHaveLength(1);
});
test('view an error on error state', () => {
  const wrapper = setupShallowWrapper(Auth);
  wrapper.setState({ loading: true });
  expect(wrapper.find(Spinner)).toHaveLength(1);
});
test('show SINGUP as default state', () => {
  const wrapper = setupMountWrapper(Auth);
  expect(wrapper.text()).toContain('SINGIN');
});
test('toggle signin signout ', () => {
  const wrapper = setupMountWrapper(Auth);
  wrapper
    .find('button')
    .at(2)
    .simulate('click');
  expect(wrapper.text()).toContain('SINGUP');
  wrapper
    .find('button')
    .at(2)
    .simulate('click');
  expect(wrapper.text()).toContain('SINGIN');
});
test('should submit when input pass the validation', () => {
  const getAuth = jest.fn();
  const wrapper = setupMountWrapper(Auth, { getAuth });
  wrapper
    .find('input')
    .find({ type: 'email' })
    .simulate('change', { target: { value: 'test@test.test' }, id: 'email' });
  wrapper
    .find('input')
    .find({ type: 'password' })
    .simulate('change', {
      target: { value: '123456' },
      id: 'password',
    });
  wrapper
    .find('form')
    .simulate('submit')
    .debug();
  expect(getAuth).toHaveBeenCalled();
});

test('should view the error coming form redux store', () => {
  const wrapper = setupMountWrapper(Auth, {
    authError: { message: 'test.test.test' },
  });
  expect(wrapper.text()).toContain('test.test.test');
});
