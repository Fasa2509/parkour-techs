'use client'
import { FC, useState } from "react";
import { Session } from "next-auth";
import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AuthSession } from "@/lib/auth/utils";

interface Props {
    session: Session | null;
}

export const SidebarMenu: FC<Props> = ({ session }) => {
    const [active, setActive] = useState(false);

    if (!session) return <></>;

    return (
        <section className={`fixed top-0 left-0 z-20 transition-transform duration-500 ${(active) ? "" : "translate-x-[-100%]"}`}>
            <button className="absolute p-2 rounded-r-full bg-muted border-2 dark:border-neutral-600 border-border shadow-inner border-l-0 transition-transform duration-500 left-[99%] top-[15%]"
                onClick={() => setActive((prevState) => !prevState)}
            >
                <svg className={`svg-icon open-icon transition-transform duration-500 ${(!active) ? "rotate-180" : ""}`} viewBox="0 0 20 20">
                    <path
                        fill="none"
                        d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
                    ></path>
                </svg>
            </button>
            <aside className="h-screen w-max bg-muted p-4 pt-8 border-r dark:border-neutral-600 border-border shadow-inner">
                <div className="flex flex-col justify-between h-full">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold ml-4">Parkour Techs</h3>
                        <SidebarItems />
                    </div>
                    <UserDetails session={{ session }} />
                </div>
            </aside>
        </section>
    );
};

const UserDetails = ({ session }: { session: AuthSession }) => {
    if (session.session === null) return null;
    const { user } = session.session;

    if (!user?.name || user.name.length == 0) return null;

    return (
        <Link href="/account">
            <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2">
                <div className="text-muted-foreground">
                    <p className="text-xs">{user.name ?? "John Doe"}</p>
                    <p className="text-xs font-light pr-4">
                        {user.email ?? "john@doe.com"}
                    </p>
                </div>
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="border-border border-2 text-muted-foreground">
                        {user.name
                            ? user.name
                                ?.split(" ")
                                .map((word) => word[0].toUpperCase())
                                .join("")
                            : "~"}
                    </AvatarFallback>
                </Avatar>
            </div>
        </Link>
    );
};
