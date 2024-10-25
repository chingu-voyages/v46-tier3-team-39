import Link from "next/link";
import SVGLogo from "../../../icons/logo";
const appName = "Study AI";
export const Logo = ({ showLabel = true }: { showLabel?: boolean }) => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center relative h-full no-underline"
    >
      <SVGLogo className="h-full aspect-square [&>path]:fill-Black " />
      {showLabel && (
        <h6
          className="
          text-Black font-semibold tracking-tight text-4xl ml-2"
        >
          {appName}
        </h6>
      )}
    </Link>
  );
};
