"use client";
import { FC, useState } from "react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { closeSession } from "@/lib/db/methods/dbUser";


export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <MainIcon classNameExtra="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium content-center hover:underline underline-offset-4"
          href="#"
        >
          Novedades
        </Link>
        <Button
          className="text-sm font-medium content-center"
          onClick={async () => {
            setIsLoading(true);
            const res = await closeSession();
            res.error && setIsLoading(false);
            !res.error && signOut({ callbackUrl: "/" });
          }}
        >
          Cerrar sesión
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  )
}

const MainIcon: FC<{ classNameExtra: string }> = ({ classNameExtra }) => {
  return (
    <svg className={"svg-icon main-icon " + classNameExtra} viewBox="0 0 20 20">
      <path d="M10.281,1.781C5.75,1.781,2.062,5.469,2.062,10s3.688,8.219,8.219,8.219S18.5,14.531,18.5,10S14.812,1.781,10.281,1.781M10.714,2.659c3.712,0.216,6.691,3.197,6.907,6.908h-6.907V2.659z M10.281,17.354c-4.055,0-7.354-3.298-7.354-7.354c0-3.911,3.067-7.116,6.921-7.341V10c0,0.115,0.045,0.225,0.127,0.305l5.186,5.189C13.863,16.648,12.154,17.354,10.281,17.354M15.775,14.882l-4.449-4.449h6.295C17.522,12.135,16.842,13.684,15.775,14.882"></path>
    </svg>
  )
}














// import Link from "next/link";
// import { useState } from "react";
// import { usePathname } from "next/navigation";

// import { Button } from "@/components/ui/button";

// import { AlignRight } from "lucide-react";
// import { defaultLinks } from "@/config/nav";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname();
//   return (
//     <div className="md:hidden border-b mb-4 pb-2 w-full">
//       <nav className="flex justify-between w-full items-center">
//         <div className="font-semibold text-lg">Logo</div>
//         <Button variant="ghost" onClick={() => setOpen(!open)}>
//           <AlignRight />
//         </Button>
//       </nav>
//       {open ? (
//         <div className="my-4 p-4 bg-muted">
//           <ul className="space-y-2">
//             {defaultLinks.map((link) => (
//               <li key={link.title} onClick={() => setOpen(false)} className="">
//                 <Link
//                   href={link.href}
//                   className={
//                     pathname === link.href
//                       ? "text-primary hover:text-primary font-semibold"
//                       : "text-muted-foreground hover:text-primary"
//                   }
//                 >
//                   {link.title}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// }
