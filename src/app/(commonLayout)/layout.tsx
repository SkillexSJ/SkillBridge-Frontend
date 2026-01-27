import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col max-w-fit mx-auto">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
