import React from "react";

export interface IconActionProps {
  icon: string;
  className?: string;
  strokeWidth: number;
  iconText?: string;
  iconTextClass?: string;
  action?: () => void;
}

const IconAction = (props: IconActionProps) => {
  return (
    <div onClick={props.action} className="cursor-pointer flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={props.strokeWidth}
        stroke="currentColor"
        className={props.className || ""}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={props.icon} />
      </svg>

      {props.iconText ? (
        <span className={props.iconTextClass || ""}>{props.iconText}</span>
      ) : null}
    </div>
  );
};

export default IconAction;
