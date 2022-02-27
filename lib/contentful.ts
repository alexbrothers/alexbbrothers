import { createClient, ContentfulClientApi } from 'contentful';

let contentfulClient = undefined;

export function getContentfulClient(): ContentfulClientApi {
    if (contentfulClient == undefined) {
        contentfulClient = initializeContentful();
    }
    return contentfulClient;
}

function initializeContentful(): ContentfulClientApi {
    const spaceId: string = process.env.CONTENTFUL_SPACE_ID;
    if (spaceId == null || spaceId == undefined) {
        throw new Error("Environment variable CONTENTFUL_SPACE_ID is required");
    }
    const accessToken: string = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
    if (accessToken == null || accessToken == undefined) {
        throw new Error("Environment variable CONTENTFUL_DELIVERY_ACCESS_TOKEN is required");
    }
    const environmentId: string = process.env.CONTENTFUL_ENVIRONMENT_ID;
    if (environmentId == null || environmentId == undefined) {
        throw new Error("Environment variable CONTENTFUL_ENVIRONMENT_ID is required");
    }
    return createClient(
        {
            accessToken: accessToken,
            space: spaceId,
        },
    );
}