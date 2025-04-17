"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function HeaderNavBar() {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (profileClick) {
      const timer = setTimeout(() => {
        setProfileClick(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [profileClick]);

  if (!session?.user) return null;

  return (
    <div className="relative bg-#fbe4dc flex items-center justify-between p-2 shadow-md">
      <div className="flex items-center z-20 mx-5">
        <Image src="/514IFPjTlZL.png" alt="logo" width={50} height={50} />
      </div>

      <div className="relative z-20">
        <Image
          src={session.user.image || "/default-avatar.png"}
          alt="user"
          width={40}
          height={40}
          onClick={() => setProfileClick((prev) => !prev)}
          className="rounded-full cursor-pointer hover:border-2 border-blue-500"
        />
        {profileClick && (
          <div className="absolute right-0 mt-2 bg-white p-3 shadow-md border z-30 rounded-md">
            <h2
              className="cursor-pointer hover:text-blue-500 hover:font-bold"
              onClick={() => signOut()}
            >
              Logout
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderNavBar;
