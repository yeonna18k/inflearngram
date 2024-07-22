"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { searchMovies } from "actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search], // 쿼리키에 search값을 넣어줘야 함. 그래야 search값이 변경될 때마다 쿼리펑션이 재호출됨
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage) =>
        lastPage.page ? lastPage.page + 1 : null,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {}, [inView]);

  return (
    <div className="grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full">
      {(isFetching || isFetchingNextPage) && <Spinner />}
      {
        <>
          {data?.pages
            ?.map((page) => page.data)
            ?.flat()
            ?.map((movie) => (
              <MovieCard movie={movie} />
            ))}

          <div ref={ref}></div>
        </>
      }
    </div>
  );
}
