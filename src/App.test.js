import React from 'react';
import { mount, shallow } from 'enzyme';
// import findByTestAttr from 'test/utils/findByTestAttr';
import { App } from './App';

const setup = (props = {}) => {
  const wrapper = shallow(<App {...props} />);
  return wrapper;
};

describe('Test App container ', () => {
  test('should call checkAuth on app before mount the app', () => {
    const checkAuth = jest.fn();
    setup({ checkAuth });
    expect(checkAuth).toHaveBeenCalled();
  });
});
