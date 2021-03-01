import redux from '../constants/redux';

const template = {
  fetchAPI: ({method, url, fetchRedux, receiveRedux, body, headers}) => {
    return async (dispatch) => {
      dispatch({type: fetchRedux});
      try {
        const response = await fetch(encodeURI(url), {
          credentials: 'include',
          method: method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
          },
          body: JSON.stringify(body),
        });
        if (response.status !== 200) {
          console.group(fetchRedux);
          console.log(`${method} Error`);
          console.log(`${JSON.stringify(response, 0, 2)}`);
          console.groupEnd();
          throw new Error(response.status);
        }
        const responseJSON = await response.json();
        dispatch({
          type: receiveRedux,
          payload: responseJSON,
        });
        return Promise.resolve(responseJSON);
      } catch (error) {
        dispatch({
          type: redux.API_ERROR,
          payload: error,
        });
        return Promise.reject(error);
      }
    };
  },
};

export default template;
