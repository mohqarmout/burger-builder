import React from 'react';
import setupShallowWrapper from 'test/helpers/setupShallowWrapper';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import Spinner from 'components/UI/Spinner/Spinner';
import { ContactData } from './ContactData';
import Button from 'components/UI/Button/Button';
afterEach(() => {
  jest.restoreAllMocks();
});

const mockedFormVlues = {
  name: {
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
  },
  street: {
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
  },
  zipCode: {
    value: '',
    validation: { required: true, minLength: 5, maxLength: 5 },
    valid: false,
    touched: false,
  },
  city: {
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
  },
  country: {
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
  },
  email: {
    value: '',
    validation: { required: true },
    valid: false,
    touched: false,
  },
  deliveryMethod: { value: 'hmmm' },
};

const props = {
  ingredients: {},
  totalPrice: 10,
  postOreder: jest.fn(),
};

const setup = () => {
  return mount(
    <MemoryRouter initialEntries={['checkout/contact-data']} initialIndex={0}>
      <Route
        path="checkout/contact-data"
        render={routeProps => <ContactData {...props} {...routeProps} />}
      />
    </MemoryRouter>,
  );
};

const idsSetup = values => {
  const newarr = [...values];
  const ids = ['name', 'street', 'zipCode', 'city', 'country', 'email'];
  return newarr.map((value, index) => {
    return { value, id: ids[index] };
  });
};

const fireInputEvent = (wrapper, inputValues = []) => {
  const inputInfo = idsSetup(inputValues);
  wrapper.find('input').forEach((node, index) => {
    node.simulate('change', {
      target: { value: inputInfo[index].value },
      id: inputInfo[index].id,
    });
  });
};

test('renders without error', () => {
  const wrapper = setup();
  expect(wrapper).toHaveLength(1);
});
test('order button should be disabled unlees canSubmit state is true ', () => {
  const wrapper = setup();
  expect(wrapper.find(Button).props().active).toBe(false);
  jest
    .spyOn(React, 'useState')
    .mockReturnValueOnce([mockedFormVlues])
    .mockReturnValueOnce([false])
    .mockReturnValueOnce([true]);
  const mockedStateWrapper = setup();
  expect(
    mockedStateWrapper
      .find('button')
      .at(0)
      .props().active,
  ).toBe(true);
});
test('should view the spinner on loading', () => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValueOnce([mockedFormVlues])
    .mockReturnValueOnce([true]);
  const wrapper = setup();
  expect(wrapper.find(Spinner)).toHaveLength(1);
});
test('orders should be active and fire the handler on passed validation', async () => {
  jest
    .spyOn(React, 'useState')
    .mockReturnValueOnce([mockedFormVlues, jest.fn()])
    .mockReturnValueOnce([false, jest.fn()])
    .mockReturnValueOnce([true, jest.fn()]);

  const wrapper = setup(ContactData);
  fireInputEvent(wrapper, [
    'test',
    'Al-Naser street',
    '97059',
    'Gaza',
    'Palestine',
    'test@test.test',
  ]);
  await wrapper.find('form').simulate('submit');
  expect(props.postOreder).toHaveBeenCalled();
});
test('', () => {
  props.postOreder.mockClear();
  const wrapper = setup(ContactData);
  fireInputEvent(wrapper, [
    'test',
    'Al-Naser street',
    '97059',
    'Gaza',
    'Palestine',
    '',
  ]);
  wrapper.find('form').simulate('submit');
  expect(props.postOreder).not.toHaveBeenCalled();
});
