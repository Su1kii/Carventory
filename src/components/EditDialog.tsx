"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2 } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import { editCar, getCarById } from "@/actions/car.action";
import ImageUpload from "./ImageUpload";

type Car = NonNullable<Awaited<ReturnType<typeof getCarById>>>;

interface EditDialogProps {
  car: Car;
}

export default function EditDialog({ car }: EditDialogProps) {
  const [formData, setFormData] = useState(() => ({
    make: car.make.trim(),
    model: car.model.trim(),
    description: (car.description || "").trim(),
    year: car.year,
    price: car.price,
    color: car.color,
    carType: car.carType.trim(),
    userId: car.userId.trim(),
    imageUrl: car.imageUrl,
  }));

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.make ||
      !formData.model ||
      !formData.year ||
      !formData.carType ||
      !formData.color ||
      !formData.price ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const updatedCarData = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
      };

      const updatedCar = await editCar(car.id, updatedCarData);
      console.log("Car edited: ", updatedCar);
      toast.success("Car edited successfully 🎉");
    } catch (error) {
      console.error("Error editing car", error);
      toast.error("Failed to edit car 🤕");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit Car
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Car</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to edit this car in your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                type="text"
                placeholder="Enter car make"
                value={formData.make}
                onChange={(e) => handleChange("make", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                type="text"
                placeholder="Enter car model"
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="carType">Car Type</Label>
              <Combobox
                value={formData.carType}
                onChange={(val) => handleChange("carType", val)}
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="Enter car year"
                value={formData.year}
                onChange={(e) => handleChange("year", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                type="text"
                placeholder="Enter car color"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter car price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your description here"
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* Image Upload */}
          <Label>Car Image</Label>
          {formData.imageUrl ? (
            <div className="flex flex-col items-start gap-2">
              <img
                src={formData.imageUrl}
                alt="Car"
                className="w-full h-40 object-cover rounded-md"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove Image
              </Button>
            </div>
          ) : (
            <ImageUpload
              key="image-upload" // Force re-mounting when imageUrl becomes empty
              value={formData.imageUrl ?? ""}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
              endpoint="postImage"
            />
          )}

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
