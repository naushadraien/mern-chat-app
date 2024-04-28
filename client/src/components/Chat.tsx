import { useQuery } from "@tanstack/react-query";
import MainChat from "./MainChat/MainChat";
import Users from "./Users/Users";
import { TryCatch } from "@/utils/TryCatch";
import requestAPI from "@/utils/requestAPI";
import { usersConfig } from "@/apiHelpers/users";
import { UserTypes } from "../../types/AuthType";
import { Input } from "./ui/input";
import { LogOut, Search } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useRoot } from "@/Context/RootProvider";
import { Button } from "./ui/button";
import NoChat from "./NoChat";

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const { clearAuth } = useRoot();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      TryCatch(async () => {
        const data = await requestAPI(
          usersConfig.getAllUsersExceptLoggedInUser()
        );
        return data.data as UserTypes;
      }),
  });
  const handleClick = (id: string) => {
    setSelectedUserId(id);
  };

  const filteredUser = data?.filter((user) => user._id === selectedUserId);

  return (
    <div className="flex gap-10">
      <div className="flex-[20%] flex flex-col gap-4">
        <div className="flex justify-center flex-col gap-10 items-center relative">
          <Input placeholder="Search User..." className="pl-8" />
          <Search className="absolute top-2 left-2 text-gray-500" />
          <Separator />
        </div>
        {data?.map((user) => (
          <Users
            name={user.fullName}
            imgUrl={user.imageUrl}
            status={true}
            userId={user._id}
            isSelected={selectedUserId === user._id}
            onClick={() => handleClick(user._id)}
            key={user._id}
          />
        ))}
        <Button onClick={() => clearAuth()} variant="outline" className="w-16">
          <LogOut className="rotate-180" />
        </Button>
      </div>
      <div className="flex-[80%]">
        {filteredUser && filteredUser?.length > 0 ? (
          filteredUser?.map((item) => <MainChat key={item._id} {...item} />)
        ) : (
          <NoChat />
        )}
      </div>
    </div>
  );
};

export default Chat;
