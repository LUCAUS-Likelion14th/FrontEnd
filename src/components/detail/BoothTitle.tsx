type Props = {
  name: string;
  categories: string[];
  info: string;
};

export default function BoothTitle({ name, categories, info }: Props) {
  return (
    <div className="flex flex-col gap-3 mt-3.5">
      <div className="flex items-center gap-4">
        <span className="text-[22px] font-semibold">{name}</span>
        <div className="flex gap-1.5">
          {categories.map((category) => (
            <span
              key={category}
              className="flex items-center justify-center w-[58px] h-7 px-2.5 text-center text-[14px] bg-primary text-white rounded-[43px]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <p className="break-keep">{info}</p>
    </div>
  );
}
