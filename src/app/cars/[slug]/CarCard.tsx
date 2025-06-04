import { getCarById } from "@/actions/car.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "lucide-react";

type Car = Awaited<ReturnType<typeof getCarById>>;

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  if (!car) {
    return <div>Car data is not available.</div>;
  }

  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            {car.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">
              {car.make} {car.model}
            </CardTitle>
            <CardTitle className="text-3xl font-bold">${car.price}</CardTitle>
            <CardDescription>{car.carType}</CardDescription>
            <CardDescription>Year: {car.year}</CardDescription>
            <CardDescription className="font-bold">
              {car.description}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
