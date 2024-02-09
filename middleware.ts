// import { auth } from '@/auth'
// import { DEFAULT_AUTH_REDIRECT, REDIRECT_TO_LOGIN } from '@/lib/constants'
// import { apiAuthPrefix, apiPrefix, authRoutes } from '@/routes'

// export default auth((request) => {
// 	const { nextUrl } = request

// 	const isLoggedIn = !!request.auth
// 	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
// 	const isApiRoute = nextUrl.pathname.startsWith(apiPrefix)
// 	const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

// 	if (isApiAuthRoute) return null

// 	if (isApiRoute) return null

// 	if (isAuthRoutes) {
// 		if (isLoggedIn) {
// 			return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
// 		}
// 		return null
// 	}

// 	if (!isLoggedIn && !isApiAuthRoute) {
// 		return Response.redirect(new URL(REDIRECT_TO_LOGIN, nextUrl))
// 	}

// 	return null
// })

import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
	publicRoutes: ['/api/uploadthing']
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
