
import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

const AboutPage = () => {
  return (
    <div className=" max-w-7xl mx-auto px-4 py-8 text-slate-300 space-y-8">
      <h1 className="text-4xl font-bold text-white">About Stole UI</h1>

      <p>
        <strong>Stole UI</strong> is an open-source, minimalistic component library built for modern developers who love clean design and dark mode aesthetics. Whether you're building a dashboard, a landing page, or a creative portfolio, Stole UI provides you with flexible and beautifully crafted UI elements that help you move fast without compromising on quality.
      </p>

      <p>
        The goal of Stole UI is to " bridge the gap between design and development ". Instead of starting from scratch every time, you can explore, reuse, and remix elements to speed up your workflow. Every component is built using modern technologies like Next.js, Tailwind CSS, and designed with accessibility and responsiveness in mind.
      </p>

      <p>
        The name "Stole UI" reflects the ethos of open collaboration — we believe in learning by observing great work, improving it, and contributing back. It’s about celebrating community-driven innovation and empowering developers to build beautiful UIs faster.
      </p>

      <p>
        This project is not just a component library. It's also a place to:
      </p>

      <ul className="list-disc list-inside space-y-2 ml-2">
        <li>Submit your own UI creations and contribute to the collection.</li>
        <li>Take part in creative front-end challenges.</li>
        <li>Explore blogs and guides for learning and inspiration.</li>
      </ul>

      <hr className="border-zinc-700 my-6" />

      <h2 className="text-2xl font-semibold text-white">About the Developer</h2>

      <p>
        Hi! I’m <strong>Divyanshu Sharma</strong>, a passionate developer who loves building tools that help other developers. I created Stole UI to make it easier for people like me to access well-designed, production-ready components without needing to browse through endless design sites or rebuild the same things repeatedly.
      </p>

      <p>
        Stole UI is a passion project — something I’m actively building and improving based on community feedback. I believe in open source, clean code, and sharing knowledge. If you're enjoying the project or want to contribute, feel free to connect with me!
      </p>

      <div className="flex items-center gap-4 pt-6">
        <Link
          href="/elements"
          className="btn  hover:bg-indigo-700 text-white"
        >
          Explore Elements
        </Link>

        <Link
          href="https://github.com/divyanshu-Go/stole_ui"
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-zinc-800 hover:bg-zinc-700 text-white flex items-center"
        >
          <Github className="mr-2 w-4 h-4" />
          GitHub
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
