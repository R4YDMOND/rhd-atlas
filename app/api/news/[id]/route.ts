import { NextRequest, NextResponse } from "next/server";
import { updateNews, deleteNews } from "@/lib/services/content.service";
import { apiError } from "@/lib/api/errors";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const news = await updateNews(id, body);
    return NextResponse.json(news);
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await deleteNews(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiError(error);
  }
}
