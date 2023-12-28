'use client';

import { AppsContext } from "@/providers/AppsProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Home() {
  const { currentApplication, isLoading } = useContext(AppsContext);
  const router = useRouter();

  if (!isLoading && currentApplication) {
    router.push(`/apps/${currentApplication.id}`);
  }

  return <>Loading ...</>;
}
