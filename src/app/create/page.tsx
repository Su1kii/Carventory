import { getCars } from "@/actions/car.action";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";
import React from "react";

const CreatePage = async () => {
  const user = await stackServerApp.getUser();
  const cars = await getCars();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable cars={cars} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignIn />
        </div>
      )}
    </>
  );
};

export default CreatePage;
