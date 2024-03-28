import { SyntheticEvent, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

export default function CreateTip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    emoji: "",
    heading: "",
    tip: "",
  });

  const [errorData, setErrorData] = useState({
    name: "",
    cohort: "",
    emoji: "",
    heading: "",
    tip: "",
    misc: "",
  });

  const [adviceCharCount, setAdviceCharCount] = useState(0);
  const [headingCharCount, setHeadingCharCount] = useState(0);

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    const newErrorData = structuredClone(errorData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    newErrorData[fieldName as keyof typeof errorData] = "";
    setFormData(newFormData);
    setErrorData(newErrorData);
    if (e.target.id === "heading") {
      setHeadingCharCount(e.target.value.length);
    }
    if (e.target.id === "tip") {
      setAdviceCharCount(e.target.value.length);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const resp = await axios.post(`${baseUrl}/tips`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(resp.data);
        navigate("/advice");
      }
    } catch (e: any) {
      setErrorData(e.response.data.errors);
    }
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [formData.tip]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
              {errorData.name && (
                <small className="text-red-500">{errorData.name}</small>
              )}
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
              {errorData.cohort && (
                <small className="text-red-500">{errorData.cohort}</small>
              )}
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
                <option value="" disabled>
                  - Pick a category -
                </option>
                <option value="study-tips">Study tips 📚</option>
                <option value="staying-motivated">Staying motivated 💪</option>
                <option value="self-care">Looking after yourself 🧘‍♀️</option>
                <option value="comic-relief">Comic relief! 🤣</option>
                <option value="misc">Miscellaneous 💡</option>
              </select>
              {errorData.emoji && (
                <small className="text-red-500">{errorData.emoji}</small>
              )}
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
              {errorData.heading && (
                <small className="text-red-500">{errorData.heading}</small>
              )}
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
                ref={textAreaRef}
                name={"tip"}
                id={"tip"}
                maxLength={200}
                onChange={handleChange}
                value={formData.tip}
                className="hide-scrollbar resize-none mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 h-32"
              />
              {errorData.tip && (
                <small className="text-red-500">{errorData.tip}</small>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {errorData.misc && (
              <small className="text-red-500">{errorData.misc}</small>
            )}
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring focus:border-red-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
