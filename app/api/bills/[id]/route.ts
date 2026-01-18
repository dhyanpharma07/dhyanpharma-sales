import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ IMPORTANT FIX
    const body = await req.json();

    const bill = await prisma.salesBill.update({
      where: { id },
      data: {
        billNumber: body.billNumber,
        billDate: new Date(body.billDate),
        billAmount: new Prisma.Decimal(body.billAmount),
        customerId: body.customerId,
      },
    });

    return NextResponse.json(bill);
  } catch (error: any) {
    console.error("Bill update failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update bill" },
      { status: 500 }
    );
  }
}
