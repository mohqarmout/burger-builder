import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<NavigationItems />);
});

it('Render tow <NavigatinItems/> if not authenticated', () => {
  expect(wrapper.find(NavigationItem)).toHaveLength(2);
});

it('Render three <NavigatinItems/> if authenticated including the logout nav', () => {
  wrapper.setProps({ isAuthenticated: 'true' });
  expect(wrapper.find(NavigationItem)).toHaveLength(3);
  expect(
    wrapper.contains(<NavigationItem link="/logout">logout</NavigationItem>),
  ).toEqual(true);
});
