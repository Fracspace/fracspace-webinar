"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useRegistrationModal } from "@/context/ModalContext";
import { RegistrationForm } from "@/components/RegistrationForm";

export const RegistrationModal: React.FC = () => {
  const { isOpen, closeModal } = useRegistrationModal();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#140E30]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeModal}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reserve your seat"
        className="relative w-full max-w-[480px] max-h-[92vh] overflow-y-auto bg-white rounded-[26px] p-6 sm:p-8 shadow-[0_40px_90px_rgba(0,0,0,0.4)] text-[#1B1640] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-10 h-10 rounded-full border-none bg-[#F3F1F7] hover:bg-[#EAE6F2] transition-colors grid place-items-center text-[#1B1640] cursor-pointer z-10"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Form */}
        <RegistrationForm />
      </div>
    </div>
  );
};
