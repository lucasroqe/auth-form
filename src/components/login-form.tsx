"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { schema } from "@/lib/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  type RegisterType = z.infer<typeof schema>;

  const { register, handleSubmit } = useForm<RegisterType>();

  async function onSubmit(data: RegisterType) {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      console.log(response);

      if (response?.error == "Configuration") {
        toast({
          title: "Email or password incorrect",
          description: "Please, verify your credentials.",
          variant: "destructive",
        });

        return false;
      }

      toast({
        title: "Welcome back! ",
        description: "Redirecting you to your dashboard!",
        variant: "success",
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong!",
        description:
          "Your account could not be accessed. Please try again later!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please enter your email and password below to log in to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
