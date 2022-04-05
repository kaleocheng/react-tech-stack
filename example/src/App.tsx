import { Stack, Item } from 'react-tech-stack'

const items: Item[] = [
  {
    "name": "Redis",
    "logo": "/images/logos/redis.svg",
    "status": "use",
    "type": "Middleware/Database"
  },
  {
    "name": "PostgreSQL",
    "logo": "/images/logos/postgresql.svg",
    "status": "use",
    "type": "Middleware/Database"
  }
]

const App = () => {
  return <Stack items={items} />
}

export default App
