import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrederThunk } from 'actions';
import withErrorHandler from 'HOC/withErrorHandler';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Order from 'components/Order/Order';

class Orders extends Component {
  state = {
    loading: false, //* UI state
  };

  async componentDidMount() {
    const { fetchOrder } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await fetchOrder();

      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { data } = this.props;

    let orders = data.map(({ id, ingredients = {}, price }) => {
      return <Order key={id} price={price} ingredinets={ingredients} />;
    });
    if (loading) {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

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
