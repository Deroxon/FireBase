export interface Update {
    id: string,
    title: string,
    date: string,
    shortDescription: string,
    Description: string,
    mainImage: {
        url: string,
        title: string,
        alt: string
    },
    tags: string,
    images: any
}
