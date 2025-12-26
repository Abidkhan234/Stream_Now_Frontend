import heroImage from "@/public/Home-page/ef0bfa9c4e95fbd463733e391e30020bba75bc80.png";
import HeroLayout from "../../layout/HeroLayout";

const HeroSection = () => {
  return (
    <section>
      <HeroLayout bgImage={heroImage} filmName={"Jurassic Park"} />
    </section>
  );
};

export default HeroSection;
