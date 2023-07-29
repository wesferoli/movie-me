import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="mx-4 my-8 max-w-[1136px] flex-grow rounded-lg border border-yellow-500 bg-neutral-700 p-2 sm:mx-10 sm:p-4 md:mx-10 md:flex md:gap-4 md:p-10 lg:mx-24 lg:my-10 lg:gap-6 lg:p-10 xl:p-16">
        <div className="md:w-[160px] xl:w-[200px]">
          <Skeleton
            containerClassName="flex justify-center md:justify-start w-full md:w-[320px] 2xl:w-[370px]"
            className="h-[240px] max-w-[160px] md:h-[240px] md:max-w-[160px] xl:h-[280px] xl:max-w-[190px]"
          />
          <Skeleton
            containerClassName="flex justify-center mt-2"
            className="h-8 max-w-[160px]"
            borderRadius={50}
          />
        </div>
        <div className="mt-5 md:mt-2 md:w-full">
          <Skeleton
            containerClassName="flex justify-center md:justify-start"
            className="max-w-[250px] text-2xl sm:max-w-[300px] lg:text-3xl xl:text-4xl"
          />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <Skeleton
                containerClassName="w-7 md:w-8 mr-1"
                className="h-7 md:h-8"
                circle
              />
              <Skeleton containerClassName="w-[120px]" className="text-sm" />
            </div>
            <Skeleton
              containerClassName="w-[30px] sm:w-[80px]"
              className="text-base"
            />
          </div>

          <div className="mt-4">
            <Skeleton className="text-base" count={5} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
