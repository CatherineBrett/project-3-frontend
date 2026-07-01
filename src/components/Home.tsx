import React, { useState, useEffect } from "react";
import Card from "../components/Tip";
import { ITip } from "../interfaces/tip";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

export default function Home() {
  const [tips, setTips] = useState<ITip[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchTips() {
      try {
        const response = await fetch(`${baseUrl}/tips`);
        const data: ITip[] = await response.json();
        setTips(data.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    }
    fetchTips();
  }, []);

  const steps = [
    {
      title: "Explore Insights",
      description:
        "Browse through a curated collection of wisdom and experiences. Find nuggets of knowledge that can propel you forward in your bootcamp journey.",
    },
    {
      title: "Join the Community",
      description:
        "Sign up and create your own unique account. Join our vibrant community of bootcamp enthusiasts!",
    },
    {
      title: "Share and Empower",
      description:
        "Log in to unlock the power of sharing. Your insights can be the beacon for someone else's journey!",
    },
    {
      title: "Craft Your Advice",
      description:
        "Start creating and sharing your advice. Your wisdom is a gift - wrap it up for others to unwrap!",
    },
  ];

  const goToPrevSlide = () => {
    setCurrent(current === 0 ? tips.length - 1 : current - 1);
  };

  const goToNextSlide = () => {
    setCurrent(current === tips.length - 1 ? 0 : current + 1);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-10 max-w-6xl mx-auto m-5">
          <div className="text-center lg:text-left space-y-4 max-w-xl p-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to <span className="text-red-600">Bootcamp Buddy!</span>
            </h1>
            <p className="text-gray-700">
              This full-stack application was made by Michael, Conor and
              Catherine as part of General Assembly's Software Engineering
              Immersive Bootcamp. We built our own backend and frontend using
              Express, Mongoose, MongoDB, and React.
            </p>
            <p className="text-gray-700">
              We wanted to create a space for General Assembly students past and
              present to share advice on getting the most out of their courses
              and bootcamps. Anyone is welcome to view the advice other students
              have contributed, and if you would like to share a tip or two of
              your own, then you will need to{" "}
              <Link
                to="/signup"
                className="text-red-600 font-bold hover:underline"
              >
                sign up here
              </Link>
              .
            </p>
            <p className="text-gray-700 italic">
              Thanks for visiting! - Michael, Conor, and Catherine (SEB-78)
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <h3 className="text-2xl font-semibold text-center mb-6">
              How to Get Started
            </h3>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="overflow-hidden relative w-full max-w-2xl pt-10 ">
          <div
            className="flex transition-transform ease-linear duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {tips.map((tip, index) => (
              <div
                key={tip._id}
                className="w-full flex-none"
                style={{ minWidth: "100%" }}
              >
                <Card {...tip} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={goToPrevSlide}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNextSlide}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {tips.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`cursor-pointer transition-all w-3 h-3 bg-white bg-opacity-10 rounded-full ${
                  current === i ? "p-2 bg-blue-500" : "bg-opacity-20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
