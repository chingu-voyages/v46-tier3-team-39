"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
type PaginationProps<T> = {
  children: React.ReactNode;
  dataLength: number;
  hasMore: boolean;
  hasChildren: boolean;
  fetchMoreData: () => Promise<T>;
};
const PaginationWrapper = <T extends unknown>({
  children,
  dataLength,
  hasMore,
  fetchMoreData,
  hasChildren,
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
      hasChildren={hasChildren}
    >
      {children}
    </InfiniteScroll>
  );
};
export default PaginationWrapper;
