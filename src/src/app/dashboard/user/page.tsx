"use client";

import UserList from "@/features/user/components/UserList";

const Pages = () => {
  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-black">User Management</h1>
        <UserList />
      </div>
    </>
  );
};

export default Pages;
