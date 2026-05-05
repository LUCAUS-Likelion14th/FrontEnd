type Props = {
  name: string;
  categories: string[];
  info: string;
};

export default function BoothTitle({ name, categories, info }: Props) {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-6">
        <span className="text-2xl font-semibold">{name}</span>
        <div className="flex gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="flex items-center justify-center w-[68px] h-9 px-2.5 text-center text-base bg-primary text-white rounded-[43px]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <p>{info}</p>
    </div>
  );
}
