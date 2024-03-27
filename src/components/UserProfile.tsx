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
      <section className="flex justify-center min-h-screen bg-gray-100 p-5">
        <div className="container mx-auto flex gap-10">
          <div className="bg-white p-3 shadow-sm rounded-sm border-t-4 border-red-400 max-h-80 max-w-64 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Jane Doe</h1>
            <p className="text-sm text-gray-600">Owner at Her Company Inc.</p>
            <div className="my-3">
              <p className="text-gray-700 text-sm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p>
            </div>
            <button className="mt-3 px-4 py-1 bg-red-500 text-white rounded-full text-sm">
              Active
            </button>
            <div className="mt-3">
              <p className="text-gray-600 text-sm">Member since Nov 07, 2016</p>
            </div>
          </div>

          <div className="flex-1">
            <form>
              <div className="bg-white p-3 shadow-sm rounded-sm border-t-4 border-red-400 flex justify-center">
                <div className="flex items-center justify-center space-x-2 font-semibold text-gray-900 leading-8 mb-4">
                  <span className="tracking-wide font-bold">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-1 text-sm gap-x-8 gap-y-4">
                    <div className="grid grid-cols-2 items-center">
                      <span className="text-right text-gray-600">
                        Full Name:
                      </span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="ml-4 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-red-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 items-center mt-4">
                      <span className="text-right text-gray-600">Email: </span>
                      <div className="flex items-center">
                        <p className="ml-4 w-full p-2 border rounded-md"> whatever the email is</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center sm:col-span-2 mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProfile;