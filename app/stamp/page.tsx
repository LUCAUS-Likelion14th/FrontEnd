import Image from "next/image";

export default function StampPage() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] pt-5 px-4 pb-10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/stamp-bg.png"
          alt="도장판 배경 이미지"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="flex justify-between relative z-10 mb-12">
        <button className="bg-white border border-text-sub px-[14.5px] py-2.5 text-base text-primary font-medium rounded-lg">
          김푸앙 | 20250000
        </button>
        <button className="bg-primary px-[37.5px] py-2.5 text-base text-white font-semibold rounded-lg">
          경품 응모하기
        </button>
      </div>

      <div className="relative flex flex-col justify-center items-center mb-[30px]">
        <Image
          src="/stamp-light.png"
          alt="빛 그라데이션"
          width={152}
          height={72}
          className="z-0"
        />
        <div className="absolute flex flex-col text-[20px] font-semibold text-center z-10">
          <span>부스를 돌며</span>
          <span>별빛을 밝혀 주세요!</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-[43px]">
        <div>진행바</div>
        <span className="text-text-sub text-[14px] font-semibold text-decoration-line: underline">
          상품은 언제 받을 수 있나요?
        </span>
      </div>

      <section>
        <div>도장</div>
      </section>
    </div>
  );
}
