import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import Spinner from 'components/UI/Spinner/Spinner';
import Order from 'components/Order/Order';
import { Orders } from './Orders';

const order = [
  {
    id: '-M2RnN2n3wKhGH4UpwlL',
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1,
    },
    price: 6.9,
    userId: 'sSBEAtHQQ4eeoaUpMbXPZVdLPoD2',
  },
];
const props = {
  fetchOrder: jest.fn(),
  data: order,
};

test('renders without error', () => {
  const wrapper = setupShallowWrapper(Orders, props);
  expect(wrapper).toHaveLength(1);
});
test('should view spinner on loading state', () => {
  const wrapper = setupShallowWrapper(Orders, props);
  expect(wrapper.find(Spinner)).toHaveLength(1);
});
test('should view at least one Order component', () => {
  const wrapper = setupShallowWrapper(Orders, props);
  wrapper.setState({ loading: false });
  expect(wrapper.find(Order)).toHaveLength(1);
});
