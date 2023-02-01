export const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: "default",
		component: () => import("@ui/views/default/index.vue"),
	},
    {
		path: "/",
		name: "home",
		component: () => import("@ui/views/home/index.vue"),
	},
	{
		path: "/videos",
		name: "videos",
		component: () => import("@ui/views/videos/index.vue"),
	},
]