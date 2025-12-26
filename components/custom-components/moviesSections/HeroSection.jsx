import heroImage from "@/public/Movie-Page/6d869e90f3608a957dd0daabac503b5ce9c4f4ae.png";
import HeroLayout from "../../layout/HeroLayout";

const HeroSection = () => {
  return (
    <section>
      <HeroLayout
        filmName={"GODZILA vs KONG"}
        bgImage={heroImage}
        pageName={"Movies"}
        coming={"TRENDING MOVIES"}
      />
    </section>
  );
};

export default HeroSection;
