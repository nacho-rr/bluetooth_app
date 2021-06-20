export default (state = {}, action) => {
  switch (action.payload) {
    case 'saveConnected':
      return action.payload;
    default:
      return state;
  };
};