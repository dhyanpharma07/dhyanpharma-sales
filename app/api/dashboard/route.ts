import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const bills = await prisma.salesBill.findMany({
      where: {
        billDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        billAmount: true,
      },
    });

    const totalSales = bills.reduce(
      (sum, bill) => sum + Number(bill.billAmount),
      0
    );

    return NextResponse.json({
      totalSales,
      totalBills: bills.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
