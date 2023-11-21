"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
type PaginationProps<T> = {
  children: React.ReactNode;
  dataLength: number;
  hasMore: boolean;
  hasChildren: boolean;
  fetchMoreData: () => Promise<T>;
  scrollableTarget?: string | React.ReactNode;
};
const PaginationWrapper = <T extends unknown>({
  children,
  dataLength,
  hasMore,
  fetchMoreData,
  hasChildren,
  scrollableTarget,
}: PaginationProps<T>) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      loader={
        <div className="flex justify-center items-center w-full p-8">
          <CircularProgress color="primary" />
        </div>
      }
      style={{ overflow: "hidden" }}
      next={fetchMoreData}
      hasMore={hasMore}
      hasChildren={hasChildren}
      scrollableTarget={scrollableTarget}
      scrollThreshold={0.6}
    >
      {children}
    </InfiniteScroll>
  );
};
export default PaginationWrapper;
