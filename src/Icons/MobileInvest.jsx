import React from "react";

const MobileInvest = ({ active }) => {
  const strokeColor = active ? "#21B546" : "#000";
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 13L21.5 7.75M6.5 13L0.5 7.75M15.5 1L21.5 6.25M6.5 1L0.5 6.25M1.25 1H20.75C21.1642 1 21.5 1.33579 21.5 1.75V12.25C21.5 12.6642 21.1642 13 20.75 13H1.25C0.835786 13 0.5 12.6642 0.5 12.25V1.75C0.5 1.33579 0.835786 1 1.25 1ZM14 7C14 8.65685 12.6569 10 11 10C9.34315 10 8 8.65685 8 7C8 5.34315 9.34315 4 11 4C12.6569 4 14 5.34315 14 7Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MobileInvest;
