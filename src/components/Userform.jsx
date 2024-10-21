import React, { useEffect, useState } from "react";

const Userform = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [eligibilityMessage, setEligibilityMessage] = useState("");
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("UserData")) || [];

    setData(getData);
  }, []);

  function calculateAge() {
    const dobYear = dob.slice(0, 4);
    // console.log(dobYear);
    const currentYear = new Date().getFullYear();
    const age = currentYear - dobYear;
    // console.log(age);

    if (25 > age && age > 18) {
      setEligibilityMessage("YOU ARE ELIGIBLE");
    } else {
      setEligibilityMessage("YOU ARE NOT ELIGIBLE");
    }
  }

  const AddValues = (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNo || !dob || !gender) {
      alert("Please fill out all fields before submitting.");
      return; // Stop form submission if fields are empty
    }

    const newData = [
      ...data,
      {
        Name: name,
        EmailId: email,
        PhoneNo: phoneNo,
        Dob: dob,
        Gender: gender,
      },
    ];
    setData(newData);
    localStorage.setItem("UserData", JSON.stringify(newData));
    setName("");
    setEmail("");
    setPhoneNo("");
    setDob("");
    setGender("");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
        USER FORM
      </h1>
      <form className="space-y-6" onSubmit={AddValues}>
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700">Email Id</label>
          <input
            type="email"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Date Of Birth
          </label>
          <input
            type="date"
            className="mt-1 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              calculateAge(e.target.value);
            }}
          />
          {eligibilityMessage && (
            <p className="text-gray-500 ml-2">{eligibilityMessage}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />

              <label className="ml-2 text-sm font-medium text-gray-700">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Female
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save
        </button>

      </form>
        <button onClick={() => setShowData(!showData)} className="mt-4 w-full">
          {showData ? "Hide Data" : "view Data"}
        </button>

        {showData && (
          <div>
            <h1>SAVED DATA</h1>
            <ul>
              {data.map((user, id) => (
                <li key={id} className="text-black mt-4 ">
                  <p>
                    <strong>NAME:</strong> {user.Name}
                  </p>
                  <p>
                    <strong>EMAIL:</strong> {user.EmailId}
                  </p>
                  <p>
                    <strong>PHONE NUMBER:</strong> {user.PhoneNo}
                  </p>
                  <p>
                    <strong>DATE OF BIRTH:</strong> {user.Dob}
                  </p>
                  <p>
                    <strong>GENDER:</strong> {user.Gender}{" "}
                    {/* Corrected line */}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Userform;
