import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '../../api';

export async function POST() {
  const cookieStore = await cookies();

  const deleteTokens = () => {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');
  };

  try {
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      deleteTokens();
      return NextResponse.json({ success: false });
    }

    const apiRes = await api.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const setCookie = apiRes.headers['set-cookie'];

    if (!setCookie) {
      deleteTokens();
      return NextResponse.json({ success: false });
    }

    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookieStr of cookieArray) {
      const parsed = parse(cookieStr);

      const options = {
        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
        httpOnly: parsed.HttpOnly !== undefined,
        path: parsed.Path ?? '/',
      };

      if (parsed.accessToken)
        cookieStore.set('accessToken', parsed.accessToken, options);

      if (parsed.refreshToken)
        cookieStore.set('refreshToken', parsed.refreshToken, options);

      if (parsed.sessionId)
        cookieStore.set('sessionId', parsed.sessionId, options);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    } else {
      logErrorResponse({ message: (error as Error).message });
    }

    deleteTokens();
    return NextResponse.json({ success: false });
  }
}
