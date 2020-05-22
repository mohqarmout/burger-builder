import injectRouter from 'test/utils/injectRouter';
import Modal from 'components/UI/Modal/Modal';
import Spinner from 'components/UI/Spinner/Spinner';
import { BurgerBuilder } from './BurgerBuilder';

afterEach(() => {
  jest.restoreAllMocks();
});
test('BurgerBuilder render with out error', () => {
  const wrapper = injectRouter(BurgerBuilder, {}, '/');
  expect(wrapper.find(Modal).exists()).toBe(true);
});
test('display error message when internal component error', () => {
  const wrapper = injectRouter(BurgerBuilder, {}, '/');
  expect(wrapper.text()).toContain('sorry something went wrong');
});
test('render spinner when no ingredients', () => {
  const wrapper = injectRouter(BurgerBuilder, {}, '/');
  expect(wrapper.find(Spinner).exists()).toBe(true);
});
