import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import SignatureM from "~/components/header/Signature";

export function Header() {
  const [useLightColor, setUseLightColor] = useState(false);
  const [hasStartedScroll, setHasStartedScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateHeaderState = () => {
      const heroSection = document.querySelector<HTMLElement>(
        "[data-hero-section]",
      );
      const triggerSection = document.querySelector<HTMLElement>(
        "[data-below-hero-trigger]",
      );

      setHasStartedScroll(window.scrollY > 100);

      if (!heroSection || !triggerSection) {
        setUseLightColor(false);
        return;
      }

      const triggerTop = triggerSection.getBoundingClientRect().top;
      setUseLightColor(triggerTop > 72);
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
