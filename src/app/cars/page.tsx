import { getCars } from "@/actions/car.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";

const CarPage = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  if (!user) {
    return (
      <div className="flex justify-center mt-20 items-center">
        <SignIn />
      </div>
    );
  }

  const { userCars: cars } = await getCars();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars?.map((car) => {
          const slugName = `${car.make
            .toLowerCase()
            .replace(/\s+/g, "-")}-${car.model
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
          const slug = `${car.id}--${slugName}`;
          const carUrl = `/cars/${slug}`;

          return (
            <Link
              key={car.id}
              href={carUrl}
              className="group block rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={car.imageUrl || "/placeholder-car.jpg"}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">
                  {car.make} {car.model}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CarPage;
