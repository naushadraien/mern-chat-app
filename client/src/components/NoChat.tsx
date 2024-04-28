import { useRoot } from "@/Context/RootProvider";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";

const NoChat = () => {
  const { auth } = useRoot();
  return (
    <div className="flex  justify-center mt-36 w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl  font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {auth?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default NoChat;
