import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';

const injectRouter = (Component, props = {}, route) => {
  return mount(
    <MemoryRouter initialEntries={[route]} initialIndex={0}>
      <Route
        path={route}
        render={routeProps => <Component {...props} {...routeProps} />}
      />
    </MemoryRouter>,
  );
};

export default injectRouter;
