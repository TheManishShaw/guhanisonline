import { inter, poppins } from "@/app/fonts";
import { cn } from "@/lib/utils";

export default function DashboardLayoutRoot({ children }) {
  return (
    <div
      className={cn(
        inter.variable,
        poppins.variable,
        inter.className,
        "min-h-screen bg-background text-base"
      )}
    >
      {children}
    </div>
  );
}
