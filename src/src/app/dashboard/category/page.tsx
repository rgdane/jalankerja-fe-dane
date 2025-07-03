"use client";

import CategoryList from "@/features/category/components/CategoryList";

const Pages = () => {
  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-black">Category Management</h1>
        <CategoryList />
      </div>
    </>
  );
};

export default Pages;
