import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection
        heading="Carventory"
        description="This your own personal Car inventory where you can add your favorite cars, add prices to them, and descriptions!"
        button={{ text: "Explore Cars!", url: "/cars" }}
        images={{
          first: "/Car1.jpg",
          second: "/Car2.jpg",
          third: "/Car4.jpg",
          fourth: "/Car3.jpeg",
        }}
        testimonial={{
          quote:
            "This Car Inventory system is a game changer—efficient and easy to use!",
          author: "Taylor Smith",
          role: "CEO",
          company: "Company",
          avatars: [
            {
              image: "/testi-3.jpg",
              fallback: "AB",
            },
            {
              image: "/testi-1.jpg",
              fallback: "CD",
            },
            {
              image: "/testi-2.jpg",
              fallback: "EF",
            },
          ],
        }}
      />
    </>
  );
}
