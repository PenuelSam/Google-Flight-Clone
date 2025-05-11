// useMenuState.ts (Custom Hook)
import { useState } from "react";

export function useMenuState() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const closeMenu = () => setAnchor(null);

  return {
    anchor,
    openMenu,
    closeMenu,
  };
}
