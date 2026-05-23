import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, VEHICLES } from "@/data";
import WorkbenchClient from "./WorkbenchClient";

interface PageProps {
  params: Promise<{ serviceId: string; vehicleId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId, vehicleId } = await params;
  
  const service = SERVICES.find((s) => s.id === serviceId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);

  if (!service || !vehicle) {
    return {
      title: "Elegant Auto Studio | Konstruktor",
      description: "Avtomobilingiz uchun premium deteyling xizmatlarini sozlash va buyurtma berish Namanganda."
    };
  }

  return {
    title: `${vehicle.name} uchun ${service.uzName} Namangan | Elegant Auto Studio`,
    description: `${vehicle.name} avtomobili uchun premium ${service.uzName} narxini Namangan shahrida onlayn hisoblang. Ideal va tezkor deteyling xizmati.`,
    keywords: `${vehicle.name.toLowerCase()} ${service.uzName.toLowerCase()} namangan, elegant auto studio, ${vehicle.name.toLowerCase()} shumka namangan, ${vehicle.name.toLowerCase()} polirovka namangan, ${vehicle.name.toLowerCase()} keramika namangan`,
    openGraph: {
      title: `${vehicle.name} uchun ${service.uzName} Namangan | Elegant Auto Studio`,
      description: `${vehicle.name} avtomobili uchun premium ${service.uzName} xizmati. Namanganda professional deteyling markazi.`,
      type: "article",
    }
  };
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
