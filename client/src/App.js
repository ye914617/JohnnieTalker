import "./App.css";
import { useEffect } from "react";
import Loading from "./components/Loading";
import Login from "./components/login/Login";
import { useGlobalContext } from "./global/GlobalContext";
import Chatbox from "./components/chatbox/Chatbox";

function App() {
  const { isServerOn, isLogin, handleVisitor, updateAnnouncement } =
    useGlobalContext();

  useEffect(async () => {
    await handleVisitor();
    await updateAnnouncement();
  }, []);
  return (
    <div className="App">
      {isServerOn ? isLogin ? <Chatbox /> : <Login /> : <Loading />}
    </div>
  );
}

export default App;
