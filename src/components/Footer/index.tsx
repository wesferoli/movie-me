import Image from "next/image";
import GithubIcon from "public/github.png";
import LinkedinIcon from "public/linkedin.png";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full border-t-2 border-yellow-500 bg-neutral-700 px-5 py-4 sm:px-10 lg:px-24">
      <div className="grid grid-cols-1 divide-yellow-500 max-sm:divide-y sm:grid-cols-8 sm:divide-x sm:py-2">
        <div className="flex items-center justify-center gap-6 py-4 sm:col-span-2 sm:px-4 lg:gap-10">
          <a href="https://github.com/wesferoli" target="_blank">
            <Image
              src={GithubIcon}
              alt="My github"
              className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
            />
          </a>
          <a href="https://linkedin.com/in/wesferoli" target="_blank">
            <Image
              src={LinkedinIcon}
              alt="My linkedin"
              className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
            />
          </a>
        </div>
        <div className="flex items-center justify-center py-4 sm:col-span-4 sm:px-4">
          <span className="text-center">
            Icons created by{" "}
            <a
              href="https://www.flaticon.com/authors/freepik"
              title="movie icons"
              className="font-semibold text-yellow-500"
              target="_blank"
            >
              Freepik - Flaticon
            </a>
          </span>
        </div>
        <div className="flex items-center justify-center py-4 sm:col-span-2 sm:px-4">
          <span className="text-center">
            See this project on{" "}
            <a
              href="https://github.com/wesferoli/movie-me"
              className="font-semibold text-yellow-500"
              target="_blank"
            >
              Github
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}