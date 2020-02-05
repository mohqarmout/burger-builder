import React, { Component } from 'react';
import withErrorHandler from 'HOC/withErrorHandler';
import Spinner from 'components/UI/Spinner/Spinner';
import axios from 'axiosInstances';
import Order from 'components/Order/Order';

class Orders extends Component {
  state = {
    data: [],
    lodaing: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const { data, status } = await axios.get('orders.json');

    try {
      if (status === 200) {
        const cache = [];
        Object.keys(data).map(orderID => {
          cache.push({ id: orderID, ...data[orderID] });
        });

        this.setState({ data: cache, loading: false });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { lodaing, data } = this.state;
    let orders = data.map(({ id, ingredinets, price }) => (
      <Order key={id} price={price} ingredinets={ingredinets} />
    ));

    if (lodaing) {
      orders = <Spinner />;
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
