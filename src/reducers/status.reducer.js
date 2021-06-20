export default (state = '', action) => {
  switch (action.type) {
    case 'saveStatus':
      return action.payload;
    default:
      return state;
  };
};