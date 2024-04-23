// Logic: Each shop has an ID. On clicking the id, id is passed over here and fetches data from db and displays it over here.

import { Navbar } from "../../../components";
import Image from "next/image";

const shop = ({ params }) => {
  // logic for fetching data from db
  return (
    <>
      <Navbar />
      <div
        class="w-screen sm:px-16 px-6 flex justify-center items-center lg:pt-16 lg:pb-[140px] md:pt-16 md:pb-[140px] sm:pt-16 sm:pb-[140px] ss:pt-16 ss:pb-[140px] xs:pt-4 xs:pb-[140px] pt-4 pb-[140px] bg-gradient"
      >
        <div class="bg-white w-full gap-40 lg:max-w-screen-lg flex-rowmd:max-w-screen-md sm:max-w-screen-sm ss:max-w-screen-xs xs:max-w-screen-xs p-10 rounded-lg shadow-lg flex flex-row items-center justify-start">
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
            <p class="text-sm">Desc</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default shop;
