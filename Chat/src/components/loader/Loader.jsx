import React from "react";
import { NumberTicker } from "@/components/magicui/number-ticker";

/**
 * Full-screen loader shown while the landing page initialises.
 *
 * Props:
 *   fadeOut  – boolean – when true the overlay fades out
 */
export default function Loader({ fadeOut }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <NumberTicker
          value={100}
          className="text-6xl font-extrabold text-indigo-600"
        />
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">
          Loading…
        </p>
      </div>
    </div>
  );
}