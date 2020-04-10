import Backdrop from 'components/UI/Backdrop/Backdrop';
import setupShallowWrapper from 'test/helpers/setupShallowWrapper';

test('render null if now show props', () => {
  const component = setupShallowWrapper(Backdrop);
  expect(component.html()).toBeNull();
});
test('render div if show props set to true and fire the handler when clicked', () => {
  const props = {
    show: true,
    clicked: jest.fn(),
  };
  const component = setupShallowWrapper(Backdrop, props);
  const dev = component.find('div');
  dev.simulate('click');
  expect(dev).toHaveLength(1);
  expect(props.clicked).toHaveBeenCalled();
});
