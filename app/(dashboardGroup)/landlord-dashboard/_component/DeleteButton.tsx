"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteProperty } from "../_action/property-delete";
import { Delete } from "lucide-react";

interface DeleteButtonProps {
  landId: string;
}

export default function DeleteButton({ landId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    // 1. SweetAlert2 Confirmation Dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#002c22",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        const response = await deleteProperty(landId);

        if (response?.success) {
          // 2. Success Alert
          Swal.fire({
            title: "Deleted!",
            text: response.message || "Your property has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });

          router.refresh(); // Refresh the page data
        } else {
          // 3. Error Alert
          Swal.fire({
            title: "Error!",
            text: response?.message || "Something went wrong while deleting.",
            icon: "error",
          });
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2   rounded text-destructive  disabled:opacity-50 transition-colors"
    >
      {isPending ? "Deleting..." :    <Delete className='text-destructive'/>}
    </button>
  );
}