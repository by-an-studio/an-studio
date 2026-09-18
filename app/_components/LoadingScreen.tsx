"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "../../i18n/navigation";

const SESSION_KEY = "an-studio-loading-shown";
const TOTAL_DURATION_MS = 4000;
const EXIT_DURATION_MS = 700;

type Word = { text: string; italic?: boolean };

// En el servidor useLayoutEffect no existe (no hay DOM); usamos useEffect ahí
// y useLayoutEffect en el cliente para poder ocultar la pantalla ANTES del
// primer pintado si ya se mostró esta sesión (evita cualquier parpadeo).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LoadingScreen() {
  const t = useTranslations("loadingScreen");
  const lines = t.raw("taglineLines") as Word[][];
  const pathname = usePathname();
  const isHome = pathname === "/";

  // El servidor no puede saber si ya se mostró esta sesión (no tiene acceso
  // a sessionStorage), así que SIEMPRE arranca visible tanto en servidor
  // como en el primer render de cliente: son idénticos, sin mismatch de
  // hidratación. Es el efecto de abajo quien decide, ya en el navegador y
  // antes del primer pintado, si hay que ocultarla al instante.
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guarda la decisión ("¿ya se había mostrado?") tomada en la PRIMERA
  // ejecución real del efecto. En desarrollo, React StrictMode ejecuta el
  // efecto, lo limpia y lo vuelve a ejecutar antes de pintar nada; sin este
  // caché, la segunda ejecución se encontraría el sessionStorage que la
  // primera acaba de escribir y creería (erróneamente) que ya tocaba
  // ocultarla.
  const alreadyShownRef = useRef<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!isHome) {
      setVisible(false);
      return;
    }

    if (alreadyShownRef.current === null) {
      try {
        alreadyShownRef.current = window.sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        alreadyShownRef.current = false;
      }
    }

    if (alreadyShownRef.current) {
      setVisible(false);
      return;
    }

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    exitTimer.current = setTimeout(() => {
      setExiting(true);
      removeTimer.current = setTimeout(() => setVisible(false), EXIT_DURATION_MS);
    }, TOTAL_DURATION_MS - EXIT_DURATION_MS);

    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (removeTimer.current) clearTimeout(removeTimer.current);
    };
  }, [isHome]);

  if (!visible) return null;

  return (
    <div
      id="an-studio-loading-screen"
      aria-hidden="true"
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 px-6 text-center loading-bg ${
        exiting ? "loading-screen-exit pointer-events-none" : ""
      }`}
      style={{ backgroundColor: "rgba(228, 223, 206, 1)" }}
    >
      <div className="loading-icon">
        <Image src="/logo/an-studio-horse.svg" alt="" width={110} height={93} priority />
      </div>

      <p className="text-[15px] md:text-[18px] leading-snug text-white">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.map((word, i) => (
              <span key={i}>
                <span
                  className="loading-word"
                  style={{ animationDelay: `${400 + (lineIndex * line.length + i) * 70}ms` }}
                >
                  <span className={word.italic ? "italic" : undefined}>{word.text}</span>
                </span>{" "}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
}
