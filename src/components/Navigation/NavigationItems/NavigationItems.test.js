import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

it('Render tow <NavigatinItems/> if not authenticated', () => {
  const wrapper = shallow(<NavigationItems />);
  expect(wrapper.find(NavigationItem)).toHaveLength(2);
});
