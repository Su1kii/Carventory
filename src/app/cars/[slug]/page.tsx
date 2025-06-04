import React from "react";
import CarCard from "./CarCard";

import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";
import { getCarById } from "@/actions/car.action";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // Extract the id from the slug by splitting on the delimiter
  const [id] = params.slug.split("--");
  const car = await getCarById(id);
  return {
    title: car ? `${car.make} ${car.model}` : "Car Details",
    description: car ? car.description : "Car details page",
  };
}

async function page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const car = await getCarById(id);

  if (!user) {
    return (
      <div className="flex justify-center mt-20 items-center">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <CarCard car={car} />
      </div>
    </div>
  );
}

export default page;
