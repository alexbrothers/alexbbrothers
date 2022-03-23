import { GetServerSideProps } from 'next';
import { getContentfulClient } from "../lib/contentful";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "https://www.alexbrothers.dev";

interface SiteMapBlogInfo {
    url: string,
    lastModified: string,
}

function generateSiteMap(blogs: SiteMapBlogInfo[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}/</loc>
        </url>
        <url>
            <loc>${baseUrl}/about</loc>
        </url>
        <url>
            <loc>${baseUrl}/blog</loc>
        </url>
        <url>
            <loc>${baseUrl}/contact</loc>
        </url>
        ${blogs
            .map(blog => {
                return `
                    <url>
                        <loc>${`${baseUrl}/blogs/${blog.url}`}</loc>
                        <lastmod>${new Date(blog.lastModified).toLocaleDateString()}</lastmod>
                    </url>
                `
            })
            .join('')}
        </urlset>
    `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = getContentfulClient();
    let siteMapBlogInfo: SiteMapBlogInfo[];
    try {
        const blogResponse = await client.getEntries({
            content_type: "blogPost",
        });
        const blogs = blogResponse.items as any;
        siteMapBlogInfo = blogs.map(blog => ({
            url: blog.fields.url,
            lastModified: blog.sys.updatedAt
        }));
    } catch(e: any) {
        console.log(`error retrieving blogs ids from contentful: ${e.message}`);
        throw e;
    }

    const siteMap: string = generateSiteMap(siteMapBlogInfo);
    context.res.setHeader('Content-Type', 'text/xml');
    context.res.write(siteMap);
    context.res.end();

    return {
        props: {}
    }
}

export default SiteMap