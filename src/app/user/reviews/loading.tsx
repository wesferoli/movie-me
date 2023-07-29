import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="w-full max-w-[1136px] rounded-lg border border-yellow-500 bg-neutral-700 font-semibold">
        <div className="flex items-center justify-between rounded-t-lg bg-yellow-500 p-2 text-black md:px-4">
          <span>Movie</span>
          <span>Rating</span>
        </div>
        <div className="p-2 md:px-4">
          {[...Array(10)].map((item, index) => (
            <div className="flex justify-between gap-5 py-2" key={index}>
              <Skeleton
                containerClassName="w-[90%] sm:w-[50%]"
                className="text-base"
              />
              <Skeleton containerClassName="w-[10%]" className="text-base" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
}
