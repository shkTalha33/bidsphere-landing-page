"use client"
import React, { useEffect, useState } from "react";
import moment from "moment";

const CountdownTimer = ({ startDate, endDate, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const start = moment.utc(startDate).local();
      const end = moment.utc(endDate).local();
      const now = moment();

      if (end.isBefore(now)) {
        setTimeLeft(`Ended on ${end.format("DD-MMMM-YYYY h:mm A")}`);
        if (onExpire) onExpire();
        return;
      }

      const timeLeftDuration = moment.duration(end.diff(now));
      const leftDays = Math.floor(timeLeftDuration.asDays());
      const leftHours = timeLeftDuration.hours();
      const leftMinutes = timeLeftDuration.minutes();
      const leftSeconds = timeLeftDuration.seconds();

      let timeString = "";
      
      // Add days if greater than 0
      if (leftDays > 0) {
        timeString += `${leftDays}d `;
      }
      
      // Add hours if greater than 0
      if (leftHours > 0) {
        timeString += `${leftHours}h `;
      }
      
      // Add minutes if greater than 0
      if (leftMinutes > 0) {
        timeString += `${leftMinutes}m `;
      }

      // Always show seconds
      timeString += `${leftSeconds}s`;

      timeString += ` (Ends at ${end.format("DD-MMMM-YYYY h:mm A")})`;

      setTimeLeft(timeString);
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
