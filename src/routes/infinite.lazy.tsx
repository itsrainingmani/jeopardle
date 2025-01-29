import { Game } from '@/components/Infinite'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/infinite')({
  component: Game,
})
