import Movielist from "@/components/admin/components/mini-comps/movie-list";

const TvShowPage = () => {
  return (
    <Movielist
      uploadPath="/tv-shows/add-show"
      btnText="Add TV Shows"
      pageTitle="TV Shows"
      queryName="admin_tvShow_mutation"
      queryUrl="/movies?type=show"
      deleteName="episode_delete_mutation"
      deleteUrl="/movies"
      editPath="/update-episode"
      isEpisodePage={true}
    />
  );
};

export default TvShowPage;
