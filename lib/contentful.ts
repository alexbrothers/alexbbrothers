import { createClient, ContentfulClientApi } from 'contentful';

let contentfulClient = undefined;

export function getContentfulClient(): ContentfulClientApi {
    if (contentfulClient == undefined) {
        contentfulClient = initializeContentful();
    }
    return contentfulClient;
}

function initializeContentful(): ContentfulClientApi {
    const environment: string = process.env.ENVIRONMENT || "development";
    const spaceId: string = process.env.CONTENTFUL_SPACE_ID;
    if (spaceId == null || spaceId == undefined) {
        throw new Error("Environment variable CONTENTFUL_SPACE_ID is required");
    }
    let accessToken: string;
    if (environment === "development") {
        accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
    }
    else {
        accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
    }
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
            host: environment === "development" ? "preview.contentful.com" : undefined,
        },
    );
}