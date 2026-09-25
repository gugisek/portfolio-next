import React from "react";
import { formatDate, PortfolioData } from "@lib/portfolio";

type Props = { data: PortfolioData };

export default function footer({ data }: Props) {
  return (
    <section className="bg-gradient-to-b from-[#e0e0e0] to-[#353535]">
      <div
        className="h-[70vh]"
        style={{ background: "url(img/footer.svg)", backgroundSize: "cover" }}
      ></div>
      <p className="bg-[#3d3d3d] text-[#707070] font-[Lexend-light] text-center pb-8 text-sm">
        <span className="text-[10.5px]">
          ostatnia aktualizacja - {formatDate(data.updatedAt)}
        </span>
        <br></br>
        zaprojektowane i zbudowane przez gugisek
      </p>
    </section>
  );
}
