import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import BlogRoutes from '../modules/blog/blog.route';

const router = Router();

export interface Routes {
  path: string;
  route: Router;
}

const moduleRoutes: Routes[] = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    },
];

// register all module routes dynamically
moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
