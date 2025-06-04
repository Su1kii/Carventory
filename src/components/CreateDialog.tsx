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
import { Car } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createCar } from "@/actions/car.action";
import { getUserId } from "@/actions/user.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function AlertDialogDemo() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    carType: "",
    color: "",
    price: "",
    description: "",
    imageUrl: "", // This stores the image URL after upload
  });

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const currentUserId = await getUserId();

      if (!currentUserId) {
        console.error("User is not authenticated");
        return;
      }

      const carData = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        userId: currentUserId,
      };

      const newCar = await createCar(carData);
      console.log("New car added:", newCar);
      toast.success("Car created successfully 🎉");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create car 🤕");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <Car className="w-4 h-4" />
            Add Car
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Car</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new car to your inventory.
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
                onChange={(e) => handleChange("year", e.target.value)}
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
                onChange={(e) => handleChange("price", e.target.value)}
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

          {/* Image upload */}
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            endpoint="postImage"
          />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
