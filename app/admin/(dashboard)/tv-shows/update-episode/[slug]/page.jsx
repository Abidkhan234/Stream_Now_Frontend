"use client";

import { useParams } from "next/navigation";

const UpdateMoviePage = () => {
  const { slug } = useParams();

  console.log(slug);

  return <div>Update episode page</div>;
};

export default UpdateMoviePage;
