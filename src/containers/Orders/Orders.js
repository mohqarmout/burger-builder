import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { getOrederThunk } from 'actions';
import withErrorHandler from 'HOC/withErrorHandler';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Order from 'components/Order/Order';

export const Orders = props => {
  const [loading, setlLoading] = useState(false);
  const { data, fetchOrder } = props;

  useEffect(() => {
    (async () => {
      setlLoading(false);
      await fetchOrder();
      setlLoading(true);
    })();
  }, [fetchOrder]);

  let orders = useMemo(() => {
    data.map(({ id, ingredients = {}, price }) => {
      return <Order key={id} price={price} ingredinets={ingredients} />;
    });
  }, [data]);

  if (loading) {
    orders = <Spinner />;
  }
  return <div>{orders}</div>;
};

const mapStateToProps = ({ order }) => {
  return { data: order };
};

const mapDispatchToProps = {
  fetchOrder: getOrederThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
