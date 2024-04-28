import React, { FC } from "react";
import { Input } from "../ui/input";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { TryCatch } from "@/utils/TryCatch";
import requestAPI from "@/utils/requestAPI";
import { userMessagesConfig } from "@/apiHelpers/userMessages";
import { useRoot } from "@/Context/RootProvider";
import moment from "moment";
type MainChatProps = {
  fullName?: string;
  imageUrl?: string;
  _id?: string;
};

const MainChat: FC<MainChatProps> = ({ _id, fullName, imageUrl }) => {
  const { auth } = useRoot();
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      TryCatch(async () => {
        const data = await requestAPI(
          userMessagesConfig.userMessage(_id || "")
        );
        return data.data;
      }),
  });

  return (
    <>
      <div className="border-gray-500 flex flex-col">
        <div className="bg-purple-500 text-black rounded-tr-md px-4 py-2">
          <p className="text-gray-300">
            To:{" "}
            <span className="text-black font-semibold">
              {fullName || "Receiver Name"}
            </span>
          </p>
        </div>
        {data?.messages?.length > 0 ? (
          data?.messages?.map((message: any) => (
            <div className="min-h-32 px-4" key={message._id}>
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="Tailwind CSS chat bubble component"
                      src={
                        auth?.imageUrl ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {auth?.fullName || "Obi-Wan Kenobi"}
                  <time className="text-xs opacity-50">
                    {moment(message.createdAt).fromNow() || "12:45"}
                  </time>
                </div>
                <div className="chat-bubble">
                  {message.message || "You were the Chosen One!"}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="Tailwind CSS chat bubble component"
                      src={
                        imageUrl ||
                        "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {fullName || "Anakin"}
                  <time className="text-xs opacity-50">
                    {moment(message.updatedAt).fromNow() || "12:46"}
                  </time>
                </div>
                <div className="chat-bubble">
                  {message.message || "I hate you!"}
                </div>
                <div className="chat-footer opacity-50">
                  Seen at {moment(message.updatedAt).fromNow() || "12:46"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-red-500 pt-20 text-center font-bold px-2 h-[32rem]">
            No messages
          </div>
        )}
        <div className="relative flex justify-end items-center">
          <Input placeholder="Send a message" />
          <SendHorizontal className="absolute right-2 text-gray-500" />
        </div>
      </div>
    </>
  );
};

export default MainChat;