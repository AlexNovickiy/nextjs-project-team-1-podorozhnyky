import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';
import { parse } from 'cookie';

const publicPaths = ['/auth/login', '/auth/register'];
const privatePaths = ['/profile', '/stories-create', '/user-edit'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  const isPrivatePath = privatePaths.some(path => pathname.startsWith(path));

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkServerSession();
      const setCookie = data?.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            httpOnly: parsed.HttpOnly !== undefined,
          };
          if (parsed.accessToken) {
            cookieStore.set('accessToken', parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
          if (parsed.sessionId) {
            cookieStore.set('sessionId', parsed.sessionId, options);
          }
        }

        if (isPublicPath) {
          return NextResponse.redirect(new URL('/', req.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }

        if (isPrivatePath) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }

    if (isPublicPath) {
      return NextResponse.next();
    }

    if (isPrivatePath) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  if (isPublicPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (isPrivatePath) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/stories/create/:path*',
    '/user-edit/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
