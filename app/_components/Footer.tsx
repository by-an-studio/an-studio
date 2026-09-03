import Image from "next/image";
import { Grid } from "./Grid";

const columns = [
  { roman: "I", label: "Work", href: "/work", subItems: ["Brand Identity", "Packaging"] },
  { roman: "II", label: "Services", href: "/services", subItems: ["Brand Identity","Packaging","Web Design","Social Media Retainer","Creative Direction"] },
  { roman: "III", label: "About", href: "/about", subItems: ["An Studio"] },
  { roman: "IV", label: "Client Application", href: "/client-application", subItems: ["Apply now"] },
  { roman: "V", label: "Journal", href: "/journal", subItems: [] },
  { roman: "VI", label: "Shop", href: "/shop", subItems: [] },
  { roman: "VII", label: "Contact", href: "#", subItems: ["Mail, an@byanstudio.com", "Phone number, +34 607 164 897"] },
  { roman: "VIII", label: "Social", href: "#", subItems: ["Instagram, @anstudio", "Pinterest"] },
  { roman: "IX", label: "Privacy Policy", href: "/privacy-policy", subItems: [] },
];

function FooterColumn({ col }: { col: (typeof columns)[number] }) {
  return (
    <div className="md:shrink-0">
      <a href={col.href} className="flex items-baseline gap-2 text-[16px] md:text-[18px]">
        <span className="text-[10px]">{col.roman}</span>
        <span>{col.label}</span>
      </a>
      {col.subItems.length > 0 && (
        <ul className="mt-[2px] md:mt-2 space-y-1">
          {col.subItems.map((item) => (
            <li key={item} className="text-[12px] md:text-sm whitespace-nowrap">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  const mainColumns = columns.slice(0, 6);
  const secondaryColumns = columns.slice(6);

  return (
    <footer className="w-full pt-20 pb-10">
      <div className="h-[600px] flex flex-col gap-[60px] px-5 md:flex-row md:flex-wrap md:justify-between md:gap-y-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-[20px] md:contents">
          {mainColumns.map((col) => (
            <FooterColumn key={col.roman} col={col} />
          ))}
        </div>
        <div className="flex flex-col gap-[20px] md:contents">
          {secondaryColumns.map((col) => (
            <FooterColumn key={col.roman} col={col} />
          ))}
        </div>
      </div>

      <Grid className="mt-24 md:mt-0 items-end">
        <div className="col-span-8 md:col-span-6">
          <p className="mb-4 text-[16px]">Subscribe to our Newsletter</p>
          <form className="flex gap-2" suppressHydrationWarning>
            <div className="flex-1 h-[27px] overflow-hidden flex items-center">
              <div className="shrink-0 w-[133.3333%] h-[36px] md:w-full md:h-[27px] origin-left scale-75 md:scale-100">
                <input
                  type="email"
                  placeholder="Email Address"
                  suppressHydrationWarning
                  className="bg-[#EFECE6]/60 text-black/60 placeholder:text-black/60 px-4 text-[16px] w-full h-full box-border"
                />
              </div>
            </div>
            <button type="submit" className="shrink-0 bg-[#EFECE6]/60 text-black/60 px-4 h-[27px] flex items-center justify-center text-[12px] md:text-[16px]">Subscribe</button>
          </form>
        </div>
        <div className="col-span-8 md:col-start-9 md:col-span-4 text-[12px] md:text-[16px] leading-tight md:leading-normal text-center md:text-left mt-16 md:mt-0">An Studio 2026®</div>
        <div className="col-span-8 md:col-start-13 md:col-span-6 text-[12px] md:text-[16px] leading-tight md:leading-normal text-center md:text-left -mt-3 md:mt-0">Independent Design Studio</div>
        <div className="col-span-8 md:col-start-21 md:col-span-4 flex justify-center md:justify-end mt-10 md:mt-0">
          <Image src="/logo/an-studio.svg" alt="An Studio" width={140} height={24} style={{ width: "140px", height: "24px" }} />
        </div>
      </Grid>
    </footer>
  );
}
