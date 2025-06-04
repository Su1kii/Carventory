"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";

export async function getCars(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      // Filter based on 'make' or 'model' instead of 'name'
      whereClause.OR = [
        {
          make: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const userCars = await prisma.cars.findMany({
      where: whereClause,
    });

    // Revalidate the path if needed (for caching purposes)
    revalidatePath("/");

    return { success: true, userCars };
  } catch (error) {
    console.error("Error in getCars:", error);
    throw new Error("Failed to fetch cars");
  }
}

export async function getCarById(id: string) {
  return await prisma.cars.findUnique({
    where: { id },
  });
}

export async function createCar(data: Prisma.CarsCreateInput) {
  console.log("Creating car...");
  console.log(data);

  try {
    // Check if all required fields are filled
    const requiredFields = [
      "make",
      "model",
      "year",
      "carType",
      "color",
      "price",
      "description",
    ];

    for (let field of requiredFields) {
      // Dynamically check if any of the required fields are empty or undefined
      if (!data[field as keyof Prisma.CarsCreateInput]) {
        console.error(`Missing required field: ${field}`);
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Fetch the userId before submitting
    const currentUserId = await getUserId();
    if (!currentUserId) {
      console.error("User is not authenticated");
      throw new Error("User is not authenticated");
    }

    // Convert year and price to numbers
    const carData = {
      ...data,
      year: Number(data.year), // Ensure year is a number
      price: Number(data.price), // Ensure price is a number
      userId: currentUserId, // Add the userId to formData
    };

    // Submit the data to createCar
    const newCar = await prisma.cars.create({
      data: carData,
    });

    revalidatePath("/create");
    return newCar;
  } catch (error) {
    console.error("Error Creating Car:", error);
    throw error;
  }
}

export async function editCar(
  id: string, // identify which car we are editing
  data: Prisma.CarsUpdateInput
) {
  try {
    // Fetch the current user ID (if needed for the update)
    const currentUserId = await getUserId();
    if (!currentUserId) {
      throw new Error("User not authenticated");
    }

    // Update the car with the provided data
    const updatedCar = await prisma.cars.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId, // Ensure that the userId is correctly set
      },
    });

    revalidatePath("/create");

    // Return the updated car object if needed
    return updatedCar;
  } catch (error) {
    console.error("Error updating car:", error);
    throw error; // You might want to handle this further depending on your use case
  }
}

export async function deleteCar(
  id: string //identify which car we are editing
) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedCar = await prisma.cars.delete({
      where: { id },
    });
    revalidatePath("/create");
    return deletedCar;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
}
