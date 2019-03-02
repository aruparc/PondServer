// ROUTES ======

const pondRoutes = require('./pond_routes');

// PATH BINDINGS ======
export function initRoutes(app: any) {
    console.log("initRoutes");

    // PATH BINDINGS ======
   app.use('/api/v1/pond', pondRoutes);

}
