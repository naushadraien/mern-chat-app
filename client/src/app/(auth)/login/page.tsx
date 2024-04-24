"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";
import Link from "next/link";

import { useRoot } from "@/Context/RootProvider";
import authConfig from "@/apiHelpers/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import chatConstants from "@/constants";
import requestAPI from "@/utils/requestAPI";
import { AuthSchema } from "@/validationSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { LoginType } from "../../../../types/AuthType";

export default function Login() {
  const { setAuth, updateAuth, setAccessToken } = useRoot();

  const form = useForm<z.infer<typeof AuthSchema.LoginSchema>>({
    resolver: zodResolver(AuthSchema.LoginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof AuthSchema.LoginSchema>) => {
      try {
        const loginData = await requestAPI(authConfig.login(values));

        if (loginData?.data?._id) {
          updateAuth(loginData?.data);
          localStorage.setItem(
            chatConstants.LOCAL_STORAGE_KEY.accessKey,

            loginData?.token
          );

          axios.defaults.headers.Authorization = `Bearer ${loginData?.token}`;

          localStorage.setItem(
            chatConstants.LOCAL_STORAGE_KEY.refreshKey,
            loginData?.refreshToken
          );

          setAccessToken(loginData.token);
          setAuth(loginData?.data);
          return loginData;
        }
      } catch (error: any) {
        toast.error(error);
      }
    },
    onSuccess: (data: LoginType) => toast.success(data.message),
  });

  function onSubmit(data: z.infer<typeof AuthSchema.LoginSchema>) {
    mutation.mutate(data);
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="userName">Username</Label>
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </form>
            </Form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
