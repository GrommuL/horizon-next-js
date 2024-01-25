import { auth } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/lib/constants'
import { apiAuthPrefix, authRoutes } from '@/routes'

export default auth((request) => {
	const { nextUrl } = request

	const isLoggedIn = !!request.auth
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoute) return null

	if (isAuthRoutes) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
		}
		return null
	}

	if (!isLoggedIn && !isApiAuthRoute) {
		return Response.redirect(new URL('/login', nextUrl))
	}

	return null
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
