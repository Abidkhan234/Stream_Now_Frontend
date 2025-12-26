import Movielist from "@/components/admin/components/mini-comps/movie-list";

const GenreCategoryPage = () => {
  return (
    <Movielist
      btnText="Add Genre"
      pageTitle="Genre/Categories Management"
      uploadPath="/genre-category/add-genre"
      queryName="admin_category_fetch"
      queryUrl="/categories"
      deleteName="category_delete_mutation"
      deleteUrl="/categories"
      isCategoryPage={true}
      itemsPerPage={8}
      pageType="category"
    />
  );
};

export default GenreCategoryPage;
