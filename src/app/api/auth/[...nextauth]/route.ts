import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import api from "@/services/api";
import { parse } from "cookie";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data: ip } = await api.get(
            "https://whats-my-ip-delta.vercel.app/"
          );

          const { data, headers } = await api.post("/sign-in", {
            email: credentials?.email,
            password: credentials?.password,
            identifier: ip,
          });

          console.log(data);

          const apiCookies = headers["set-cookie"];

          if (apiCookies && apiCookies.length > 0) {
            //eslint-disable-next-line
            apiCookies.forEach((cookie: any) => {
              const parsedCookie = parse(cookie);
              const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
              const httpOnly = cookie.includes("httponly;");

              //eslint-disable-next-line
              //@ts-ignore
              cookies().set({
                name: cookieName,
                value: cookieValue,
                httpOnly: httpOnly,
                maxAge: parseInt(parsedCookie["Max-Age"] as string),
                path: parsedCookie.path,
                expires: new Date(parsedCookie.expires as string),
                secure: true,
              });
            });
          }

          const user = { id: "", email: "", token: "" };

          return user;
        } catch (err) {
          // toastAlert({ icon: 'error', title: err.message, timer: 2000 });
          console.log(err);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/" },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
