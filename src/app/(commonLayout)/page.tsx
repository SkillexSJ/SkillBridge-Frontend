import Hero from "@/components/Layouts/Hero";
import { LogoCloud } from "@/components/logo-cloud";

type Booking = {
  id: number;
  student_id: number;
  tutor_profile_id: number;
  session_date: string;
  start_time: string;
  end_time: string;
  status: string;
  total_price: number;
};

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/bookingDATA.json`, {
    cache: "no-store",
  });
  const bookings: Booking[] = await res.json();

  return (
    <>
      <main className="min-h-screen bg-background">
        <Hero />
        <div className="relative z-20 bg-background rounded-t-[3rem] md:rounded-t-[5rem] -mt-16 pt-16 pb-20 border-t border-primary/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-10">
              Trusted by leading companies and institutions
            </p>
            <div className="opacity-70 hover:opacity-100 transition-opacity duration-500">
              <LogoCloud />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
