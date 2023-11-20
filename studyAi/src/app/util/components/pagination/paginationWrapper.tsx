"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
type PaginationProps<T> = {
  children: React.ReactNode;
  dataLength: number;
  hasMore: boolean;
  fetchMoreData: () => Promise<T>;
};
const PaginationWrapper = <T extends unknown>({
  children,
  dataLength,
  hasMore,
  fetchMoreData,
}: PaginationProps<T>) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      loader={
        <div className="flex justify-center items-center w-full">
          <CircularProgress color="primary" />
        </div>
      }
      next={fetchMoreData}
      hasMore={hasMore}
    >
      {children}
    </InfiniteScroll>
  );
};
export default PaginationWrapper;
