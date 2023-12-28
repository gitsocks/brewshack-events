'use client';

import { Container } from "@/components/layout/Container/Container";
import { AppHeader } from "@/components/navigation/AppHeader/AppHeader";
import { CurrentUserContext } from "@/providers/CurrentUserProvider";
import { useContext } from "react";

export default function Home() {
  const { currentUser, isLoading } = useContext(CurrentUserContext);

  return (
    <>
      <main>
        <Container>
          <h1>Hey {isLoading ? 'loading ...' : currentUser?.name}</h1>
        </Container>
      </main>
    </>
  );
}
