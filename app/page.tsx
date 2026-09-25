import Portfolio from '@components/portfolio'
import { sitePortfolio } from '@lib/portfolio'
import { readPortfolio } from '@lib/portfolio-store'

// read data/portfolio.json on every request, so edits from /cv_edit show up immediately
export const dynamic = 'force-dynamic'

export default async function Home() {
  const data = sitePortfolio(await readPortfolio())
  return (
    <section className='text-white overflow-x-clip'>
      <Portfolio data={data} lang="en" />
    </section>
  )
}
