import { Application } from "express";
import homeRoutes from "./home.routes";
import bookRoutes from "./book.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/api", homeRoutes);
        app.use("/api/books", bookRoutes)
    }
}
