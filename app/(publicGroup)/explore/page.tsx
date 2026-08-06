"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdvancedPropertySearchModal } from "../_components/AdvancedPropertySearchModal";


export default function ExploreFallbackPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.push("/");
    }
  };

  return (
    <AdvancedPropertySearchModal 
      open={isOpen} 
      onOpenChange={handleOpenChange} 
    />
  );
}