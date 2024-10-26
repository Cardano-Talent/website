import type { SvelteComponent } from 'svelte';
import Google from './google.svelte';
import GitHub from './github.svelte';
import Twitter from './x.svelte';
import Discord from './discord.svelte';
import LinkedIn from './linkedin.svelte';
import Telegram from './telegram.svelte';
import Facebook from './facebook.svelte';
import Crunchbase from './crunchbase.svelte';

export type Icon = SvelteComponent;

export const Icons = {
	google: Google,
	github: GitHub,
	twitter: Twitter,
	discord: Discord,
	linkedIn: LinkedIn,
	telegram: Telegram,
	facebook: Facebook,
	crunchbase: Crunchbase
};
