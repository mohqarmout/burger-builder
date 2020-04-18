import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Order from './Order';

const props = {
  price: 10,
  ingredinets: {
    bacon: 1,
    cheese: 1,
    meat: 1,
    salad: 1,
  },
};

test('should renders correctly', () => {
  const wrapper = setupShallowWrapper(Order, props);
  expect(wrapper).toMatchSnapshot();
});
