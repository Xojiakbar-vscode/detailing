import React from "react";
import { notFound } from "next/navigation";
import { SERVICES, VEHICLES } from "@/data";
import WorkbenchClient from "./WorkbenchClient";

interface PageProps {
  params: Promise<{ serviceId: string; vehicleId: string }>;
}

export default async function WorkbenchPage({ params }: PageProps) {
  const { serviceId, vehicleId } = await params;
  
  const service = SERVICES.find((s) => s.id === serviceId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);

  if (!service || !vehicle) {
    notFound();
  }

  return <WorkbenchClient service={service} vehicle={vehicle} />;
}
