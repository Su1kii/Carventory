"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { getCars } from "@/actions/car.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import AlertDialogDemo from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Car = Awaited<ReturnType<typeof getCars>>;

interface InventoryTableProps {
  cars: Car;
}

export default function InventoryTable({ cars }: InventoryTableProps) {
  const router = useRouter();
  const [selectCategory, setSelectCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize filteredCars to prevent unnecessary re-filtering on every render
  const filteredCars = useMemo(() => {
    return cars?.userCars?.filter(
      (car) =>
        (car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())) && // Check both make and model
        (selectCategory === "" || car.carType === selectCategory) // Filter by category (carType)
    );
  }, [cars, searchTerm, selectCategory]); // Only re-run when cars, searchTerm, or selectCategory change

  if (!cars) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative w-full">
          <Input
            placeholder="Filter cars..."
            className="px-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox
          value={selectCategory}
          onChange={(val) => setSelectCategory(val)}
        />
        <AlertDialogDemo />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Car ID</TableHead>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Car Type</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCars?.map((car) => {
            // Generate slug dynamically
            const slugName = `${car.make
              .toLowerCase()
              .replace(/\s+/g, "-")}-${car.model
              .toLowerCase()
              .replace(/\s+/g, "-")}`;
            const slug = `${car.id}--${slugName}`;
            const carUrl = `/cars/${slug}`;

            return (
              <TableRow
                className="cursor-pointer"
                key={car.id}
                onClick={() => router.push(carUrl)}
              >
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.carType}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell className="text-right">
                  <div
                    className="flex justify-end space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog car={car} />
                    <DeleteDialog car={car} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
