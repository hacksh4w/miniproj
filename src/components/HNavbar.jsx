import Link from "next/link";
import React from "react";

const HNavbar = () => {
  return (
    <div className="hidden lg:block">
        <div className="container">
            <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
                <Link className="navbar__link relative" href="/">
                    HOME
                </Link>
                <Link className="navbar__link relative" href="/bulk">
                    BULK ORDER
                </Link>
            </div>
        </div>
    </div>
  );
};

export default HNavbar;