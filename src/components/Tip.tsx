import { Link } from "react-router-dom";
import { ITip } from "../interfaces/tip";

export default function Card({ _id, name, cohort, emoji, heading, tip }: ITip) {
  return (
    <div className="bg-white w-[300px] mt-4 mb-4 mx-auto overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <Link to={`/advice/${_id}`} className="block">
        <img src="../src/assets/Flexing-Muscles-Emoji.png" alt="Emoji" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <p className="text-gray-600 mt-1">{tip}</p>
          <div className="mt-4 pt-2 border-t">
            <p className="text-sm text-gray-700">
              Advice by:{" "}
              <span className="font-medium text-gray-900">{name}</span>
            </p>
            <p className="text-sm text-gray-700">
              Cohort:{" "}
              <span className="font-medium text-gray-900">{cohort}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
