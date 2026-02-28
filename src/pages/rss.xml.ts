import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const posts = await getCollection('posts');
	return rss({
		title: 'Angela博客',
		description: 'Angela的个人博客，记录学习、生活和思考',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/posts/${post.slug}/`,
		})),
		customData: `<language>zh-CN</language>`,
	});
}
