import axios from 'axios';

const instanc = axios.create({
  baseURL: `https://react-my-burger-a3016.firebaseio.com/`,
});

export default instanc;
