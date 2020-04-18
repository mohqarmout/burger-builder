import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import { NavLink } from 'react-router-dom';
import NavigationItem from './NavigationItem';

it('NavigationItem should render correctly', () => {
  const component = setupShallowWrapper(NavigationItem, { link: '/' });
  expect(component).toHaveLength(1);
});
it('button click should hide component', () => {
  const clickFn = jest.fn();
  const component = setupShallowWrapper(NavigationItem, {
    link: '/',
    closed: clickFn,
  });
  component.find(NavLink).simulate('click');
  expect(clickFn).toHaveBeenCalled();
});
