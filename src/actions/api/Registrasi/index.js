import redux from '../../constants/redux';
import rest from '../../constants/rest';
import template from '../template';

const Login = {
  postLoginCustomer: ({email, password}) => {
    return template.fetchAPI({
      method: 'POST',
      fetchRedux: redux.FETCH_LOGIN_CUSTOMER,
      receiveRedux: redux.RECEIVE_LOGIN_CUSTOMER,
      url: rest.login,
      body: {
        email: email,
        password: password,
      },
    });
  },
};

export default Login;
