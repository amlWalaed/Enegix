import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const { isAuth } = useAuth()
  if (!isAuth.value) {
    next({
      replace: true,
      name: 'login',
    })
  } else {
    next()
  }
}
