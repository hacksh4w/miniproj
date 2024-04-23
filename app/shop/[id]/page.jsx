// Logic: Each shop has an ID. On clicking the id, id is passed over here and fetches data from db and displays it over here.

import { Navbar } from "../../../components";
import Image from "next/image";

const shop = ({ params }) => {
  // logic for fetching data from db
  return (
    <>
      <Navbar />
      <div class="w-screen flex-col gap-10 sm:px-16 px-6 flex justify-center items-center lg:pt-16 lg:pb-[140px] md:pt-16 md:pb-[140px] sm:pt-16 sm:pb-[140px] ss:pt-16 ss:pb-[140px] xs:pt-4 xs:pb-[140px] pt-4 pb-[140px] bg-gradient">
        <div class="bg-white w-10/12 gap-10 lg:max-w-screen-lg lg:flex-row lg:gap-40 md:max-w-screen-md md:flex-row md:gap-40 sm:max-w-screen-sm ss:max-w-screen-xs xs:max-w-screen-xs p-10 rounded-lg shadow-lg flex flex-col items-center justify-start">
          <div class="flex-none w-1/2 sm:w-1/3">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg"
              alt="Your Image"
              width={24}
              height={24}
              class="w-full h-auto rounded-lg"
            />
          </div>
          <div class="flex-grow pl-4">
            <h2 class="text-lg font-semibold mb-2">Shop Name</h2>
            <p>Rating: /5</p>
            <p class="text-sm">Desc</p>
            <p>Location</p>
            <p>Phone</p>
          </div>
        </div>

        <div class="bg-white w-10/12 gap-10 flex-col lg:max-w-screen-lg flex-rowmd:max-w-screen-md sm:max-w-screen-sm ss:max-w-screen-xs xs:max-w-screen-xs p-10 rounded-lg shadow-lg flex flex-row items-center justify-start">
          <h2>Available Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="px-4 border border-orange-500 rounded-xl max-w-[400]">
              <div>
                <Image
                  className="w-full h-auto cursor-pointer"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg"
                  width={200}
                  height={300}
                  alt="img"
                />
              </div>
              <div className="space-y-2 py-2">
                <h2 className="text-orange-400 uppercase text-center font-bold">
                  Free
                </h2>
                <p className="text-gray-500 max-w-[150px]">Totally free</p>
                <p>Rating</p>
                <div className="font-bold flex gap-4">Rs. 1000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default shop;
