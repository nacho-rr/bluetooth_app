export default ( state = {}, action ) => {
  switch (action.type) {
    case 'saveProperties':
      return action.payload;
    default:
      return state;
  };
};