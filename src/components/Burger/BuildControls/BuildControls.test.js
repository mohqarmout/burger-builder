import setupWrapper from 'test/helpers/setupWrapper';
import BuildControls from './BuildControls';
import BuildControl from './BuildControl/BuildControl';

const props = {
  authenticated: true,
  price: 10.5555,
  disabled: {
    salad: true,
    bacon: true,
    cheese: true,
    meat: true,
  },
  ordered: jest.fn(),
};
test('BuildControls should render with out error', () => {
  const wrapper = setupWrapper(BuildControls, props);
  expect(wrapper).toHaveLength(1);
});
test(`should viwe 'ORDER NOW' when authenticated set to true`, () => {
  const wrapper = setupWrapper(BuildControls, props);
  expect(wrapper.text()).toContain('ORDER NOW');
});
test(`should round the value of price to tow number`, () => {
  const wrapper = setupWrapper(BuildControls, props);
  expect(wrapper.text()).toContain('10.56');
});
test(`should render four BuildControl`, () => {
  const wrapper = setupWrapper(BuildControls, props);
  expect(wrapper.find(BuildControl)).toHaveLength(4);
});
test(`should call call event handelr for button click`, () => {
  const wrapper = setupWrapper(BuildControls, props);
  wrapper.find('button').simulate('click');
  expect(props.ordered).toHaveBeenCalled();
});
