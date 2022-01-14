import React, { useReducer } from "react";

export default (reducer, actions, intializedValue) => {
  const Context = React.createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intializedValue);
    const boundActions = {};

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider}
};
