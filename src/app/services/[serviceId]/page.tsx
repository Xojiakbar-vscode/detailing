import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ serviceId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return {
      title: "Elegant Auto Studio | Xizmat Topilmadi",
      description: "Bizning premium avto detailing xizmatlarimiz ro'yxati Namangan shahrida."
    };
  }

  return {
    title: `${service.uzName} Namangan | Elegant Auto Studio Deteyling`,
    description: `${service.uzName} xizmati Namangan shahrida. ${service.description} Narxlarni hisoblash va onlayn buyurtma berish.`,
    keywords: `${service.uzName.toLowerCase()} namangan, elegant auto studio, ${service.uzName.toLowerCase()} narxlari, deteyling namangan, avtotyuning namangan, avto parvarish namangan`,
    openGraph: {
      title: `${service.uzName} Namangan | Elegant Auto Studio`,
      description: `${service.description} Namangan shahrida professional xizmat ko'rsatish.`,
      type: "article",
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { serviceId } = await params;
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
