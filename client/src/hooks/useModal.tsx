import { useState } from "react";

export default function useModal() {
  const [isOpen, setOpen] = useState(false);

  return {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
}
