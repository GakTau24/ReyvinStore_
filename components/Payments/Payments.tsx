import Image from "next/image";

const Payment = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-10">
        <h1 className="uppercase font-bold text-xl">methode pembayaran</h1>
      </div>
      <div className="flex flex-col justify-center items-center px-5">
        <div className="grid grid-cols-3 gap-2">
          <Image
            src={"/payments/atm.png"}
            height={700}
            width={700}
            alt="ATM"
            className="md:h-24 md:w-32"
            objectFit="cover"
            priority
          />
          <Image
            src={"/payments/dana.png"}
            height={700}
            width={700}
            alt="Dana"
            className="md:h-24 md:w-32"
            objectFit="cover"
            priority
          />
          <Image
            src={"/payments/ovo.png"}
            height={700}
            width={700}
            alt="OVO"
            className="md:h-[86px] md:w-[110px]"
            objectFit="cover"
            priority
          />
          <Image
            src={"/payments/gopay.png"}
            height={700}
            width={700}
            alt="Gopay"
            className="md:h-[90px] md:w-28"
            objectFit="cover"
            priority
          />
          <Image
            src={"/payments/spay.png"}
            height={700}
            width={700}
            alt="ShopeePay"
            className="md:h-24 md:w-32"
            objectFit="cover"
            priority
          />
          <Image
            src={"/payments/qris.png"}
            height={700}
            width={700}
            alt="Dana"
            className="md:h-32 md:w-32"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Payment;