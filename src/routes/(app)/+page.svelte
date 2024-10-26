<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Seo } from '$lib/components/seo';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import ShareIcon from 'lucide-svelte/icons/share-2';
	import HearthShake from 'lucide-svelte/icons/heart-handshake';
	import User from 'lucide-svelte/icons/user';
	import Users from 'lucide-svelte/icons/users';
	import ShoppingBag from 'lucide-svelte/icons/shopping-bag';
	import MessageCircleQuestion from 'lucide-svelte/icons/message-circle-question';
	import BoxesIcon from 'lucide-svelte/icons/boxes';
	import BriefCaseBusiness from 'lucide-svelte/icons/briefcase-business';
	import PostMenu from '$lib/components/postMenu.svelte';
</script>

<Seo />

<section
	class="w-full flex flex-col items-center justify-center gap-6 px-4 py-20 md:pt-36 md:pb-28 min-h-96"
>
	<div class="flex flex-col items-center gap-4 md:gap-6">
		<h1
			class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] max-w-2xl"
		>
			The <span class="text-primary">Ultimate</span> Next-Gen Marketplace
		</h1>

		<p class="max-w-lg text-center text-lg sm:text-xl text-muted-foreground">
			Discover your dream job from the fastest-growing companies that are harnessing the future of
			Cardano
		</p>

		<div class="flex justify-center items-center gap-4">
			<PostMenu>
				<Button variant="ghost" class="md:px-8 text-base">
					<CirclePlus class="mr-2 h-4 w-4" /> Post
				</Button>
			</PostMenu>

			<Button href="/jobs" variant="default" class="md:px-8 text-base">
				<Search class="mr-2 h-4 w-4" /> Find your dream job
			</Button>
		</div>
	</div>
</section>

<Carousel.Root
	opts={{
		align: 'center',
		loop: true
	}}
	plugins={[
		Autoplay({
			delay: 4000
		})
	]}
	class="w-full max-w-xl mx-auto -mt-16 px-4"
>
	<Carousel.Content>
		<Carousel.Item class="basis-10/12">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center -space-x-2">
						<Avatar.Root>
							<Avatar.Image src="/img/home/figma.png" />
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Image src="/img/home/plutus.png" />
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Image src="/img/home/aiken.png" />
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Image src="/img/home/blockfrost.png" />
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Image src="/img/home/mesh.png" />
						</Avatar.Root>
					</div>

					<Card.Title>Design & Development</Card.Title>
					<Card.Description>Explore jobs at companies shaping Web3 Adoption</Card.Description>
				</Card.Header>
			</Card.Root>
		</Carousel.Item>

		<Carousel.Item class="basis-10/12">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center -space-x-2">
						<Avatar.Root>
							<Avatar.Fallback><ShareIcon class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Fallback><HearthShake class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>
					</div>

					<Card.Title>Marketing & Non-Tech</Card.Title>
					<Card.Description>
						Find non-tech skills roles or Web3 marketing related jobs
					</Card.Description>
				</Card.Header>
			</Card.Root>
		</Carousel.Item>

		<Carousel.Item class="basis-10/12">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center -space-x-2">
						<Avatar.Root>
							<Avatar.Fallback><ShoppingBag class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Fallback>
								<MessageCircleQuestion class="w-6 h-6 opacity-75" />
							</Avatar.Fallback>
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Fallback><BoxesIcon class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>
					</div>

					<Card.Title>Sales, Customer support. Just everyone</Card.Title>
					<Card.Description>
						This is for anyone who wants to be part of Cardano's future
					</Card.Description>
				</Card.Header>
			</Card.Root>
		</Carousel.Item>

		<Carousel.Item class="basis-10/12">
			<Card.Root>
				<Card.Header>
					<div class="flex items-center -space-x-2">
						<Avatar.Root>
							<Avatar.Fallback><User class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Fallback><BriefCaseBusiness class="w-6 h-6 opacity-75" /></Avatar.Fallback>
						</Avatar.Root>

						<Avatar.Root>
							<Avatar.Fallback>
								<Users class="w-6 h-6 opacity-75" />
							</Avatar.Fallback>
						</Avatar.Root>
					</div>

					<Card.Title>Employers</Card.Title>
					<Card.Description>
						Any agency, startup or company can find their next best hire
					</Card.Description>
				</Card.Header>
			</Card.Root>
		</Carousel.Item>
	</Carousel.Content>
</Carousel.Root>
