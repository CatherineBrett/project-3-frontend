import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    emoji: "",
    heading: "",
    tip: "",
  });

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.post("/api/tips", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    navigate("/advice"); // add advice list page location here
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Give Advice
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
                defaultValue=""
                onChange={handleChange}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="emoji"
                id="emoji"
              >
                <option value="" disabled selected>
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
              Heading
            </label>
            <div>
              <input
                type="text"
                name={"heading"}
                id={"heading"}
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
              Your Advice
            </label>
            <div>
              <input
                type="text"
                name={"tip"}
                id={"tip"}
                onChange={handleChange}
                value={formData.tip}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
