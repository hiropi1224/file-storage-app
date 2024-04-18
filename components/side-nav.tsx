"use client";

import { FileIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className='flex w-40 flex-col gap-4'>
      <Link href='/dashboard/files'>
        <Button
          variant='link'
          className={cn("flex gap-2", {
            "text-blue-400": pathname.includes("/dashboard/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>
      <Link href='/dashboard/favorites'>
        <Button
          variant='link'
          className={cn("flex gap-2", {
            "text-blue-400": pathname.includes("/dashboard/favorites"),
          })}
        >
          <StarIcon /> Favorites
        </Button>
      </Link>
    </div>
  );
}
