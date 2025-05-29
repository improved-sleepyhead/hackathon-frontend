import { Footer } from '@/widgets/marketing/footer'
import { Gallery } from '@/widgets/marketing/gallery'
import { Music } from '@/widgets/marketing/music'
import { Soldier } from '@/widgets/marketing/soldier'
import { WhiteBlock } from '@/widgets/marketing/white-block'

const MarketingPage = () => {
	return (
		<div className="-mt-2 flex w-full flex-col items-center">
			<Soldier />
			<WhiteBlock />
			<Gallery />
			<div className="flex w-full flex-col items-center bg-dark-main">
				<Music />
				{/* <Devs /> */}
				<Footer />
			</div>
		</div>
	)
}

export default MarketingPage
