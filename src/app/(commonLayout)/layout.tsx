/**
 * COMPONENTS
 */
import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

/**
 * SERVICES
 */
import { getSession } from "@/lib/session";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <div className="flex min-h-screen flex-col">
      <Header initialSession={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
