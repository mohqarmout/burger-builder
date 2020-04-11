import setupMountWrapper from 'test/helpers/setupMountWrapper';
import Button from 'components/UI/Button/Button';
import CheckoutSummary from './CheckoutSummary';

const props = {
  ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
  checkoutCancel: jest.fn(),
  checkoutContinue: jest.fn(),
};

test('renders without error', () => {
  const wrapper = setupMountWrapper(CheckoutSummary, props);
  expect(wrapper).toHaveLength(1);
});

test('should call fire Continue handler', () => {
  const wrapper = setupMountWrapper(CheckoutSummary, props);
  wrapper
    .find(Button)
    .at(1)
    .simulate('click');
  expect(props.checkoutContinue).toHaveBeenCalled();
});

test('should call fire Cancel handler', () => {
  const wrapper = setupMountWrapper(CheckoutSummary, props);
  wrapper
    .find(Button)
    .at(0)
    .simulate('click');
  expect(props.checkoutCancel).toHaveBeenCalled();
});
