import { Link } from "react-router-dom";
import { ITip } from "../interfaces/tip";
import { IEmoji } from "../interfaces/emoji";

const emojis: IEmoji = {
  "study-tips": "📚",
  "staying-motivated": "💪",
  "self-care": "🧘‍♀️",
  "comic-relief": "🤣",
  "misc": "💡"
}

export default function Card({ _id, name, cohort, emoji, heading, tip }: ITip) {
  return (
    <div className="bg-white w-[300px] mt-4 mb-4 mx-auto overflow-hidden rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <Link to={`/advice/${_id}`} className="block">
        <p className="text-center text-6xl">{emojis[emoji]}</p>
        <div className="p-4">
          <h3 className="text-center text-lg font-semibold text-gray-900">{heading}</h3>
          <p className="text-gray-600 mt-1 text-center">{tip}</p>
          <div className="mt-4 pt-2 border-t">
            <p className="text-sm text-gray-700 text-center">
              Advice by:{" "}
              <span className="font-medium text-gray-900">{name}</span>
            </p>
            <p className="text-sm text-gray-700 text-center">
              Cohort:{" "}
              <span className="font-medium text-gray-900">{cohort}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
