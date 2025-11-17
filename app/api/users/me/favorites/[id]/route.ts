export const dynamic = 'force-dynamic';

import { logErrorResponse } from '@/app/api/_utils/utils';
import { api } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'storyId is required' },
        { status: 400 }
      );
    }

    // 🔥 Забираємо cookie з фронта
    const cookie = req.headers.get('cookie') ?? '';

    const res = await api.delete(`/users/me/favorites/${id}`, {
      headers: {
        Cookie: cookie,
      },
    });

    // 🔥 Повертаємо тільки data.data (чистий масив favorites)
    return NextResponse.json(res.data.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
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
