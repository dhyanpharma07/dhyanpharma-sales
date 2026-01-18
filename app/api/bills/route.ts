import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/* -------------------- CREATE BILL -------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Incoming bill payload:", body);

    if (
      !body.billNumber ||
      !body.billDate ||
      !body.billAmount ||
      !body.customerId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bill = await prisma.salesBill.create({
      data: {
        billNumber: body.billNumber,
        billDate: new Date(body.billDate),
        billAmount: new Prisma.Decimal(body.billAmount),
        customerId: body.customerId,
      },
    });

    return NextResponse.json(bill);
  } catch (error: any) {
    console.error("Sales bill creation failed:", error);

    return NextResponse.json(
      { error: error.message || "Failed to save bill" },
      { status: 500 }
    );
  }
}

/* -------------------- GET BILLS -------------------- */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const customerId = searchParams.get("customerId");

  /* ✅ 1. Single bill by ID */
  if (id) {
    const bill = await prisma.salesBill.findUnique({
      where: { id },
      include: {
        customer: true,
        payments: true,
      },
    });

    return NextResponse.json(bill);
  }

  /* ✅ 2. Bills by Customer ID */
  if (customerId) {
    const bills = await prisma.salesBill.findMany({
      where: { customerId },
      include: {
        customer: true,
        payments: true,
      },
      orderBy: {
        billDate: "desc",
      },
    });

    return NextResponse.json(bills);
  }

  /* ✅ 3. All bills */
  const bills = await prisma.salesBill.findMany({
    include: {
      customer: true,
      payments: true,
    },
    orderBy: {
      billDate: "desc",
    },
  });

  return NextResponse.json(bills);
}
