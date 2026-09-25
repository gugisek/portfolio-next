import Portfolio from '@components/portfolio'
import { sitePortfolio } from '@lib/portfolio'
import { readPortfolio } from '@lib/portfolio-store'

// read data/portfolio.json on every request, so edits from /cv_edit show up immediately
export const dynamic = 'force-dynamic'

export default async function Pl() {
  const data = sitePortfolio(await readPortfolio())
  return (
    
    <section className='text-white overflow-x-clip'>
      <head>
        <meta name="description" content="Mam 18 lat, uczęszczam do czwartej klasy w zespole szkół nr 14 w Warszawie na kierunku informatyk. Moją pasją jest programowanie, a w szczególności tworzenie stron internetowych."/>
        <title>GuGiSeK - pasjonat branży IT</title>
        <link rel="icon" href="/img/faviconPL.png" />
      </head>
      <div>
        <Portfolio data={data} lang="pl" />
      </div>
    </section>
  )
}
