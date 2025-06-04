import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-8">
      <div className="container mx-auto px-4 pt-4 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className=" mt-2">
              A car inventory app built with React, Next.js, and Tailwind CSS,
              demonstrating my full-stack development and responsive design
              skills.
            </p>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Tabs</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className=" hover:text-amber-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/cars" className=" hover:text-amber-600">
                  Cars
                </a>
              </li>
              <li>
                <a href="/create" className=" hover:text-amber-600">
                  Create
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#">
                <FaFacebook color="#3b5998" size={24} />
              </a>
              <a href="#">
                <FaInstagram color="#e4405f" size={24} />
              </a>
              <a href="https://github.com/Su1kii">
                <FaGithub color="black" size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/steven-echeverria"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin color="#0077b5" size={24} />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 ">Contact Us</h3>
            <p className="">Email: info@yourwebsite.com</p>
            <p className="">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <p className="">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
