import { Stack, Item } from 'react-tech-stack'

const items: Item[] = [
  {
    "name": "Redis",
    "logo": "https://www.vectorlogo.zone/logos/redis/redis-icon.svg",
    "status": "use",
    "type": "Database/Middleware",
    "color": "#ffffff",
    "bgColor": "#c92d39"
  },
  {
    "name": "PostgreSQL",
    "logo": "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg",
    "status": "investigate",
    "type": "Database/Middleware"
  }
]

const App = () => {
  return <Stack items={items} bgColorFrom={'#14532D'}/>
}

export default App
