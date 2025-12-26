import heroImage from "@/public/TvShow-Page/98f337a933973607beab26e94ed20d52a576bcb5.png";
import HeroLayout from "../../layout/HeroLayout";

const HeroSection = () => {
  return (
    <section>
      <HeroLayout filmName={"Loki"} bgImage={heroImage} pageName={"TV Shows"} />
    </section>
  );
};

export default HeroSection;
