"use client";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

const Count = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const jakartaTime = DateTime.now().setZone("Asia/Jakarta");
      const currentTime = jakartaTime.hour;

      setIsOpen(currentTime >= 10 && currentTime < 21);
    };

    const intervalId = setInterval(checkTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const textColor = isOpen ? "text-green-400" : "text-red-500";
  const statusText = isOpen ? "Online (Open Order)" : "Offline (Close Order)";

  return (
    <div className="flex flex-col justify-center items-center py-3">
      <h1 className="font-bold text-bold">
        Status: <span className={`${textColor}`}>{statusText}</span>
      </h1>
      <p>Open: 10:00 (WIB)</p>
      <p>Close: 21:00 (WIB)</p>
    </div>
  );
};

export default Count;
