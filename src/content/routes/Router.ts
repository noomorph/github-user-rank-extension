export interface IRouterConfiguration {
    get_location: () => string;

    routes: {
        user_profile: () => void;
        repo_contributors: () => void;
        not_found: (location: string) => void;
    };
}

export class Router {
    constructor(private config: IRouterConfiguration) {
        this.listen = this.listen.bind(this);
    }

    listen(): void {
        const location = this.config.get_location();
        const routes = this.config.routes;

        switch (location) {
            case '/<user-name>': return routes.user_profile();
            case '/<user-name>/<repo-name>/graphs/contributors': return routes.repo_contributors();
            default: return routes.not_found(location);
        }
    }
}
