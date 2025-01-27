"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { logOut } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";

const Navbar = () => {
    const { user } = useAuth();
    const isAdmin = false;
    return (
        <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold">
                        room<span className="text-blue-600">bnb</span>
                    </Link>


                    <div className="h-full flex items-center space-x-4">
                        {user ? (
                            <>
                                <button
                                    onClick={logOut}
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    {" "}
                                    Sign out
                                </button>
                                {isAdmin ? (
                                    <Link
                                        href="/api/auth/logout"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        {" "}
                                        Dashboard ✨
                                    </Link>
                                ) : null}
                                <Link
                                    href="/configure/upload"
                                    className={buttonVariants({
                                        size: "sm",
                                        className:
                                            " hidden sm:flex items-center gap-1 ",
                                    })}
                                >
                                    {" "}
                                    Book Now
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/register"
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    {" "}
                                    Sign up
                                </Link>
                                <Link
                                    href="/auth/login"
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    {" "}
                                    Login
                                </Link>
                                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
                                <Link
                                    href="/configure/upload"
                                    className={buttonVariants({
                                        size: "sm",
                                        className:
                                            "hidden sm:flex items-center gap-1",
                                    })}
                                >
                                    {" "}
                                    Book Now
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
