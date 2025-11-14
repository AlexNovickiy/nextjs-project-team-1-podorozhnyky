export const dynamic = 'force-dynamic';

import { isAxiosError } from 'axios';
import { NextResponse, NextRequest } from 'next/server';
import { logErrorResponse } from '../_utils/utils';
import { api } from '../api';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '10';
    const category = searchParams.get('category') || '';

    const res = await api.get('/stories', {
      params: {
        page,
        perPage,
        category: category || undefined,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
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


export async function POST(request: Request) {
 try {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  if(!accessToken) {
   return NextResponse.json(
    { message: 'Unauthorized' }, 
    { status: 401 });
  }

  const formData = await request.formData();
  const res = await api.post('/stories', formData, {
   headers: {
    Cookie: cookieStore.toString(),
   }
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
     { status: 500 })
  }
}
