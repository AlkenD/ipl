"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import fetchData from "../fetchData";
import Image from "next/image";
import franchises from "../franchises";

function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 8;
  let randomId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

const Table = () => {
  const [data, setData] = useState<any>([]);

  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //   fetchData().then((res) => {
  //     setData(res);
  //   });
  //   }, 5000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData().then((res) => {
        setData(res);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <nav className="py-4 px-6 flex justify-between items-center">
        <Image
          width={100}
          height={100}
          src={"https://www.iplt20.com/assets/images/ipl-logo-new-old.png"}
          alt="logo"
        />
        <div className="font-semibold">St. Francis College IPL Auction</div>
        {/* <div>
            <button onClick={handle.active ? handle.exit : handle.enter}>
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m0 0h24v24h-24z" fill="none" />
                <path d="m7 14h-2v5h5v-2h-3zm-2-4h2v-3h3v-2h-5zm12 7h-3v2h5v-5h-2zm-3-12v2h3v3h2v-5z" />
              </svg>
            </button>
          </div> */}
      </nav>
      <div className="space-y-10">
        {franchises.map((franchise) => (
          <Card
            key={generateRandomId()}
            franchiseData={franchise}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;

const Card = ({ franchiseData, data }: any) => {
  const franchise = franchiseData;
  const filteredPlayers = data.filter(
    (obj: any) => obj.franchise === franchiseData.team
  );
  const totalAmount = filteredPlayers.reduce(
    (accumulator: any, obj: { amount: any }) => accumulator + obj.amount,
    0
  );
  const remainingAmount = 100 - totalAmount;
  return (
    <div className={`p-4 space-y-4 ${franchise.style}`}>
      <div>
        <div>
          <Image width={50} height={50} src={franchise.logo} alt="team_logo" />
        </div>
        <div>
          <div className="text-lg font-bold">{franchise.team}</div>
          <div className="font-bold text-lg">
            Balance - {Number(remainingAmount.toFixed(1))} CR
          </div>
          <div>{filteredPlayers.length} Members</div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Player Name
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Fan Stars
              </th>
              <th scope="col" className="px-6 py-3">
                Base Price
              </th>
              <th scope="col" className="px-6 py-3">
                Purchase Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((item: any) => (
              <tr
                key={generateRandomId()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.rating}</td>
                <td className="px-6 py-4">{item.fan_star}</td>
                <td className="px-6 py-4">{item.base_value} CR</td>
                <td className="px-6 py-4">{item.amount} CR</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
