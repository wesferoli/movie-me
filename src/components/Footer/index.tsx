import Image from "next/image";
import GithubIcon from "public/github.png";
import LinkedinIcon from "public/linkedin.png";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full border-t-2 border-yellow-500 bg-neutral-700 px-24 py-4">
      <div className="grid grid-cols-8 divide-x divide-yellow-500">
        <div className="col-span-2 flex items-center justify-center gap-10 px-4 py-2">
          <a href="https://github.com/wesferoli" target="_blank">
            <Image
              src={GithubIcon}
              alt="My github"
              className="h-[50px] w-[50px]"
            />
          </a>
          <a href="https://linkedin.com/in/wesferoli" target="_blank">
            <Image
              src={LinkedinIcon}
              alt="My linkedin"
              className="h-[50px] w-[50px]"
            />
          </a>
        </div>
        <div className="col-span-4 flex items-center justify-center px-4">
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
        <div className="col-span-2 flex items-center justify-center px-4">
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
