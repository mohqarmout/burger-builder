import React from 'react';
import setupMountWrapper from 'test/helpers/setupMountWrapper';
import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Modal from 'components/UI/Modal/Modal';
import withErrorHandler from 'HOC/withErrorHandler';
import axios from 'axios';

const TestComponent = props => {
  return <h1>TestComponent</h1>;
};
// const props = {
//   name: 'test-test',
// };
const HOC = withErrorHandler(TestComponent, axios);
test('should render TestComponent and Modal', () => {
  const wrapper = setupMountWrapper(HOC);
  expect(wrapper.find(Modal)).toHaveLength(1);
  expect(wrapper.find(TestComponent)).toHaveLength(1);
});
// test('should pass props to wrapped component', () => {
//   const wrapper = setupMountWrapper(HOC, props);
//   expect(wrapper.find(TestComponent).props().name).toBe(props.name);
// });

test('should view error message on the Model', () => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValue([{ error: { message: 'Well !!!' } }]);
  const wrapper = setupMountWrapper(HOC);

  // ! hmm trying to fix this dude any idea 
  console.log(React.useState())
  expect(wrapper.find(Modal).text()).toContain('test');
});
