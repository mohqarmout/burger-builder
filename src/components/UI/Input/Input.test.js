import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Input from './Input';

const props = {
  elementConfig: {
    placeholder: 'E-mail',
    type: 'email',
  },
  handleInputChange: jest.fn(),
};
test('renders without error', () => {
  const wrapper = setupShallowWrapper(Input, props);
  expect(wrapper).toHaveLength(1);
});

test('call the onChange handler ', () => {
  const wrapper = setupShallowWrapper(Input, props);
  wrapper.find('input').simulate('change', { target: { value: '123456' } });
  expect(props.handleInputChange).toHaveBeenCalled();
});
