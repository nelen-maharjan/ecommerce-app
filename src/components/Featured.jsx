import React from "react";
import Title from "./Title";
import { Button } from "./ui/button";

const Featured = () => {
  return (
    <div className="mb-8">
      <Title title="Featured" heading="New Arrival" />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-96 gap-2 lg:gap-5">
        <div
          className="bg-black text-white bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 p-3"
          style={{ backgroundImage: `url(/arrival_1.png)` }}
        >
          <h2 className="font-bold text-lg">Play Station 5</h2>
          <p className="text-xs w-48">
            Black and White version of the PS5 coming out on sale.
          </p>
          <Button className="w-20 bg-transparent">Shop now</Button>
        </div>
        <div className="grid grid-rows-2 gap-2 lg:gap-5">
          <div
            className="bg-black text-white bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 p-3"
            style={{ backgroundImage: `url(/arrival_5.png)` }}
          >
            <h2 className="font-bold text-lg">Watches</h2>
            <p className="text-xs w-48">
              Featured men collections that give you another vibe
            </p>
            <Button className="w-20 bg-transparent">Shop now</Button>
          </div>

          <div
            className="bg-black text-white bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 p-3"
            style={{ backgroundImage: `url(/arrival_4.png)` }}
          >
            <h2 className="font-bold text-lg">Perfume</h2>
            <p className="text-xs w-48">
              GUCCI INTENSE OUD EDP
            </p>
            <Button className="w-20 bg-transparent">Shop now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
