"use client";

import SquadList from "@/features/squad/components/SquadList";

const Pages = () => {
  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-black">Squad Management</h1>
        <SquadList />
      </div>
    </>
  );
};

export default Pages;
