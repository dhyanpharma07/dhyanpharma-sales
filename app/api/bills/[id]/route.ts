import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * UPDATE bill
 * PUT /api/bills/:id
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

/**
 * DELETE bill
 * DELETE /api/bills/:id
 */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Bill ID is required" },
        { status: 400 }
      );
    }

    const existingBill = await prisma.salesBill.findUnique({
      where: { id },
    });

    if (!existingBill) {
      return NextResponse.json(
        { error: "Bill not found" },
        { status: 404 }
      );
    }

    await prisma.salesBill.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bill delete failed:", error);
    return NextResponse.json(
      { error: "Failed to delete bill" },
      { status: 500 }
    );
  }
}
