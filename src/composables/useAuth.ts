export default () => {
  const userId = useLocalStorage<User['id'] | null>('currentUserId', null)
  const isAuth = computed(() => {
    return Boolean(userId.value)
  })
  return {
    userId,
    isAuth,
  }
}
