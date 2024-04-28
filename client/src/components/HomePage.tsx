"use client";
import { useRoot } from "@/Context/RootProvider";
import { checkAuth } from "@/utils/checkAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const { auth } = useRoot();
  useEffect(() => {
    checkAuth(auth?._id || "", router);
  }, [auth?._id, router]);
  return <div>HomePage</div>;
};

export default HomePage;
