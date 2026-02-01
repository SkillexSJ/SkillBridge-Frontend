import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  if (user.role !== "admin") {
    // handle unauthorized users
    if (user.role === "tutor") redirect("/dashboard");
    redirect("/dashboard"); // default
  }

  return <>{children}</>;
}
