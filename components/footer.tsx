"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 text-center text-white font-bold left-0 right-0 p-4 bg-gray-900">
      <p>
        Movie Database Scraped from{" "}
        <Link className="text-blue-600" href="https://www.themoviedb.org">
          TMDB
        </Link>
      </p>
    </footer>
  );
}
