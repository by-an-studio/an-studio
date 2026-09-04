import Image from "next/image";
import { LiveDateTime } from "./LiveDateTime";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 py-5 px-5">
      <div className="flex flex-row items-center justify-between text-[clamp(12px,0.9375vw,18px)] font-normal">
        <a href="/">
          <Image
            src="/logo/an-studio.svg"
            alt="An Studio"
            width={140}
            height={24}
            style={{ width: "140px", height: "24px" }}
            priority
          />
        </a>
        <div className="flex flex-col items-end gap-1 md:flex-row md:items-start md:gap-8">
          <span>ES</span>
          <LiveDateTime />
        </div>
      </div>
    </header>
  );
}
