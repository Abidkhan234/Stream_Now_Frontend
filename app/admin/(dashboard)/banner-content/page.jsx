import Movielist from "@/components/admin/components/mini-comps/movie-list";

const BannerContentPage = () => {
  return (
    <Movielist
      btnText="Add Trailer Banner"
      pageTitle="Content Banner Management/Trailers"
      itemsPerPage={3}
      uploadPath="/banner-content/add-trailer"
      queryName="admin_banner_fetch"
      queryUrl="/banners"
      isBannerPage={true}
      pageType="trailer"
      isGrid
    />
  );
};

export default BannerContentPage;
