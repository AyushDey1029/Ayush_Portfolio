import { getPortfolioData } from '@/lib/excelParser';
import PortfolioClient from '@/components/PortfolioClient';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="portfolio-wrapper">
      <PortfolioClient data={data} />
    </main>
  );
}
