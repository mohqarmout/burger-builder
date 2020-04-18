import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import BuildControl from './BuildControl';

const props = {
  label: 'Salad',
  added: jest.fn(),
  removed: jest.fn(),
};
test('should render without error', () => {
  const wrapper = setupShallowWrapper(BuildControl, props);
  expect(wrapper).toHaveLength(1);
});
test('should view the label prop', () => {
  const wrapper = setupShallowWrapper(BuildControl, props);
  expect(wrapper.text()).toContain('Salad');
});
test('should remove on layer of the Ingredient', () => {
  const wrapper = setupShallowWrapper(BuildControl, props);
  wrapper
    .find('button')
    .at(0)
    .simulate('click');
  expect(props.removed).toHaveBeenCalled();
});
test('should add on layer of the Ingredient', () => {
  const wrapper = setupShallowWrapper(BuildControl, props);
  wrapper
    .find('button')
    .at(1)
    .simulate('click');
  expect(props.added).toHaveBeenCalled();
});
