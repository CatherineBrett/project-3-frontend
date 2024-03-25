import { Link } from "react-router-dom";
import { ITip } from "../interfaces/tip";
import { IEmoji } from "../interfaces/emoji";

const emojis: IEmoji = {
  "study-tips": "📚",
  "staying-motivated": "💪",
  "self-care": "🧘‍♀️",
  "comic-relief": "🤣",
  misc: "💡",
};

const vibeColors = {
  "study-tips": "bg-blue-100 hover:bg-blue-200 text-blue-800",
  "staying-motivated": "bg-green-100 hover:bg-green-200 text-green-800",
  "self-care": "bg-purple-100 hover:bg-purple-200 text-purple-800",
  "comic-relief": "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
  misc: "bg-gray-100 hover:bg-gray-200 text-gray-800",
};

export default function Card({ _id, name, cohort, emoji, heading, tip }: ITip) {
  const cardClasses = `mt-4 mb-4 mx-auto overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg flex flex-col justify-between h-full ${
    vibeColors[emoji] || "bg-white"
  }`;

  return (
    <div className={cardClasses}>
      <Link
        to={`/advice/${_id}`}
        className="hover:shadow-lg flex flex-col flex-grow"
      >
        <p className="text-center text-5xl p-4">{emojis[emoji]}</p>
        <div className="p-4 flex-grow">
          <h3 className="text-center text-md lg:text-lg font-semibold">
            {heading}
          </h3>
          <p className="mt-1 text-center">{tip}</p>
        </div>
        <div className="flex-grow"></div>
        <div className="mt-4 pt-2 border-t p-4">
          <p className="text-xs lg:text-sm text-center">
            Advice from: <span className="font-medium">{name}</span>
          </p>
          <p className="text-xs lg:text-sm text-center">
            Cohort: <span className="font-medium">{cohort}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
