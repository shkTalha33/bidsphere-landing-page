"use client";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import moment from "moment";

const AuctionTimer = ({ startDate, endDate }) => {
  const [duration, setDuration] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  // 1. Calculate TOTAL DURATION (start -> end) in USER'S LOCAL TIME
  useEffect(() => {
    const start = moment(startDate).local(); // Convert start time to local
    const end = moment(endDate).local();     // Convert end time to local
    
    // Calculate duration using local times
    const diffMs = end.diff(start);          // Duration in milliseconds

    if (diffMs <= 0) {
      setDuration("Invalid duration");
      return;
    }

    // Format duration in hours, minutes, seconds
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    // Pad single-digit numbers with leading zero
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    setDuration(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
  }, [startDate, endDate]);

  // 2. Calculate REMAINING TIME (now -> end) in USER'S LOCAL TIME
  useEffect(() => {
    const updateTimer = () => {
      const now = moment().local();          // User's current local time
      const end = moment(endDate).local();   // Convert endDate to local time
      const diffMs = end.diff(now);          // Remaining time in ms

      if (diffMs <= 0) {
        setRemainingTime("Auction Ended");
        return;
      }

      // Format remaining time
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      // Pad single-digit numbers with leading zero
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      setRemainingTime(`${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#1B212C] text-[15px] poppins_regular flex items-center gap-2">
        <FaRegClock size={16} /> Total Duration: <strong>{duration}</strong>
      </p>
      <p className="text-[#1B212C] text-[15px] poppins_regular flex items-center gap-2">
        <FaRegClock size={16} /> Time Left: <strong>{remainingTime}</strong>
      </p>
    </div>
  );
};

export default AuctionTimer;