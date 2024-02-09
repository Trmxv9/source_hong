import { useEffect, useRef, useState } from "react";
import { Input, Button, Chip, Code } from "@nextui-org/react";
import { useRouter } from "next/router";

import useQueryParams from "../../hooks/useQueryParams";
import debounce from "../../utils/debounce";

export default function Search() {
  const search = useRef(null);
  const router = useRouter();
  const querySearch = useQueryParams("search");
  const queryCategory = useQueryParams("category"); // Adicione esta linha para obter a categoria da URL

  const [timer, setTimer] = useState(null);
  const [errorDebounce, setErrorDebounce] = useState(false);

  const navigateToMovie = () => {
    const isSeriePage = router.pathname.includes("/tv/serie");

    const query = { search: search.current.value };

    // Adicione a categoria à URL se ela estiver presente
    if (queryCategory) {
      query.category = queryCategory;
    }

    if (isSeriePage) {
      router.push({
        pathname: "/tv/serie",
        query,
      });
    } else {
      router.push({
        pathname: "/tv",
        query,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.current.value && !querySearch) {
      return;
    }

    setErrorDebounce(!!timer);
    debounce(navigateToMovie, 500, timer, setTimer)();
  };

  useEffect(() => {
    if (search.current) {
      search.current.value = querySearch;
    }
  }, [querySearch]);
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="max-w-[300px] mt-3 mb-10 flex gap-3">
          <Input
            type="text"
            autoComplete="off"
            id="text"
            ref={search}
            labelPlacement="outside"
            placeholder="Um titulo..."
            startContent={<i className="fas fa-search"></i>}
            className="max-w-xs"
          />
          <Button color="warning" variant="faded" type="submit">
            <i className="fas fa-print-search fa-lg"></i>
          </Button>
        </div>

        {errorDebounce && (
          <div className="mt-5">
            <Code size="lg">
              <Chip
                startContent={<i className="fas fa-times-circle"></i>}
                variant="faded"
                color="warning"
                className="mr-2 max-w-[300px]"
              >
                Aviso
              </Chip>
              Limite de requisições a API atingido. Tente novamente em alguns
              segundos!
            </Code>
          </div>
        )}
      </form>
    </div>
  );
}
