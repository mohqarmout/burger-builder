import React from 'react';
import { shallow } from 'enzyme';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

export default setup;
