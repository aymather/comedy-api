export interface LaughFactoryEvent {
	id: number;
	groupId: number;
	status: string;
	name: string;
	shortName: string;
	logoUrl: string | null;
	flyerUrl: string | null;
	keywords: string;
	startDate: number;
	endDate: number;
	sales: Sale[];
	eventCategoryName: string;
	url: string;
	shortUrl: string;
	mobileImageUrl: string | null;
	mobileBackgroundImageUrl: string | null;
	venue: Venue;
	ageRestriction: number;
	maxTicketsAllowed: number | null;
	maxTicketsAllowedMetadata: any | null;
	currencies: string[];
	followLabel: string | null;
	unfollowLabel: string | null;
	saleLabel: string;
	state: string;
	backgroundContrastPercentage: number;
	paymentProcessorType: string;
	defaultLocale: string;
	hiddenDetails: any | null;
	saleWindowStart: number;
	saleWindowEnd: number;
	formattedStartDate: string;
	formattedISOStartDate: string;
	formattedISOEndDate: string;
	formattedEndDate: string;
	timeZone: TimeZone;
}

export interface Sale {
	id: number;
	eventId: number;
	state: string;
	deliveryConfiguration: DeliveryConfiguration;
	maxTicketsAllowed: number | null;
	minTicketsAllowed: number | null;
	minBehavior: any | null;
	ticketMultiple: number;
	countdownMessage: string | null;
	optionalSaleRedirectUrl: string | null;
	moreInfoImageUrl: string | null;
	thumbUrl: string | null;
	gallery: any[];
	backgroundUrl: string | null;
	unitsPerItem: number;
	shortUnitLabel: string | null;
	category: string;
	ticketCategoryBehavior: string;
	type: string;
	status: string;
	startDate: number;
	endDate: number;
	ordinal: number;
	promoId: number;
	admissionCap: number | null;
	entryWindowStartDate: number | null;
	entryWindowEndDate: number | null;
	tiers: Tier[];
	entryDate: number | null;
	seatingType: string;
	zone: any | null;
	priceLabel: string | null;
	priceRegulationBreakout: any | null;
	resalePriceBreakout: any | null;
	formattedISOStartDate: string;
	deliveryType: string;
	additionalDeliveryType: string | null;
	tncs: string;
	tp: number;
	at: string;
	dsd: number;
	ded: number;
	fh: boolean;
	htp: boolean;
}

export interface DeliveryConfiguration {
	deliveryType: string;
	additionalDeliveryType: string | null;
	universalDeliveryConfig: UniversalDeliveryConfig;
}

export interface UniversalDeliveryConfig {
	deliveryAvailability: string;
	availabilityDate: number | null;
	electronicType: string;
	electronicTypes: string[];
}

export interface Tier {
	id: number;
	name: string;
	price: number;
	startDate: number;
	endDate: number;
	active: boolean;
	priceLevels: any[];
	minPrice: number;
	maxPrice: number;
}

export interface Venue {
	name: string;
	shortName: string;
	timezone: string;
	address: Address;
	venueType: string;
	seating_type: string;
}

export interface Address {
	city: string;
	state: string;
	countryCodeAlpha2: string;
}

export interface TimeZone {
	name: string;
	offset: number;
}

export interface LaughFactoryResponse {
	events: LaughFactoryEvent[];
}
