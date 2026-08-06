"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdvancedPropertySearchModal } from "../../_components/AdvancedPropertySearchModal";


export default function ExploreModalIntercept() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.back();
    }
  };

  return (
    <AdvancedPropertySearchModal
      open={isOpen} 
      onOpenChange={handleOpenChange} 
    />
  );
}