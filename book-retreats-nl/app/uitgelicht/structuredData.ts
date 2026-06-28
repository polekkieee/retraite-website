import type { Retreat, pageData } from './ClientHome';

export function generateStructuredData(pageData: pageData, featuredRetreats: Retreat[]): string {
    const webPage = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageData.pageTitle || 'Uitgelichte Creatieve Retraites',
        description:
            pageData.metaDescription ||
            'Door onze redactie geselecteerde creatieve retraites in Nederland en Europa.',
        url: 'https://www.creatieveretraites.nl/uitgelicht',
        inLanguage: 'nl',
        isPartOf: {
            '@type': 'WebSite',
            name: 'CreatieveRetraites.nl',
            url: 'https://www.creatieveretraites.nl',
        },
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['[data-speakable="intro"]', '[data-speakable="outro"]'],
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://www.creatieveretraites.nl',
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Uitgelicht',
                    item: 'https://www.creatieveretraites.nl/uitgelicht',
                },
            ],
        },
    };

    const itemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Uitgelichte creatieve retraites',
        description: 'Een redactionele selectie van de mooiste creatieve retraites in Nederland en Europa.',
        url: 'https://www.creatieveretraites.nl/uitgelicht',
        numberOfItems: featuredRetreats.length,
        itemListElement: featuredRetreats.map((retreat, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'LodgingBusiness',
                name: retreat.title,
                description: retreat.desc,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: retreat.location,
                },
                image: retreat.image,
                url: retreat.affiliateLink,
                priceRange: `Vanaf €${retreat.price}`,
                ...(retreat.rating && {
                    aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: retreat.rating,
                        bestRating: 5,
                    },
                }),
            },
        })),
    };

    return JSON.stringify([webPage, itemList]);
}