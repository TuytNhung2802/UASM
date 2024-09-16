/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { menuIcon, sendIcon } from "@/assets";
import { optionChatBox } from "@/contains";
import { useContext, useEffect, useState } from "react";
import { EMessageType } from "@/utils/enums";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMessage,
  connectRoom,
  hideTyping,
  leaveRoom,
  typing,
  clearQA,
} from "@/redux/chat/chat.slice";
import { chatSelector } from "@/redux/selectors";
import Message from "@/components/message";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import FileService from "@/services/files";
import type { FileType } from "@/utils/types";
import File from "./components/file";
import { GlobalContext } from "@/contexts/global-context";
import Staff from "./components/staff";
import { createPortal } from "react-dom";
import Rating from "./components/rating";
import { v4 } from "uuid";
import { fetchMessageByTarget } from "@/redux/chat/chat.async";

const chatTabs = [
  {
    id: 1,
    key: "advice",
    name: "Tư vấn viên",
  },
  {
    id: 2,
    key: "existing_document",
    name: "Tài liệu có sẵn",
  },
];

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const [search, setSearch] = useSearchParams();
  const { messages, someone_typing, qa } = useAppSelector(chatSelector);
  const queryTab = search.get("tab");
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [files, setFiles] = useState<Array<FileType>>([]);
  const [target, setTarget] = useState<string | null>(null);
  const { admissionStaffs, auth } = useContext(GlobalContext);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    let timer: any;
    if (someone_typing) {
      timer = setTimeout(() => {
        dispatch(hideTyping());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [someone_typing]);

  useEffect(() => {
    if (queryTab) {
      setActiveTab(queryTab);
    } else {
      setSearch({
        tab: chatTabs[0].key,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryTab]);

  useEffect(() => {
    if (queryTab === "existing_document") {
      loadFiles();
    }
  }, [queryTab]);

  useEffect(() => {
    if (target) {
      dispatch(fetchMessageByTarget(target));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const loadFiles = async () => {
    try {
      const res = await FileService.files();
      if (res) {
        setFiles(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = () => {
    dispatch(
      typing({
        target,
      })
    );
  };

  const handleSubmit = () => {
    if (qa.answer && qa.question) {
      dispatch(clearQA());
    }
    dispatch(
      addMessage({
        type: EMessageType.USER,
        content: message,
        file: target,
        target,
      })
    );
    setMessage("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message) {
      handleSubmit();
    }
  };

  return (
    <div>
      <div className="flex h-screen relative">
        <div className="bg-[#2C2B2D] w-1/5 text-[#cccccc] flex flex-col">
          <div className="p-[15px] border-solid border-[#cccccc] border-b-[1px]">
            <div className="flex justify-between">
              <h2>GPT - DTU</h2>
              <img src={menuIcon} className="cursor-pointer" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {chatTabs.map((item) => (
                <button
                  key={item.id}
                  className={twMerge(
                    "border p-2 rounded-md",
                    item.key === activeTab
                      ? "border-[#A62823] bg-[#A62823]"
                      : ""
                  )}
                  onClick={() =>
                    setSearch({
                      tab: item.key,
                    })
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="p-[15px] flex-1 h-[45%]">
            <ul className="h-[90%] overflow-auto">
              {activeTab === "advice" &&
                admissionStaffs.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      if (item.id === target) {
                        setTarget(null);
                        dispatch(
                          leaveRoom({
                            target: item.id,
                          })
                        );
                      } else {
                        setTarget(item.id);
                        dispatch(
                          connectRoom({
                            target: item.id,
                          })
                        );
                      }
                    }}
                    className="mt-2"
                  >
                    <Staff data={item} active={item.id === target} />
                  </li>
                ))}
              {activeTab === "existing_document" &&
                files.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      if (item.id === target) {
                        setTarget(null);
                      } else {
                        setTarget(item.id);
                      }
                    }}
                    className="mt-2"
                  >
                    <File data={item} active={item.id === target} />
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col gap-[10px] p-[15px] border-solid border-[#cccccc] border-t-[1px]">
            {optionChatBox.map((item, index) => (
              <div
                className="flex gap-[10px] items-center cursor-pointer"
                key={index}
              >
                <img src={item.icon} className="w-[16px] h-[16px]" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <ScrollToBottom className="relative flex-1 h-full text-white bg-[#1B1B1B] overflow-y-auto p-4 pb-32 overflow-auto">
          <h1 className="text-[#A62823] text-center text-[40px] font-medium">
            GIẢI ĐÁP THẮC MẮC TUYỂN SINH CÙNG <br />{" "}
            <span className="font-bold text-[52px]">GPT-DTU</span>
          </h1>
          {messages.map((item) => (
            <Message
              key={v4()}
              message={item}
              isMe={auth?.id === item.sender}
            />
          ))}
          <div className="absolute bottom-0 p-5 w-full right-0 px-[30px] bg-[#1b1b1b]">
            {someone_typing && (
              <div className="absolute right-2">
                <p>Ai đó đang soạn...</p>
              </div>
            )}
            <div className={twMerge("hidden", target && "block")}>
              <div className="flex justify-center mb-2">
                <button
                  className="rounded-md bg-[#A62823] p-2"
                  onClick={() => setShowRating(true)}
                >
                  Kết thúc
                </button>
              </div>
              <div
                className={twMerge(
                  "bg-[#cccccc] items-center rounded-[6px] px-[15px] py-[10px] flex"
                )}
              >
                <input
                  type="text"
                  className="bg-transparent outline-none text-black flex-1"
                  value={message}
                  onChange={(e) => {
                    handleTyping();
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => handleEnterPress(e)}
                />
                <img
                  src={sendIcon}
                  className="cursor-pointer"
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </div>
        </ScrollToBottom>
      </div>
      {showRating &&
        createPortal(
          <Rating
            id={target}
            close={(e?: "reset") => {
              if (e) {
                setTarget(null);
              }
              setShowRating(false);
            }}
          />,
          document.body
        )}
    </div>
  );
};

export default ChatBox;
