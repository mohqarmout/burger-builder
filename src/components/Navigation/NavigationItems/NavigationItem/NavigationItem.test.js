import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';

it('NavigationItem should render correctly', () => {
  const component = shallow(<NavigationItem link="/" />);
  expect(component).toMatchSnapshot();
});

it('button click should hide component', () => {
  const clickFn = jest.fn();
  const component = shallow(<NavigationItem link="/" closed={clickFn} />);
  component.find(NavLink).simulate('click');
  expect(clickFn).toHaveBeenCalled();
});
