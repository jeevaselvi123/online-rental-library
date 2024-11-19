import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-8 text-center">
      <p>© 2024 Bookish Bliss</p>
        <div className="flex gap-4 mt-4 text-center justify-center">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fa-brands fa-facebook">
              <FacebookIcon />
            </i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fa-brands fa-twitter">
              <XIcon />
            </i>
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="fa-brands fa-instagram">
              <InstagramIcon />
            </i>
          </a>
        </div>
    </footer>
  );
}
