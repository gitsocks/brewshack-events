import { AppHeader } from "@/modules/navigation/components/AppHeader/AppHeader";

export default async function Home() {
  return (
    <>
      <AppHeader />
      <main>
        <h1>Brewshack Events</h1>
      </main>
    </>
  );
}
