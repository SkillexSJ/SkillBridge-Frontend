import Hero from "@/components/Layouts/Hero";

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
      <main className="min-h-screen">
        <Hero />
        <div className="bg-background border-t border-primary h-screen rounded-t-[50%_100px]">
          <h1>TRUSTED BY</h1>
        </div>
      </main>
    </>
  );
}
