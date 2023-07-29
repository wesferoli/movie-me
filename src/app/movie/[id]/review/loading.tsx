import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="mx-4 my-8 max-w-[1136px] flex-grow rounded-lg border border-yellow-500 bg-neutral-700 p-2 sm:mx-10 sm:p-4 md:mx-10 md:p-10 lg:mx-24 lg:my-10 lg:p-10 xl:p-16">
        <div className="flex flex-col sm:flex-row">
          <Skeleton
            containerClassName="flex justify-center sm:justify-start w-full sm:w-[250px] md:w-[320px] 2xl:w-[370px]"
            className="h-[240px] max-w-[160px] md:h-[300px] md:max-w-[200px] xl:h-[335px] xl:max-w-[225px] 2xl:max-w-[250px]"
          />
          <div className="w-full">
            <Skeleton
              containerClassName="flex w-full justify-center mt-2 sm:justify-start"
              className="max-w-[300px] text-2xl sm:text-left md:max-w-[450px] lg:text-3xl xl:text-4xl"
            />
            <Skeleton
              containerClassName="flex w-full justify-center mt-1 sm:justify-start md:mt-2"
              className="max-h-[14px] max-w-[250px]"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Skeleton
            containerClassName="mt-3 xl:mt-8"
            className="max-w-[80px] text-base"
          />
          <Skeleton
            containerClassName="mt-1 flex space-x-1"
            className="h-5 w-5 max-w-[20px]"
            count={5}
            circle
          />

          <Skeleton
            containerClassName="mt-2"
            className="max-w-[80px] text-base"
          />
          <Skeleton className="h-8" />
          <Skeleton
            containerClassName="mt-2"
            className="max-w-[80px] text-base"
          />
          <Skeleton className="h-[120px]" />

          <Skeleton
            containerClassName="flex justify-center w-full mt-4"
            className="h-8 max-w-[100px] sm:max-w-[150px]"
            borderRadius={50}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}
