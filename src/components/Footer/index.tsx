import Image from "next/image";
import GithubIcon from "public/github.png";
import LinkedinIcon from "public/linkedin.png";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-yellow-500 bg-neutral-700 px-4 sm:px-10 sm:py-2 lg:px-24">
      <div className="grid grid-cols-1 divide-yellow-500 text-sm max-sm:divide-y sm:grid-cols-8 sm:divide-x sm:py-2 md:text-base">
        <div className="flex items-center justify-center gap-6 py-4 sm:col-span-2 sm:px-4 lg:gap-10">
          <a href="https://github.com/wesferoli" target="_blank">
            <Image
              src={GithubIcon}
              alt="My github"
              className="h-[35px] w-[35px] md:h-[45px] md:w-[45px]"
            />
          </a>
          <a href="https://linkedin.com/in/wesferoli" target="_blank">
            <Image
              src={LinkedinIcon}
              alt="My linkedin"
              className="h-[35px] w-[35px] md:h-[45px] md:w-[45px]"
            />
          </a>
        </div>
        <div className="flex items-center justify-center py-4 sm:col-span-4 sm:px-4">
          <span className="text-center" data-testid="icons-credits">
            Icones criados por{" "}
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
          <span className="text-center" data-testid="see-on-github">
            Veja esse projeto no{" "}
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
