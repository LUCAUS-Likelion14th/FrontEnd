"use client";

import BackButton from "../../common/Button/BackButton";

type Props = {
  title: string;
};

export default function DetailHeader({ title }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 px-4 py-5">
        <BackButton />
        <span className="text-[20px] font-semibold">{title}</span>
      </div>
    </div>
  );
}
