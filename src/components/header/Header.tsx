import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import SignatureM from "~/components/header/Signature";

export function Header() {
  const [useLightColor, setUseLightColor] = useState(false);
  const [hasStartedScroll, setHasStartedScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateHeaderState = () => {
      setHasStartedScroll(window.scrollY > 100);

      const lightSections = document.querySelectorAll<HTMLElement>(
        "[data-light-header]",
      );

      const headerTriggerY = 72;

      let shouldUseLight = false;

      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        const isOverlapping =
          rect.top <= headerTriggerY && rect.bottom >= headerTriggerY;

        if (isOverlapping) {
          shouldUseLight = true;
        }
      });

      setUseLightColor(shouldUseLight);
    };

    const raf = requestAnimationFrame(updateHeaderState);

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xs backdrop-opacity-35">
      <div
        className={`container flex min-h-16 items-center justify-center py-0 transition-colors duration-300 sm:py-2 ${
          useLightColor ? "text-white" : "text-foreground"
        }`}
      >
        <Link
          to="/"
          aria-label="Go to home"
          className="transition-opacity hover:opacity-80"
        >
          <SignatureM
            className="h-auto w-20 sm:w-28"
            shouldAnimate={hasStartedScroll}
          />
        </Link>
      </div>
    </header>
  );
}
