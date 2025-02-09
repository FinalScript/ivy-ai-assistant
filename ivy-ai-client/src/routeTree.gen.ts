/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OnboardingImport } from './routes/onboarding'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as CoursesImport } from './routes/courses'
import { Route as AuthImport } from './routes/auth'
import { Route as R404Import } from './routes/404'
import { Route as IndexImport } from './routes/index'
import { Route as TimetableSetupIndexImport } from './routes/timetable-setup/index'
import { Route as TimetableSetupReviewImport } from './routes/timetable-setup/review'

// Create/Update Routes

const OnboardingRoute = OnboardingImport.update({
  id: '/onboarding',
  path: '/onboarding',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const CoursesRoute = CoursesImport.update({
  id: '/courses',
  path: '/courses',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const R404Route = R404Import.update({
  id: '/404',
  path: '/404',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TimetableSetupIndexRoute = TimetableSetupIndexImport.update({
  id: '/timetable-setup/',
  path: '/timetable-setup/',
  getParentRoute: () => rootRoute,
} as any)

const TimetableSetupReviewRoute = TimetableSetupReviewImport.update({
  id: '/timetable-setup/review',
  path: '/timetable-setup/review',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/404': {
      id: '/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof R404Import
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/courses': {
      id: '/courses'
      path: '/courses'
      fullPath: '/courses'
      preLoaderRoute: typeof CoursesImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/onboarding': {
      id: '/onboarding'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof OnboardingImport
      parentRoute: typeof rootRoute
    }
    '/timetable-setup/review': {
      id: '/timetable-setup/review'
      path: '/timetable-setup/review'
      fullPath: '/timetable-setup/review'
      preLoaderRoute: typeof TimetableSetupReviewImport
      parentRoute: typeof rootRoute
    }
    '/timetable-setup/': {
      id: '/timetable-setup/'
      path: '/timetable-setup'
      fullPath: '/timetable-setup'
      preLoaderRoute: typeof TimetableSetupIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/auth': typeof AuthRoute
  '/courses': typeof CoursesRoute
  '/dashboard': typeof DashboardRoute
  '/onboarding': typeof OnboardingRoute
  '/timetable-setup/review': typeof TimetableSetupReviewRoute
  '/timetable-setup': typeof TimetableSetupIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/auth': typeof AuthRoute
  '/courses': typeof CoursesRoute
  '/dashboard': typeof DashboardRoute
  '/onboarding': typeof OnboardingRoute
  '/timetable-setup/review': typeof TimetableSetupReviewRoute
  '/timetable-setup': typeof TimetableSetupIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/auth': typeof AuthRoute
  '/courses': typeof CoursesRoute
  '/dashboard': typeof DashboardRoute
  '/onboarding': typeof OnboardingRoute
  '/timetable-setup/review': typeof TimetableSetupReviewRoute
  '/timetable-setup/': typeof TimetableSetupIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/404'
    | '/auth'
    | '/courses'
    | '/dashboard'
    | '/onboarding'
    | '/timetable-setup/review'
    | '/timetable-setup'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/404'
    | '/auth'
    | '/courses'
    | '/dashboard'
    | '/onboarding'
    | '/timetable-setup/review'
    | '/timetable-setup'
  id:
    | '__root__'
    | '/'
    | '/404'
    | '/auth'
    | '/courses'
    | '/dashboard'
    | '/onboarding'
    | '/timetable-setup/review'
    | '/timetable-setup/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  R404Route: typeof R404Route
  AuthRoute: typeof AuthRoute
  CoursesRoute: typeof CoursesRoute
  DashboardRoute: typeof DashboardRoute
  OnboardingRoute: typeof OnboardingRoute
  TimetableSetupReviewRoute: typeof TimetableSetupReviewRoute
  TimetableSetupIndexRoute: typeof TimetableSetupIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  R404Route: R404Route,
  AuthRoute: AuthRoute,
  CoursesRoute: CoursesRoute,
  DashboardRoute: DashboardRoute,
  OnboardingRoute: OnboardingRoute,
  TimetableSetupReviewRoute: TimetableSetupReviewRoute,
  TimetableSetupIndexRoute: TimetableSetupIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/404",
        "/auth",
        "/courses",
        "/dashboard",
        "/onboarding",
        "/timetable-setup/review",
        "/timetable-setup/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/404": {
      "filePath": "404.tsx"
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/courses": {
      "filePath": "courses.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/onboarding": {
      "filePath": "onboarding.tsx"
    },
    "/timetable-setup/review": {
      "filePath": "timetable-setup/review.tsx"
    },
    "/timetable-setup/": {
      "filePath": "timetable-setup/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
