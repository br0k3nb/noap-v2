import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

//using server components
export default async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return redirect("/");

  return <> {children} </>;
}
