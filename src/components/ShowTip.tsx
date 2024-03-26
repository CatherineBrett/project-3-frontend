import React, { SyntheticEvent, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Tip";
import { ITip } from "../interfaces/tip";
import { ChevronLeft, ChevronRight } from "react-feather";
import axios from "axios"
import { IUser } from "../interfaces/user";


export default function ShowTip({ user }: { user: null | IUser }) {
  const [tip, setTip] = useState<ITip | null>(null);
  const [carouselTips, setCarouselTips] = useState<ITip[]>([]);
  const [current, setCurrent] = useState(0);
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate()

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
      const token = localStorage.getItem('token')
      await axios.delete('/api/tips/' + tipId, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/advice')
    } catch (e: any) {
      console.log(e.response.data)
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
        <div className="flex flex-wrap justify-center lg:flex-nowrap gap-8">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2">
            <Card key={tip._id} {...tip} />
          </div>
          <div className="flex-initial w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">About the User</h2>
              <p>{tip.user?.bio}</p>
            </div>
          {tip && (user?._id === tip.user._id || user?._id === "66029050610777603484521b") && <div className="mt-4"><button onClick={deleteTip} className="bg-red-500 text-white px-10 py-2 rounded-full hover:bg-red-400 mt-12">Delete Tip</button></div>}
          </div>
        </div>
      </section>
      <section className="mt-8 container mx-auto">
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
                className={`cursor-pointer transition-all w-3 h-3 bg-white bg-opacity-10 rounded-full ${
                  current === i ? "p-2 bg-blue-500" : "bg-opacity-20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
