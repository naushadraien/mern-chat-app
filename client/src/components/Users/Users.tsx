import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { LogOut, Search } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { useSocket } from "@/Context/SocketContext";

type UserProps = {
  name: string;
  imgUrl: string;
  isSelected: boolean;
  userId: string;
  onClick: () => void;
};

const Users: FC<UserProps> = ({
  imgUrl,
  name,
  onClick,
  isSelected,
  userId,
}) => {
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(userId || "");

  return (
    <div
      className={`flex flex-col gap-3 ${
        isSelected ? "bg-purple-500 rounded-md" : ""
      }`}
      onClick={onClick}
      role="button"
    >
      <div className={`flex gap-4 items-center pt-4 pl-4`}>
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <Image
              src={
                imgUrl ||
                "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>{name || "Cloe Kamini"}</div>
      </div>
      <Separator />
    </div>
  );
};

export default Users;
