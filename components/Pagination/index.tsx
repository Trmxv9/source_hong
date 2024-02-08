import { useMemo } from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router";
import useQueryParams from "@/hooks/useQueryParams";

interface PaginationProps {
  totalPages: number;
  initialPage: number;
}

const Paginations: React.FC<PaginationProps> = ({
  totalPages,
  initialPage,
}) => {
  const router = useRouter();
  const search = useQueryParams("search");
  const selectedCategory = useQueryParams("category");

  const currentPage = useMemo(() => {
    if (router.query.page) {
      return Number(router.query.page);
    }
    return initialPage;
  }, [router.query.page, search, selectedCategory, initialPage]);

  const handlePageChange = (selectedPage: number) => {
    const targetPath = router.pathname === "/tv" ? "/tv" : "/tv/serie";

    router.push({
      pathname: targetPath,
      query: { page: selectedPage, search, category: selectedCategory },
    });
  };

  return (
    <>
      <Pagination
        isCompact
        showControls
        total={totalPages}
        initialPage={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Paginations;
