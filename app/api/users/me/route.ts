export const dynamic = 'force-dynamic';

import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = request.nextUrl.searchParams.get('page') || '1';
    const perPage = request.nextUrl.searchParams.get('perPage') || '10';

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: { perPage, page },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const formData = await request.formData();

    const res = await api.patch('/users/me', formData, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
