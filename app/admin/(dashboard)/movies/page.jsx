import Movielist from "@/components/admin/components/mini-comps/movie-list";

const AdminMoviesPage = () => {
  return (
    <Movielist
      btnText="Add Movie"
      pageTitle="Movies"
      queryName="admin_movies_fetch"
      queryUrl="/movies"
      deleteName="movie_delete_mutation"
      deleteUrl="/movies"
      editPath="/movies/update-movie"
      uploadPath="/movies/upload"
    />
  );
};

export default AdminMoviesPage;
