import React from 'react';
import { mount } from 'enzyme';

const setup = (Component, props) => {
  const wrapper = mount(<Component {...props} />);
  return wrapper;
};

export default setup;
