"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function titleize(seg) {
  if (!seg) return "Home";
  return decodeURIComponent(seg)
    .replace(/-/g, " ")
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function Container() {
  const pathname = usePathname() || "/";
  const segments = pathname === "/" ? [] : pathname.split("/").filter(Boolean);

  return (
    <header className="w-full h-[92px] bg-white flex items-center">
      <div className="max-w-6xl w-full mx-auto px-4">
        <nav aria-label="breadcrumb" className="text-black text-sm">
          <ol className="flex items-center">
            <li>
              {segments.length === 0 ? (
                <span className="text-black font-medium" aria-current="page">Home</span>
              ) : (
                <Link href="/" className="text-black no-underline">Home</Link>
              )}
            </li>

            {segments.map((seg, idx) => {
              const href = "/" + segments.slice(0, idx + 1).join("/");
              const isLast = idx === segments.length - 1;
              return (
                <li key={href} className="flex items-center">
                  <span className="mx-2 text-gray-400">&gt;</span>
                  {isLast ? (
                    <span className="text-gray-600 font-medium" aria-current="page">{titleize(seg)}</span>
                  ) : (
                    <Link href={href} className="text-black no-underline">{titleize(seg)}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}