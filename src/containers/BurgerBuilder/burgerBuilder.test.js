import setupWrapper from 'test/helpers/setupWrapper';
import Modal from 'components/UI/Modal/Modal';
import Spinner from 'components/UI/Spinner/Spinner';
import { BurgerBuilder } from './BurgerBuilder';

test('BurgerBuilder render with out error', () => {
  const wrapper = setupWrapper(BurgerBuilder);
  expect(wrapper.find(Modal).exists()).toBe(true);
});
test('display error message when internal component error', () => {
  const wrapper = setupWrapper(BurgerBuilder);
  wrapper.setState({ error: true });
  expect(wrapper.text()).toContain('sorry something went wrong');
});
test('render spinner when no ingredients', () => {
  const wrapper = setupWrapper(BurgerBuilder);
  expect(wrapper.find(Spinner).exists()).toBe(true);
});
