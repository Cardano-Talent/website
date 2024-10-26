/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Companies = "companies",
	Fundings = "fundings",
	Jobs = "jobs",
	Payments = "payments",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum CompaniesStatusOptions {
	"inactive" = "inactive",
	"review" = "review",
	"active" = "active",
	"reported" = "reported",
}
export type CompaniesRecord = {
	about?: string
	crunchbase?: string
	discord?: string
	facebook?: string
	invoice_email?: string
	linkedIn?: string
	location?: string
	markets?: string
	name?: string
	non_profit?: boolean
	profile_picture?: string
	purchased_post?: boolean
	size?: string
	source?: string
	status: CompaniesStatusOptions
	tagline?: string
	telegram?: string
	twitter?: string
	website?: string
}

export type FundingsRecord = {
	amount: number
	company: RecordIdString
	currency: string
	date: IsoDateString
	source?: string
	stage: string
}

export enum JobsTierOptions {
	"free" = "free",
	"prime" = "prime",
}

export enum JobsStatusOptions {
	"inactive" = "inactive",
	"active" = "active",
	"expired" = "expired",
	"needs review" = "needs review",
	"reported" = "reported",
	"removed" = "removed",
}

export enum JobsTypeOptions {
	"Full Time" = "Full Time",
	"Part Time" = "Part Time",
	"Contract" = "Contract",
	"Freelance" = "Freelance",
	"Temporary" = "Temporary",
	"Intern" = "Intern",
	"Volunteer" = "Volunteer",
}

export enum JobsCategoryOptions {
	"Back End" = "Back End",
	"Consulting" = "Consulting",
	"Customer Support" = "Customer Support",
	"Design" = "Design",
	"Developer" = "Developer",
	"Devops and Sysadmin" = "Devops and Sysadmin",
	"Education" = "Education",
	"Front End" = "Front End",
	"Full Stack" = "Full Stack",
	"Healthcare" = "Healthcare",
	"Human Resources" = "Human Resources",
	"Legal" = "Legal",
	"Manager/Exec" = "Manager/Exec",
	"Marketing" = "Marketing",
	"Non-Tech" = "Non-Tech",
	"Operations" = "Operations",
	"Quality Assurance" = "Quality Assurance",
	"Sales" = "Sales",
	"Testing" = "Testing",
	"Writing" = "Writing",
	"Other" = "Other",
}

export enum JobsApplicationMethodOptions {
	"url" = "url",
	"email" = "email",
}

export enum JobsBenefitsOptions {
	"401(k)" = "401(k)",
	"Distributed team" = "Distributed team",
	"Async" = "Async",
	"Health insurance" = "Health insurance",
	"Paid time off" = "Paid time off",
	"4-day workweek" = "4-day workweek",
	"Company retreats" = "Company retreats",
	"Coworking budget" = "Coworking budget",
	"Learning budget" = "Learning budget",
	"Free gym membership" = "Free gym membership",
	"Mental wellness budget" = "Mental wellness budget",
	"Home office budget" = "Home office budget",
	"Pay in crypto" = "Pay in crypto",
	"Pseudonymous" = "Pseudonymous",
	"Profit sharing" = "Profit sharing",
	"Equity compensation" = "Equity compensation",
	"No whiteboard interview" = "No whiteboard interview",
	"No monitoring system" = "No monitoring system",
	"No politics" = "No politics",
}
export type JobsRecord = {
	application_close_date?: IsoDateString
	application_method: JobsApplicationMethodOptions
	application_method_value: string
	benefits?: JobsBenefitsOptions[]
	category: JobsCategoryOptions
	company: RecordIdString
	description: string
	equity?: string
	expiration_date: IsoDateString
	keywords?: string
	location?: string
	remote_only?: boolean
	salary_currency?: string
	salary_max?: number
	salary_min?: number
	status: JobsStatusOptions
	tier: JobsTierOptions
	title: string
	type: JobsTypeOptions
	uri: string
}

export enum PaymentsMethodOptions {
	"card" = "card",
	"crypto" = "crypto",
}

export enum PaymentsResourceOptions {
	"job_listing" = "job_listing",
	"job_renovation" = "job_renovation",
	"company_promotion" = "company_promotion",
}
export type PaymentsRecord = {
	company: RecordIdString
	method: PaymentsMethodOptions
	resource: PaymentsResourceOptions
	resource_id: string
	third_party_payment_id: string
}

// Response types include system fields and match responses from the PocketBase API
export type CompaniesResponse<Texpand = unknown> = Required<CompaniesRecord> & AuthSystemFields<Texpand>
export type FundingsResponse<Texpand = unknown> = Required<FundingsRecord> & BaseSystemFields<Texpand>
export type JobsResponse<Texpand = unknown> = Required<JobsRecord> & BaseSystemFields<Texpand>
export type PaymentsResponse<Texpand = unknown> = Required<PaymentsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	companies: CompaniesRecord
	fundings: FundingsRecord
	jobs: JobsRecord
	payments: PaymentsRecord
}

export type CollectionResponses = {
	companies: CompaniesResponse
	fundings: FundingsResponse
	jobs: JobsResponse
	payments: PaymentsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'companies'): RecordService<CompaniesResponse>
	collection(idOrName: 'fundings'): RecordService<FundingsResponse>
	collection(idOrName: 'jobs'): RecordService<JobsResponse>
	collection(idOrName: 'payments'): RecordService<PaymentsResponse>
}
