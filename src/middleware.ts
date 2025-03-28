import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Definir las rutas permitidas por rol
const roleRoutes = {
  teacher: ["/dashboard", "/dashboard/evaluations"],
  coordinator: ["/dashboard", "/dashboard/teachers", "/dashboard/reports"],
  administrator: ["/dashboard", "/dashboard/users", "/dashboard/settings"]
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Si el usuario está autenticado y trata de acceder a /auth/login, redirigir al dashboard
    if (token && req.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Si el usuario está autenticado, verificar permisos de ruta según rol
    if (token) {
      const userRole = token.role as string;
      const path = req.nextUrl.pathname;
      
      // Verificar si la ruta actual está permitida para el rol del usuario
      const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || [];
      const hasAccess = allowedRoutes.some(route => path.startsWith(route));

      if (!hasAccess && path !== "/dashboard") {
        // Si no tiene acceso, redirigir al dashboard principal
        console.log(`Acceso denegado para ${userRole} en ruta ${path}`);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Si la ruta es /auth/login, permitir acceso sin token
        if (req.nextUrl.pathname.startsWith("/auth/login")) {
          return true;
        }
        // Para otras rutas protegidas, requerir token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};