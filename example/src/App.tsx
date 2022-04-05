import { Stack, Item } from 'react-tech-stack'

const items: Item[] = [
  {
    "name": "Redis",
    "logo": "/images/logos/redis.svg",
    "status": "use",
    "type": "Database/Middleware"
  },
  {
    "name": "PostgreSQL",
    "logo": "/images/logos/postgresql.svg",
    "status": "use",
    "type": "Database/Middleware"
  }
]

const App = () => {
  return <Stack items={items} />
}

export default App
