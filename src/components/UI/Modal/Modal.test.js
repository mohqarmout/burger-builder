import Modal from 'components/UI/Modal/Modal';
import setupMountWrapper from 'test/helpers/setupMountWrapper';
import Backdrop from 'components/UI/Backdrop/Backdrop';

const props = {
  modalClosed: jest.fn(),
  children: 'test text',
};

test('renders without error', () => {
  const wrapper = setupMountWrapper(Modal, props);
  expect(wrapper).toHaveLength(1);
});
test('call the handler by clicking the backdrop', () => {
  const newProps = { ...props, show: true };
  const wrapper = setupMountWrapper(Modal, newProps);
  wrapper.find(Backdrop).simulate('click');
  expect(props.modalClosed).toHaveBeenCalled();
});
test('should view children text', () => {
  const wrapper = setupMountWrapper(Modal, props);
  expect(wrapper.text()).toContain(props.children);
});
test('div should have Modle className ', () => {
  const newProps = { ...props, show: true };
  const wrapper = setupMountWrapper(Modal, newProps);
  expect(
    wrapper
      .find('div')
      .at(1)
      .hasClass('Show'),
  ).toBe(true);
});
