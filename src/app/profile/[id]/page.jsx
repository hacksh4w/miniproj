// import { createClient } from "@supabase/supabase-js"

const page = () => {
  // const supabase = createClient();

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold mb-4">Profile Information</h1>
        <hr />
        {/* {profileData && ( */}
        <div>
          <div className="mb-4">
            <p className="font-semibold">Name:</p>
            {/* <p>{profileData.name}</p> */}
          </div>
          <div className="mb-4">
            <p className="font-semibold">Phone Number:</p>
            {/* <p>{profileData.phone_number}</p> */}
          </div>
          <div className="mb-4">
            <p className="font-semibold">Address:</p>
            {/* <p>{profileData.address}</p> */}
          </div>
          <div className="mb-4">
            <p className="font-semibold">Role:</p>
            {/* <p>{profileData.role}</p> */}
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default page;
