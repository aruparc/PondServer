"use strict";
// ROUTES ======
Object.defineProperty(exports, "__esModule", { value: true });
var pondRoutes = require('./pond_routes');
// PATH BINDINGS ======
function initRoutes(app) {
    console.log("initRoutes");
    // PATH BINDINGS ======
    app.use('/api/v1/pond', pondRoutes);
}
exports.initRoutes = initRoutes;
