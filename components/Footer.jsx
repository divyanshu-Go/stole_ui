import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t py-4">
      <div className="container flex flex-col items-center justify-between gap-2 md:h-20 md:flex-row">
        <p className="text-center text-sm text-gray-500 md:text-left">
          Built by{" "}
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            your-name
          </a>
          . View the source on{" "}
          <a
            href="https://github.com/yourusername/project"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
