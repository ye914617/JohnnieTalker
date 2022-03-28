import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import io from "socket.io-client";

let socket;

const AppContext = React.createContext();

const initialState = {
  isServerOn: false,
  users: [],
  user: "",
  messages: [],
  message: "",
  isLogin: false,
  announcement: [],
};

const AppProvider = ({ children }) => {
  const ENDPOINT = "https://johnnietalker.herokuapp.com/";
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const handleVisitor = async () => {
    try {
      socket = await io(ENDPOINT);
      turnOnServer();
      socket.on("connect", () => {
        console.log(`${socket.id} is connected`);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const turnOnServer = () => {
    dispatch({ type: "TURN_ON_SERVER" });
  };

  const turnOffServer = () => {
    dispatch({ type: "TURN_OFF_SERVER" });
  };

  const checkExist = (name) => {
    const alreadyExist = state.messages.filter((checkuser) => {
      return name === checkuser;
    });
    if (alreadyExist.length > 0) {
      alert("Username is taken!");
      return;
    } else {
      dispatch({ type: "USER_REGISTER", payload: name });
      userLogin();
      joinRoomMessage(name);
      setUserName(name);
    }
  };
  const userRegister = (name) => {
    const adjustedName = name.trim().toLowerCase();
    checkExist(adjustedName);
  };

  const userLogin = () => {
    dispatch({ type: "USER_LOGIN" });
  };

  const userLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  const setUserName = (name) => {
    const adjustedName = name.trim().toLowerCase();
    dispatch({ type: "SET_USER_NAME", payload: adjustedName });
  };

  const joinRoomMessage = (name) => {
    socket.emit("join-room", name);
  };

  const sendMessage = (msg) => {
    socket.emit("send-message", msg);
  };

  const updateMessage = () => {
    socket.on("receive-message", (msg) => {
      // console.log(msg);
      dispatch({ type: "UPDATE_MSG", payload: msg });
    });
  };

  const updateAnnouncement = () => {
    socket.on("announce-join", (msg) => {
      // console.log(msg);
      dispatch({ type: "UPDATE_MSG", payload: msg });
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        userRegister,
        turnOnServer,
        turnOffServer,
        userLogin,
        userLogout,
        setUserName,
        handleVisitor,
        joinRoomMessage,
        updateMessage,
        updateAnnouncement,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
