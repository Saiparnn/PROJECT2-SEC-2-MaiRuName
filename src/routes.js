import Home from "@/components/Home.vue";
import MovieDetails from "@/components/MovieDetails.vue";

let router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/movie/:id",
            name: "movieDetails",
            component: MovieDetails
        }
    ]
})

export { router }