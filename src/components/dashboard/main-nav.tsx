import type React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/dashboard/classes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Classes
      </Link>
      <Link
        href="/dashboard/evaluations"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Evaluations
      </Link>
      <Link
        href="/dashboard/calendar"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Calendar
      </Link>
      <Link
        href="/dashboard/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
