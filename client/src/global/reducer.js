const reducer = (state, action) => {
  switch (action.type) {
    case "TURN_ON_SERVER":
      return {
        ...state,
        isServerOn: true,
      };
    case "TURN_OFF_SERVER":
      return {
        ...state,
        isServerOn: false,
      };
    case "USER_REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "USER_LOGIN":
      return {
        ...state,
        isLogin: true,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isLogin: false,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_MSG":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "UPDATE_ANNOUNCEMENT":
      return {
        ...state,
        announcement: [...state.announcement, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
