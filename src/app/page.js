
import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedPets";
import FoodGuide from "@/components/FoodGuide";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import VolunteerCorner from "@/components/VolunteerCorner";
import WhyAdopt from "@/components/WhyAdopt";
export default function Home() {
  return (
    <div >
      <main>
      <Banner />
      <FeaturedPets />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <VolunteerCorner/>
      <FoodGuide />
    </main>
    </div>
  );
}