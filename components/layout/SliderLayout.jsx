import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SeasonMovieCard from "../card/MovieCard";
import Card from "../card/Card";

const SliderLayout = ({ slideData = [], isMovieSlider = false }) => {
  return (
    <Carousel>
      <CarouselContent className={`h-full w-full`}>
        {slideData.map((v, i) => (
          <CarouselItem className={``} key={i}>
            {isMovieSlider ? (
              <SeasonMovieCard
                image={v.image}
                episode={v.episode}
                releaseYear={v.releaseYear}
                rating={v.rating}
                category={v.category}
              />
            ) : (
              <Card
                image={v.image}
                filmTitle={v.filmTitle}
                releaseYear={v.releaseYear}
                rating={v.rating}
                category={v.category}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`z-20`} />
      <CarouselNext className={`z-20`} />
    </Carousel>
  );
};

export default SliderLayout;
