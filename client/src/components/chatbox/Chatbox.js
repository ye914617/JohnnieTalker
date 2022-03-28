import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../../global/GlobalContext";
import { BsArrowDownCircle } from "react-icons/bs";

const Chatbox = () => {
  const { messages, user, sendMessage, updateMessage } = useGlobalContext();
  const [msg, setMsg] = useState("");
  const [bottomScreen, setBottomScreen] = useState(false);
  const endOfMessages = useRef(null);

  ////////////////////////////////////
  //Check if screen position at the bottom of browser

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setBottomScreen(true);
    } else {
      if (!bottomScreen) return;
      setBottomScreen(false);
    }
  };
  ///////////////////////////////////
  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const displayMessage = async () => {
    if (!msg) return;
    const adjustedMsg = msg.trim();
    if (adjustedMsg === "") return;
    // console.log(adjustedMsg);

    await sendMessage({ user, msg: adjustedMsg });
    await setMsg("");
  };

  useEffect(() => {
    updateMessage();
  }, []);

  return (
    <div className="bg-slate-100 p-2 m-2 w-11/12 mb-12 mx-auto my-0 min-h-screen">
      <div>
        {messages.map((item, index) => {
          if (!item.user) {
            return (
              <div
                className="sm:w-4/12 w-9/12 text-sm sm:text-md mb-2 my-0 mx-auto font-semibold text-gray-600 bg-green-400 w-3/12 rounded-full p-1 text-center"
                key={`${item.user}+${index}`}
              >{`${item} has joined the room`}</div>
            );
          }
          if (item.user === user) {
            return (
              <div
                className="overflow-hidden"
                key={`${item.user}+${index}+${item.msg}`}
              >
                <div className="my-5 max-w-[70%] sm:max-w-xl relative float-right ">
                  <span className="inline-block break-all bg-slate-900 text-white p-2 rounded-lg text-xl w-auto">
                    {item.msg}
                  </span>

                  <span className="absolute -top-5 right-2 text-black text-sm">
                    {item.user}
                  </span>
                </div>
              </div>
            );
          }
          return (
            <div key={`${item.user}+${index}+${item.msg}`}>
              <div className="my-10 max-w-[70%] sm:max-w-xl relative">
                <span className="inline-block break-all bg-white text-gray-500 p-2 rounded-lg text-xl w-auto">
                  {item.msg}
                </span>

                <span className="absolute -top-5 left-2 text-black text-sm">
                  {item.user}
                </span>
              </div>
            </div>
          );
        })}
        <div className="" ref={endOfMessages} />
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <div className="bg-white my-0 mx-auto rounded-lg h-16 gap-4 flex justify-center items-center">
          <input
            className="w-9/12 border-gray-400 focus:border-black duration-500 outline-none border-2 p-2"
            type="text"
            onKeyDown={(e) => (e.key === "Enter" ? displayMessage() : "null")}
            placeholder="Enter your messages here"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button
            className="bg-blue-600 rounded-md duration-300 text-white font-bold p-2 hover:bg-blue-800 hover:text-gray-300"
            onClick={() => displayMessage()}
          >
            Send
          </button>

          <BsArrowDownCircle
            onClick={scrollToBottom}
            className={
              !bottomScreen
                ? `absolute right-px text-sm w-5 h-5 sm:right-5 bottom-16 sm:text-2xl sm:w-6 sm:h-6 duration-300 rounded-full cursor-pointer text-gray-400 hover:text-black`
                : `hidden`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
