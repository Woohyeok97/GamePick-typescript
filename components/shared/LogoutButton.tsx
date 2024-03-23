'use client'
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="textBtn" onClick={() => signOut()}>
      로그아웃
    </div>
  );
}