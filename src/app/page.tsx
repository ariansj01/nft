import HeroSection from "@/components/Landing/HeroSection";
import Brands from "@/components/Landing/Brands";
import Collection from "@/components/Landing/Collection";
import ChooseUs from "@/components/Landing/ChooseUs";
import NumberStatus from "@/components/Landing/NumbersStatus";
import RoadMap from "@/components/Landing/RoadMap";
import Plans from "@/components/Landing/Plans";
import Comments from "@/components/Landing/Comments";
import Questions from "@/components/Landing/Questions";
import GetStart from "../components/Landing/GetStart";

export default function Home() {
  return (
    <div className="">
      <HeroSection/>
      <Brands/>
      <Collection/>
      <ChooseUs/>
      <NumberStatus/>
      <RoadMap/>
      <Plans/>
      <Comments/>
      <Questions/>
      <GetStart/>
    </div>
  );
}
