import { Studio } from 'sanity'
import sanityConfig from '../../sanity.config'

// Full-height studio, unstyled — Sanity provides its own CSS
const StudioPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Studio config={sanityConfig} />
    </div>
  )
}

export default StudioPage
