export const dynamic = 'force-dynamic';

import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const res = await api.get(`/stories/${id}`);

    // 🔥 ВАЖЛИВО: повертаємо ТІЛЬКИ story
    return NextResponse.json(res.data.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
