import { getCarById } from "@/actions/car.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Car = Awaited<ReturnType<typeof getCarById>>;

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  if (!car) {
    return <div>Car data is not available.</div>;
  }

  return (
    <Card className="max-w-full mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <CardHeader>
            {car.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt="Car"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <CardContent className="mt-4 md:mt-8 space-y-3">
            <CardTitle className="text-3xl md:text-5xl font-bold">
              {car.make} {car.model}
            </CardTitle>
            <CardTitle className="text-2xl md:text-3xl font-bold">
              ${car.price}
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              {car.carType}
            </CardDescription>
            <CardDescription className="text-sm md:text-base">
              Year: {car.year}
            </CardDescription>
            <CardDescription className="font-semibold text-sm md:text-base">
              {car.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
