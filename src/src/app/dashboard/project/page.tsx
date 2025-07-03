"use client";

import ProjectList from "@/features/project/components/ProjectList";

const Pages = () => {
  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-black">Project Management</h1>
        <ProjectList />
      </div>
    </>
  );
};

export default Pages;
