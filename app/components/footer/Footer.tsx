import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span>Luis Silva</span>
          <Link
            href="https://github.com/luisSilvaEs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            <FaGithub />
          </Link>{" "}
          <Link
            href="https://www.linkedin.com/in/luis-silva-es/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            <FaLinkedin />
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()} All rights reserved</div>
      </div>
    </footer>
  );
}
