import React from "react";

type Props = {
  width: number;
  height: number;
};

function NoImage({ width, height }: Readonly<Props>) {
  return <div className={`bg-[gray] w-[${width || 100}px] h[${height || 60}px] rounded-sm`}></div>;
}

export default NoImage;
