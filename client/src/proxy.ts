import { NextRequest, NextResponse } from 'next/server';
import { ETokens } from './services/auth-token';
import { AUTH_PAGES, DASHBOARD_PAGES } from './constants/pages-url';

export async function proxy(request: NextRequest) {
	const { nextUrl, cookies } = request;

	const refreshToken = cookies.get(ETokens.REFRESH_TOKEN)?.value;

	const isBasePage = nextUrl.pathname === '/';

	if (isBasePage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
		} else {
			return NextResponse.redirect(new URL(AUTH_PAGES.LOGIN, request.url));
		}
	}

	const unavailablePathForAuthUsers = nextUrl.pathname.startsWith('/auth');
	const isAuthPage =
		nextUrl.pathname.startsWith(AUTH_PAGES.LOGIN) ||
		nextUrl.pathname.startsWith(AUTH_PAGES.REGISTRATION);

	if (unavailablePathForAuthUsers && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, request.url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(AUTH_PAGES.LOGIN, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
};
