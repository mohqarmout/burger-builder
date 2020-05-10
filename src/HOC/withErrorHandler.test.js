import React from 'react';
import setupMountWrapper from 'test/helpers/setupMountWrapper';
import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Modal from 'components/UI/Modal/Modal';
import withErrorHandler from 'HOC/withErrorHandler';
import axios from 'axios';


const TestComponent = props => {
  return <h1>TestComponent</h1>;
};

const HOC = withErrorHandler(TestComponent, axios);
test('should render TestComponent and Modal', () => {
  const wrapper = setupMountWrapper(HOC);
  expect(wrapper.find(Modal)).toHaveLength(1);
  expect(wrapper.find(TestComponent)).toHaveLength(1);
});

test('should view error message on the Model', () => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValue([{ error: { message: 'Well !!!' } }]);
  const wrapper = setupMountWrapper(HOC);

  expect(wrapper.find(Modal).text()).toContain('Well !!!');
});
