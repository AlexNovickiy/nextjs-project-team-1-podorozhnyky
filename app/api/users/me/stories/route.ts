import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../../_utils/utils';
import { api } from '../../../api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const url = request.nextUrl;
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('perPage') || '10';

    const query = `?page=${page}&perPage=${perPage}`;

    const res = await api(`/users/me/stories${query}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      validateStatus: () => true,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse?.(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status || 500 }
      );
    }

    logErrorResponse?.({ message: (error as Error).message });

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
