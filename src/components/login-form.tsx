"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { RiEyeCloseLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdLock } from "react-icons/md";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className={cn("flex flex-col gap-6 montserrat", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center montserrat mb-3">
        <h1 className="text-2xl font-[500]">Sign in</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            startIcon={MdLock}
            placeholder="Senha"
            originalType="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            type={showPassword ? "text" : "password"}
            endIcon={showPassword ? FaEye : RiEyeCloseLine}
            // {...register("password")}
            // className={`${errors?.password?.message && "!border-[#962121]"}`}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
