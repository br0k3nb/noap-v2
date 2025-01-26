"use client";

import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Spin } from "antd";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Toast } from "primereact/toast";

import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdLock, MdOutlineEmail } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import img from "../../../public/static/images/Studying-pana.svg";
import logo from "../../../public/static/images/noap2.png";

export default function LoginPage() {
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Insira um email válido")
        .email("Insira um email válido"),
      password: yup
        .string()
        .required("Insira uma senha válida")
        .min(6, "O número mínimo de caracteres para senha é 7")
        .max(32, "O número máximo de caracteres para senha é 32"),
    })
    .required();

  const toast = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const router = useRouter();

  const handleFormSubmit = async ({ email, password }: FieldValues) => {
    try {
      setIsLoading(true);

      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (data && data.error === "CredentialsSignin") {
        if (toast.current) {
          (toast.current as Toast).show({
            severity: "error",
            className: "!shadow-xl !shadow-gray-100 !border !border-gray-200",
            detail: null,
            style: { fontFamily: "Montserrat" },
            closable: false,
            //eslint-disable-next-line
            content: (props: any) => (
              <div className="flex flex-row !pt-[0.5px] !w-full space-x-5">
                <IoCloseCircleOutline
                  className="text-red-500 my-auto"
                  size={30}
                />
                <p className="!font-[450] my-auto">Invalid email or password</p>
              </div>
            ),
            life: 2000,
          });

          return;
        }
      }

      return router.push("/home");
    } catch (e: unknown) {
      console.log(e);
      if (toast.current) {
        (toast.current as Toast).show({
          severity: "error",
          className: "!shadow-xl !shadow-gray-100 !border !border-gray-200",
          detail: null,
          style: { fontFamily: "Montserrat" },
          closable: false,
          //eslint-disable-next-line
          content: (props: any) => (
            <div className="flex flex-row !pt-[0.5px] !w-full space-x-5">
              <IoCloseCircleOutline
                className="text-red-500 my-auto"
                size={30}
              />
              <p className="!font-[450] my-auto">Invalid email or password</p>
            </div>
          ),
          life: 2000,
        });

        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Toast ref={toast} />
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={img.src}
          width={100}
          height={100}
          alt="Image"
          className="absolute inset-0 w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 border border-t-0 border-b-0 border-r-0 !border-l-[#d6d6d6]">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px] lg:max-w-[470px]">
            <Image
              className="mb-14 mx-auto"
              draggable={false}
              src={logo.src}
              width={170}
              height={170}
              alt="Logo"
            />
            <form
              className={"flex flex-col gap-6 montserrat"}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="flex flex-col items-center gap-2 text-center montserrat mb-3">
                <h1 className="text-2xl font-[500]">Sign in</h1>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    placeholder="Email"
                    startIcon={MdOutlineEmail}
                    {...register("email")}
                    className={`${
                      errors?.email?.message && "!border-[#962121]"
                    } `}
                  />
                  {errors?.email?.message && (
                    <p className="text-meta-1 !mt-2 text-red-600">
                      {errors?.email?.message}
                    </p>
                  )}
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
                    {...register("password")}
                    className={`${
                      errors?.password?.message && "!border-[#962121]"
                    }`}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex flex-row space-x-3 animate-pulse">
                      <Spin />
                      <p>Loading...</p>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
              <a
                className="text-center text-[11px]"
                target="_blank"
                href="https://storyset.com/"
              >
                Illustrations by Storyset
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
