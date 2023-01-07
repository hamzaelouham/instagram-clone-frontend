import Image from "next/image";

export const LoadingComponent = () => {
  return (
    <div className="flex h-screen show-model">
      <div className="m-auto">
        <Image src="/images/insta.png" height={80} width={80} alt="logo" />
      </div>
    </div>
  );
};
