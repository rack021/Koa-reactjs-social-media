const compress = require("koa-compress");
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
var bearerToken = require("koa-bearer-token");
const appRoute = require("./router");
const Mongorito = require("mongorito");
const config = require("./config");
const userAgent = require("koa-useragent");
const serve = require("koa-static");
const errorHandler = require("./errorHandler");
const cors = require("koa-cors");
Mongorito.connect(config.db.URI);
//and initialize it with
const app = koa();
app.use(errorHandler);
app.use(cors());
app.use(serve("./public_html"));
app.use(userAgent());
app.use(bodyParser());
app.use(bearerToken());
app.use(
    compress({
        filter: function(content_type) {
            return /text/i.test(content_type);
        },
        threshold: 2048,
        flush: require("zlib").Z_SYNC_FLUSH
    })
);
app.use(appRoute.routes());

app.listen(config.express.port);
console.log("Koa listening on port " + config.express.port);
