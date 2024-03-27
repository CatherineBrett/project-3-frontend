import React from "react";

function UserProfile() {
  // useEffect(() => {
  //   async function fetchTip() {
  //     const resp = await fetch(`/api/user/${userId}`);
  //     const userData = await resp.json();
  //     const userToEdit = {
  //       name: userData.name,
  //       cohort: userData.cohort,
  //       emoji: userData.emoji,
  //       heading: userData.heading,
  //       tip: userData.tip,
  //     };
  //     setFormData(userToEdit);
  //     setAdviceCharCount(userData.tip.length);
  //     setHeadingCharCount(userData.heading.length);
  //   }
  //   fetchTip();
  // }, []);

  return (
    <>
      <section className="justify-center min-h-screen container mx-auto p-5 flex gap-16 bg-gray-100 ">
        <div className=" bg-white p-3 border-t-4 border-red-400 ">
          <h1>Username</h1>
        </div>

        <div>
          <form>
            <div className="bg-white p-3 shadow-sm rounded-sm max-w-2xl border-red-400 border-t-4">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-red-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Profile</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name:
                    </label>
                    <input
                      type="text"
                      name={"email"}
                      id={"email"}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  <div className="grid grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn:
                    </label>
                    <input
                      type="text"
                      name={"linkedIn"}
                      id={"linkedIn"}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="block text-sm font-medium text-gray-700">
                      Email
                    </div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        conor@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      GitHub:
                    </label>
                    <input
                      type="text"
                      name={"gitHub"}
                      id={"gitHub"}
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserProfile;
