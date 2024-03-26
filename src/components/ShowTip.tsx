import React from "react";
import { useParams } from "react-router-dom";
import { ITip } from "../interfaces/tip";
import { IUser } from "../interfaces/user";
import Card from "./Tip";

export default function ShowTip() {
  const [tip, setTip] = React.useState<ITip | null>(null);
  const { tipId } = useParams<{ tipId: string }>();

  React.useEffect(() => {
    async function fetchTip() {
      try {
        const response = await fetch(`/api/tips/${tipId}`);
        const data: ITip = await response.json();
        setTip(data);

      } catch (error) {
        console.error("Error fetching tip:", error);
      }
    }
    fetchTip();
  }, [tipId]);

  if (!tip) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto pt-24 flex justify-center gap-8">
      <div className="flex flex-wrap justify-center lg:flex-nowrap gap-8">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2">
          <Card key={tip._id} {...tip} />
        </div>
        <div className="flex-initial w-full md:w-1/2 lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">About the User</h2>
            <p>{tip.user?.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
