"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthSchema } from "@/validationSchema";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { authMessage } from "@/constants/toastMessage";
import { useMutation } from "@tanstack/react-query";
import { TryCatch } from "@/utils/TryCatch";
import requestAPI from "@/utils/requestAPI";
import authConfig from "@/apiHelpers/auth";
import { useEffect } from "react";
import { useRoot } from "@/Context/RootProvider";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/checkAuth";
import chatConstants from "@/constants";
import axios from "axios";
import { RegisterType } from "../../../../types/AuthType";

export default function SignUp() {
  const { auth, setAuth, updateAuth, setAccessToken } = useRoot();
  const router = useRouter();

  useEffect(() => {
    checkAuth(auth?._id ?? "", router, true);
  }, [auth?._id, router]);

  const form = useForm<z.infer<typeof AuthSchema.SignUpSchema>>({
    resolver: zodResolver(AuthSchema.SignUpSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof AuthSchema.SignUpSchema>) =>
      TryCatch(async () => {
        const signUpData = await requestAPI(authConfig.register(values));

        if (signUpData?.data?._id) {
          updateAuth(signUpData?.data);
          localStorage.setItem(
            chatConstants.LOCAL_STORAGE_KEY.accessKey,

            signUpData?.token
          );

          axios.defaults.headers.Authorization = `Bearer ${signUpData?.token}`;

          localStorage.setItem(
            chatConstants.LOCAL_STORAGE_KEY.refreshKey,
            signUpData?.refreshToken
          );

          setAccessToken(signUpData.token);
          setAuth(signUpData?.data);
          return signUpData;
        }
      }),
    onSuccess: (data: RegisterType) => {
      toast.success(data.message);
      router.push("/");
    },
  });

  function onSubmit(data: z.infer<typeof AuthSchema.SignUpSchema>) {
    mutation.mutate(data);
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <Form {...form}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Fullname</Label>
                    <FormField
                      control={form.control}
                      name="fullName"
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
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                    </div>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
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
                      <Label htmlFor="password">Gender</Label>
                    </div>
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              id="male"
                              checked={field.value === "male"}
                              onCheckedChange={(checked: boolean) =>
                                field.onChange(checked ? "male" : "")
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="male">Male</FormLabel>
                          </div>

                          <FormControl>
                            <Checkbox
                              id="female"
                              checked={field.value === "female"}
                              onCheckedChange={(checked: boolean) =>
                                field.onChange(checked ? "female" : "")
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="female">Female</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    Create an account
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign up with GitHub
                  </Button>
                </div>
              </form>
            </Form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
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
