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
    next()
  } else {
    next({
      replace: true,
      name: 'home',
    })
  }
}
