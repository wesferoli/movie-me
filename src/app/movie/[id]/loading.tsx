import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="mx-4 my-8 w-full max-w-[1136px] rounded-lg border border-yellow-500 bg-neutral-700 p-2 md:mx-10 md:grid md:grid-cols-12 md:gap-x-4 md:p-4 lg:mx-24 lg:my-10 lg:p-10 xl:gap-x-8 xl:p-16">
        <section className="pb-3 md:col-span-3 md:pb-4">
          <div className="flex flex-col items-center justify-center">
            <Skeleton
              className="min-h-[240px] max-w-[160px] md:max-w-[230px] lg:min-h-[320px]"
              containerClassName="flex justify-center w-full"
            />
            <Skeleton
              className="max-h-[20px] max-w-[20px]"
              containerClassName="flex justify-center mt-2 w-full"
              circle
              count={5}
            />
            <Skeleton
              className="h-9 max-w-[150px]"
              containerClassName="flex justify-center mt-1 w-full"
              borderRadius={50}
            />
          </div>
        </section>
        <section className="my-3 md:col-span-9 md:mb-4 md:mt-0">
          <Skeleton className="max-w-[450px] text-2xl md:text-left lg:text-3xl xl:text-4xl" />
          <Skeleton
            className="mt-2 max-w-[200px] text-sm"
            containerClassName="flex justify-center md:justify-start"
          />

          <div className="mt-6">
            <Skeleton count={5} className="text-sm lg:text-base" />
          </div>
          <div className="mt-6">
            <Skeleton className="max-w-[100px] text-base" />
            <Skeleton count={2} className="text-sm lg:text-base" />
          </div>
          <div className="mt-2">
            <Skeleton className="max-w-[100px] text-base" />
            <Skeleton count={2} className="text-sm lg:text-base" />
          </div>
        </section>
        <section className="pt-2 md:col-span-12 md:pt-3">
          <Skeleton className="max-w-[100px] text-2xl lg:text-3xl" />

          <div className="mt-6 space-y-4">
            {[...Array(3)].map((item, index) => (
              <div className="flex items-center justify-between" key={index}>
                <div className="flex w-full items-center">
                  <Skeleton
                    className="min-h-[40px]"
                    containerClassName="min-w-[40px] mr-4"
                    circle
                  />
                  <Skeleton
                    className="max-w-[100px] text-base"
                    containerClassName="w-full hidden md:inline"
                  />
                </div>
                <Skeleton
                  className="max-h-[16px] max-w-[150px]"
                  containerClassName="flex justify-center items-center w-full"
                />
                <Skeleton
                  className="max-h-[16px] max-w-[50px] md:max-w-[80px]"
                  containerClassName="flex w-full justify-end gap-1"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </SkeletonTheme>
  );
}
