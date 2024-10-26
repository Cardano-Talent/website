<script lang="ts">
	import { toast } from 'svelte-sonner';
	import {
		freeJobDurationInDays,
		primeJobDurationInDays,
		primeJobUsdPrice
	} from '$lib/types/billing';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import CircleDollarSign from 'lucide-svelte/icons/circle-dollar-sign';
	import BadgeHelp from 'lucide-svelte/icons/badge-help';
	import CheckIcon from 'lucide-svelte/icons/check';
	import CreditCardIcon from 'lucide-svelte/icons/credit-card';
	import HearthIcon from 'lucide-svelte/icons/heart';
	import StarIcon from 'lucide-svelte/icons/star';
	import HandHelping from 'lucide-svelte/icons/hand-helping';

	const contactEmail = 'cardanotalent@gmail.com';

	const copyEmail = () => {
		navigator.clipboard.writeText(contactEmail);
		toast.success('Email has been copied to your clipboard!');
	};
</script>

<section class="w-full flex flex-col items-center justify-center gap-6 px-4 py-20">
	<div class="flex flex-col items-center gap-4 md:gap-6">
		<h1
			class="text-center text-2xl md:text-6xl font-bold leading-tight tracking-tighter lg:leading-[1.1] max-w-3xl"
		>
			<span class="text-primary">Broadcast</span> your open position to grow your team
		</h1>

		<p class="max-w-xl text-center text-lg text-muted-foreground">
			Switch from outdated recruiting platforms <br /> Reach an audience of cardanians to find the right
			person you need
		</p>

		<div
			class="w-full max-w-screen-md grid grid-cols-1 md:grid-cols-2 justify-between items-stretch gap-4"
		>
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<CircleDollarSign class="h-4 w-4" /> Simple pricing, no hidden fees
					</Card.Title>
					<Card.Description>
						Prioritize expanding your reach to stand out and locate more candidates, without the
						hassle of hidden costs or complex tiered plans
					</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<BadgeHelp class="h-4 w-4" /> Dedicated support
					</Card.Title>
					<Card.Description>
						We are different from typical job boards because we truly care about your success and
						guarantee quality assurance on your job listings across time zones
					</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<CreditCardIcon class="h-4 w-4" /> Ease of payment
					</Card.Title>
					<Card.Description>
						We accept <b class="text-blue-500">Crypto</b> as payment methods
					</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root id="prime-card">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<HearthIcon class="h-4 w-4" /> Cardano's growth
					</Card.Title>
					<Card.Description>When you grow, the community grows too!</Card.Description>
				</Card.Header>
			</Card.Root>
		</div>

		<Separator />

		<div class="w-full max-w-4xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
				<section class="bg-card rounded-lg shadow-lg overflow-hidden">
					<div class="bg-primary-foreground p-6 md:p-8 lg:p-10">
						<h2 class="text-2xl md:text-3xl font-bold">Free</h2>
						<p class="text-muted-foreground mt-2 mb-6">Get started with our free plan</p>
						<div class="flex items-baseline space-x-2">
							<span class="text-4xl font-bold">$0</span>
						</div>
					</div>

					<div class="p-6 md:p-8 lg:p-10 space-y-4">
						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Duration: <b>{freeJobDurationInDays} days</b></span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Default banner for social cards</span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Free posts are limited to one per account</span>
						</div>

						<Button href="/post-a-job/wizard?tier=free" class="w-full" variant="secondary">
							Pick free job listing
						</Button>
					</div>
				</section>

				<section class="bg-card rounded-lg shadow-lg overflow-hidden">
					<div class="bg-primary p-6 md:p-8 lg:p-10 text-white">
						<h2 class="text-2xl md:text-3xl font-bold">Prime</h2>
						<p class="mt-2 mb-6">Leverage the platform's superior features</p>
						<div class="flex items-center space-x-2">
							<span class="text-4xl font-bold flex items-center gap-1">
								${primeJobUsdPrice}
							</span>
						</div>
					</div>

					<div class="p-6 md:p-8 lg:p-10 space-y-4">
						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Duration: <b>{primeJobDurationInDays} days</b></span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Post branded with company's logo</span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-primary" />
							<span>Custom social card with company's logo</span>
						</div>

						<div class="flex items-center space-x-2">
							<Badge>Soon</Badge>
							<span>Access the talent pool</span>
						</div>

						<div class="flex items-center space-x-2">
							<Badge>Soon</Badge>
							<span>Share post on our job alerts</span>
						</div>

						<div class="flex items-start space-x-2">
							<Badge>Soon</Badge>
							<div>
								<span>Dedicated company url</span>
								<Badge class="text-xs" variant="secondary">cardanotalent.com/your-company</Badge>
							</div>
						</div>

						<Separator />

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-green-500" />
							<span>Dedicated support</span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-green-500" />
							<span>Access to all future upgrades 🛠️</span>
						</div>

						<div class="flex items-center space-x-2">
							<CheckIcon class="h-5 w-5 text-green-500" />
							<span>Support an independent business</span>
						</div>

						<Button href="/post-a-job/wizard?tier=prime" class="w-full text-white">
							Pick prime job listing
						</Button>
					</div>
				</section>
			</div>

			<section
				class="bg-card rounded-lg shadow-lg overflow-hidden border-l border-b border-r border-green-500/40"
			>
				<div class="bg-green-600 p-6 md:p-8 lg:p-10 text-white">
					<div class="flex items-center gap-1">
						<HandHelping class="w-10 h-10" />
						<h2 class="text-2xl md:text-3xl font-bold">Non-Profit and Project Catalyst</h2>
					</div>
					<p class="mt-2 text-lg font-medium">
						Job listings are free for non-profits and approved Catalyst projects
					</p>
				</div>

				<div class="p-6 md:p-8 lg:p-10 space-y-4">
					<div class="flex items-center space-x-2">
						<StarIcon class="h-5 w-5 text-green-500" />
						<span>Every <b class="text-primary">Prime</b> plan benefit is included</span>
					</div>

					<div class="flex items-center space-x-2">
						<StarIcon class="h-5 w-5 text-green-500" />
						<span>
							Only applies to non-profit organizations and companies leading projects approved by
							Catalyst
						</span>
					</div>

					<div class="flex items-center space-x-2">
						<StarIcon class="h-5 w-5 text-green-500" />
						<span>Contact us at <b>cardanotalent@gmail.com</b> to claim your discount</span>
					</div>

					<Button
						class="w-full bg-green-500 text-white text-lg"
						on:click={copyEmail}
						href="mailto:{contactEmail}"
					>
						Contact now
					</Button>
				</div>
			</section>
		</div>
	</div>
</section>
