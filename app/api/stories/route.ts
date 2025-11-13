import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';
import { isAxiosError } from 'axios';

export async function POST(request: Request) {
 try {
  const cookieStore = await cookies();

  const token = cookieStore.get('authToken');
  if(!token) {
   return NextResponse.json(
    { message: 'Unauthorized' }, 
    { status: 401 });
  }

  const { title, description, shortDescription, category, storyImage } = await request.json();

  const res = await api.post('/stories', {
   title,
   description,
   shortDescription,
   category,
   storyImage
  }, {
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