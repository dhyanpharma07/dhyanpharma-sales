import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type =
      (searchParams.get("type") as
        | "monthly"
        | "quarterly"
        | "yearly") || "monthly";

    const bills = await prisma.salesBill.findMany({
      select: {
        billDate: true,
        billAmount: true,
      },
    });

    const map: Record<string, number> = {};

    bills.forEach((bill) => {
      const date = new Date(bill.billDate);
      let key = "";

      if (type === "yearly") {
        key = `${date.getFullYear()}`;
      } else if (type === "quarterly") {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${quarter}-${date.getFullYear()}`;
      } else {
        // monthly
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      map[key] = (map[key] || 0) + Number(bill.billAmount);
    });

    const data = Object.entries(map)
      .map(([key, total]) => {
        if (type === "yearly") {
          return { label: key, total };
        }

        if (type === "quarterly") {
          const [q, year] = key.split("-");
          return { label: `${q} ${year}`, total };
        }

        const [year, month] = key.split("-");
        return { label: `${month}/${year}`, total };
      })
      .sort((a, b) => {
        if (type === "yearly") {
          return Number(a.label) - Number(b.label);
        }

        if (type === "quarterly") {
          const [qa, ya] = a.label.split(" ");
          const [qb, yb] = b.label.split(" ");

          if (ya !== yb) return Number(ya) - Number(yb);
          return qa.localeCompare(qb);
        }

        const [ma, ya] = a.label.split("/");
        const [mb, yb] = b.label.split("/");
        return (
          new Date(`${ya}-${ma}-01`).getTime() -
          new Date(`${yb}-${mb}-01`).getTime()
        );
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Sales chart API error:", error);
    return NextResponse.json(
      { error: "Failed to load chart data" },
      { status: 500 }
    );
  }
}
