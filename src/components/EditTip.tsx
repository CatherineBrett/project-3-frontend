import { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ITip } from "../interfaces/tip";

export default function EditTip() {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    emoji: "",
    heading: "",
    tip: "",
  });

  const [adviceCharCount, setAdviceCharCount] = useState(0);
  const [headingCharCount, setHeadingCharCount] = useState(0);

  useEffect(() => {
    async function fetchTip() {
      const resp = await fetch(`/api/tips/${tipId}`);
      const tipData = await resp.json();
      const tipToEdit = {
        name: tipData.name,
        cohort: tipData.cohort,
        emoji: tipData.emoji,
        heading: tipData.heading,
        tip: tipData.tip,
      };
      setFormData(tipToEdit);
      setAdviceCharCount(tipData.tip.length)
      setHeadingCharCount(tipData.heading.length)
    }
    fetchTip();
  }, []);

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    if (e.target.id === "heading") {
      setHeadingCharCount(e.target.value.length);
    }
    if (e.target.id === "tip") {
      setAdviceCharCount(e.target.value.length);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.put(`/api/tips/${tipId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    navigate("/advice");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Edit Advice
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="control">
              <input
                type="text"
                name={"name"}
                id={"name"}
                onChange={handleChange}
                value={formData.name}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="cohort"
              className="block text-sm font-medium text-gray-700"
            >
              Cohort
            </label>
            <div>
              <input
                type="text"
                name={"cohort"}
                id={"cohort"}
                onChange={handleChange}
                value={formData.cohort}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="emoji"
              className="block text-sm font-medium text-gray-700"
            >
              Advice Category
            </label>
            <div>
              <select
                value={formData.emoji}
                onChange={handleChange}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="emoji"
                id="emoji"
              >
                <option value="" disabled>
                  - Pick a category -
                </option>
                <option value="study-tips">Study tips 📚</option>
                <option value="staying-motivated">Staying motivated 💪</option>
                <option value="self-care">Looking after yourself 🧘‍♀️</option>
                <option value="comic-relief">Comic relief! 🤣</option>
                <option value="misc">Miscellaneous 💡</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="heading"
              className="block text-sm font-medium text-gray-700"
            >
              {`Heading (${headingCharCount}/15)`}
            </label>
            <div>
              <input
                type="text"
                name={"heading"}
                id={"heading"}
                maxLength={15}
                onChange={handleChange}
                value={formData.heading}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="tip"
              className="block text-sm font-medium text-gray-700"
            >
              {`Your Advice (${adviceCharCount}/200)`}
            </label>
            <div>
              <textarea
                name={"tip"}
                id={"tip"}
                maxLength={200}
                onChange={handleChange}
                value={formData.tip}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return <div></div>;
}
