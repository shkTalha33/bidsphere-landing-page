"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";

const CountdownTimer = ({ startDate, endDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = moment.utc().local(); // current local time
      const start = moment.utc(startDate).local();
      const end = moment.utc(endDate).local();

      if (now.isBefore(start)) {
        const timeUntilStart = moment.duration(start.diff(now));
        const d = Math.floor(timeUntilStart.asDays());
        const h = timeUntilStart.hours();
        const m = timeUntilStart.minutes();
        const s = timeUntilStart.seconds();
        setTimeLeft(
          `Starts in ${d}d ${h}h ${m}m ${s}s (Starts at ${start.format("DD-MMMM-YYYY h:mm A")})`
        );
      } else if (now.isBefore(end)) {
        const timeUntilEnd = moment.duration(end.diff(now));
        const d = Math.floor(timeUntilEnd.asDays());
        const h = timeUntilEnd.hours();
        const m = timeUntilEnd.minutes();
        const s = timeUntilEnd.seconds();
        setTimeLeft(
          `Ends in ${d}d ${h}h ${m}m ${s}s (Ends at ${end.format("DD-MMMM-YYYY h:mm A")})`
        );
      } else {
        setTimeLeft(`Auction ended on ${end.format("DD-MMMM-YYYY h:mm A")}`);
        if (onExpire) onExpire();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startDate, endDate, onExpire]);

  return (
    <p className="poppins_regular text_darkprimary text-[10px] mt-2">
      {timeLeft}
    </p>
  );
};

export default CountdownTimer;
