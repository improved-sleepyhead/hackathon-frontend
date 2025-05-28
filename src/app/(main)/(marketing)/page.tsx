import { Footer } from '@/widgets/marketing/footer'
import { Galary } from '@/widgets/marketing/galary'
import { Music } from '@/widgets/marketing/music'
import { Soldier } from '@/widgets/marketing/soldier'
import { WhiteBlock } from '@/widgets/marketing/white-block'

const MarketingPage = () => {
	return (
		<div className="bg-orange-main flex w-full flex-col items-center">
			<Soldier />
			<WhiteBlock />
			<Galary />
			<Music />
			{/* <Devs /> */}
			<Footer />
		</div>
	)
}

export default MarketingPage
