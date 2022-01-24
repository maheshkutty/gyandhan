import createDataContext from "./createDataContext";

const AuthReducer = (state, actions) => {
  switch (actions.type) {
    case "signin":
      return {
        ...state,
        email: actions.payload.email,
        userid: actions.payload.userid,
        uniqueId: actions.payload.uniqueId,
      };
    case "signout":
      return {
        email: null,
        userid: "",
      };
    default:
      return state;
  }
};

const signin = (dispatch) => {
  return async ({ email, userid, uniqueId }) => {
    console.log(email);
    dispatch({
      type: "signin",
      payload: { email, userid, uniqueId },
    });
  };
};

export const { Context, Provider } = createDataContext(
  AuthReducer,
  { signin },
  { email: "", userid: "" }
);
