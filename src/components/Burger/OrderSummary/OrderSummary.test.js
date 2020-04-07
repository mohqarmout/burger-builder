import setupWrapper from 'test/helpers/setupWrapper';
import OrderSummary from './OrderSummary';

const props = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  price: 10.555,
  purchaseCancelled: jest.fn(),
  purchaseContinued: jest.fn().mockImplementation(() => {}),
};

test('BurgerBuilder render with out error', () => {
  const wrapper = setupWrapper(OrderSummary, props);
  expect(wrapper.text()).toContain(
    'A delicious burger with the following ingredients',
  );
});
test('should render four [li] ', () => {
  const wrapper = setupWrapper(OrderSummary, props);
  expect(wrapper.find('li')).toHaveLength(4);
});
test('should display the passed price rounded to 2', () => {
  const wrapper = setupWrapper(OrderSummary, props);
  expect(wrapper.find('strong').text()).toContain('10.55');
});
