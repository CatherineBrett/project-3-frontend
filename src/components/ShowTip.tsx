import React, { SyntheticEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Tip";
import { ITip } from "../interfaces/tip";
import { ChevronLeft, ChevronRight } from "react-feather";
import axios from "axios";
import { IUser } from "../interfaces/user";
import { Link } from "react-router-dom";

export default function ShowTip({ user }: { user: null | IUser }) {
  const [tip, setTip] = useState<ITip | null>(null);
  const [carouselTips, setCarouselTips] = useState<ITip[]>([]);
  const [current, setCurrent] = useState(0);
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTip() {
      try {
        const response = await fetch(`/api/tips/${tipId}`);
        const data: ITip = await response.json();
        setTip(data);
      } catch (error) {
        console.error("Error fetching tip:", error);
      }
    }

    async function fetchTipsForCarousel() {
      try {
        const response = await fetch("/api/tips");
        const data: ITip[] = await response.json();
        setCarouselTips(data.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching tips for carousel:", error);
      }
    }

    fetchTip();
    fetchTipsForCarousel();
  }, [tipId]);

  async function deleteTip(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/tips/" + tipId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/advice");
    } catch (e: any) {
      console.log(e.response.data);
    }
  }

  const goToPrevSlide = () => {
    setCurrent(current === 0 ? carouselTips.length - 1 : current - 1);
  };

  const goToNextSlide = () => {
    setCurrent(current === carouselTips.length - 1 ? 0 : current + 1);
  };

  if (!tip) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto pt-24 flex justify-center gap-8">
        <div className="flex flex-wrap justify-center lg:flex-nowrap gap-24">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2">
            <Card key={tip._id} {...tip} />
            <div className="flex justify-center mt-4">
              {tip && user?._id === tip.user._id && (
                <Link to={"/advice/edit/" + tipId} className="mr-4">
                  <button className="bg-blue-500 text-white px-10 py-2 rounded-full hover:bg-blue-400 text-sm">
                    Edit Tip
                  </button>
                </Link>
              )}
              {tip && (user?._id === tip.user._id || user?.isAdmin) && (
                <button
                  onClick={deleteTip}
                  className="bg-red-500 text-white px-10 py-2 rounded-full hover:bg-red-400 text-sm"
                >
                  Delete Tip
                </button>
              )}
            </div>
          </div>
          <div className="flex-initial w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">
                {tip.user?.username
                  ? `More from ${tip.user.username}:`
                  : "User information not available"}
              </h2>
              <p>{tip.user?.bio}</p>
            </div>
            <div className="flex p-8">
              <a
                href={`https://github.com/${tip.user.gitHub}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                ><path
                  fill="currentColor"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.58 0-.287-.012-1.05-.015-2.06-3.338.724-4.042-1.547-4.042-1.547-.546-1.387-1.333-1.755-1.333-1.755-1.088-.74.082-.724.082-.724 1.205.085 1.838 1.238 1.838 1.238 1.07 1.833 2.808 1.303 3.494.996.108-.78.418-1.303.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.312.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.908 1.23 3.22 0 4.61-2.805 5.623-5.475 5.92.42.368.81 1.102.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .318.215.7.825.58C20.565 21.792 24 17.3 24 12c0-6.63-5.37-12-12-12z"></path></svg>
                GitHub
              </a>
              <a
                href={`https://www.linkedin.com/${tip.user?.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center ml-4"
              >Linked
                <img
                  src="../src/assets/linkedIn.jpg"
                  alt="LinkedIn"
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-36 mb-24 ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Explore More Tips
        </h2>
        <div className="overflow-hidden relative w-full max-w-2xl mx-auto pt-10">
          <div
            className="flex transition-transform ease-linear duration-700"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {carouselTips.map((carouselTip, index) => (
              <div
                key={carouselTip._id}
                className="w-full flex-none"
                style={{ minWidth: "100%" }}
              >
                <Card {...carouselTip} />
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
            {carouselTips.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`cursor-pointer transition-all w-3 h-3 bg-white bg-opacity-10 rounded-full ${current === i ? "p-2 bg-blue-500" : "bg-opacity-20"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
