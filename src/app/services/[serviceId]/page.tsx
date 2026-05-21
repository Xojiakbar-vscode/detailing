import React from "react";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { serviceId } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
