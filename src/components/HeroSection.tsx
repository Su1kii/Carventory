"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatars: Array<{
    image: string;
    fallback: string;
  }>;
}

interface Hero151Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  testimonial?: Testimonial;
  images: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
}

const HeroSection = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI.",
  button = { text: "Get Started", url: "#" },
  testimonial = {
    quote: "Focused strategy, swift delivery",
    author: "John Doe",
    role: "CEO",
    company: "Company",
    avatars: [
      {
        image: "https://shadcnblocks.com/images/block/avatar-1.webp",
        fallback: "AB",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-2.webp",
        fallback: "CD",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-3.webp",
        fallback: "EF",
      },
    ],
  },
  images = {
    first: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    second: "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
    third: "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
    fourth: "https://shadcnblocks.com/images/block/placeholder-dark-7-tall.svg",
  },
}: Hero151Props) => {
  // State to trigger fade-in for images and slide-in for testimonial
  const [showCarImages, setShowCarImages] = useState(false);
  const [showTestimonial, setShowTestimonial] = useState(false);

  useEffect(() => {
    // Trigger the animations after component mounts
    setShowCarImages(true);
    setShowTestimonial(true);
  }, []);

  return (
    <section className="min-h-screen py-12 md:py-20 flex items-center justify-center">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          {/* Left side with Heading, Description, and Button */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              <h1 className="max-w-[80%] text-4xl leading-tight font-semibold text-foreground lg:text-5xl xl:text-7xl">
                {heading}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground xl:text-2xl">
                {description}
              </p>
            </div>
            <div className="my-6 lg:my-10">
              <Button asChild size="lg">
                <a href={button.url}>{button.text}</a>
              </Button>
            </div>

            {/* Testimonial with Slide-in Animation */}
            <div
              className={`flex flex-wrap items-center gap-3 justify-center ${
                showTestimonial ? "animate-slide-in" : ""
              }`}
            >
              <div className="relative flex -space-x-[1.5rem]">
                {testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="relative z-[index + 1] flex h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover"
                  >
                    <AvatarImage
                      src={avatar.image}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-2-foreground italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-muted-2-foreground">
                  {testimonial.author}, {testimonial.role} @{" "}
                  {testimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Right side with Images (Fade-in Effect) */}
          <div className="w-full flex-1">
            <div className="w-full max-w-[50rem]">
              <div className="grid grid-cols-2 grid-rows-2 gap-6">
                {/* First Image */}
                <div
                  className={`overflow-hidden rounded-[5.2%] border border-muted bg-muted ${
                    showCarImages ? "animate-fade-in" : ""
                  }`}
                >
                  <img
                    src={images.first}
                    alt="First Image"
                    className="object-cover w-full h-56"
                  />
                </div>

                {/* Second Image */}
                <div
                  className={`relative overflow-hidden rounded-[5.2%] border border-muted bg-muted ${
                    showCarImages ? "animate-fade-in" : ""
                  }`}
                >
                  <img
                    src={images.second}
                    alt="Second Image"
                    className="object-cover w-full h-56"
                  />
                </div>

                {/* Third Image */}
                <div
                  className={`relative overflow-hidden rounded-[5.2%] border border-muted bg-muted ${
                    showCarImages ? "animate-fade-in" : ""
                  }`}
                >
                  <img
                    src={images.third}
                    alt="Third Image"
                    className="object-cover w-full h-56"
                  />
                </div>

                {/* Fourth Image */}
                <div
                  className={`relative overflow-hidden rounded-[5.2%] border border-muted bg-muted ${
                    showCarImages ? "animate-fade-in" : ""
                  }`}
                >
                  <img
                    src={images.fourth}
                    alt="Fourth Image"
                    className="object-cover w-full h-56"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
