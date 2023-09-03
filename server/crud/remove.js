const { app, ExecuteQuery } = require("../config");

const { remove: JobEntry } = require("../api/job_entry");

const { remove: HeroSlider} = require("../api/heroslider");

const REMOVE_DATA = [...JobEntry, ...HeroSlider];

REMOVE_DATA.forEach(({ uri, query, param, msg }) => {
    app.delete(uri, (req, res) => {
        let paramArr = [];
        param?.forEach((val) => {
            paramArr.push(req?.params[val]);
        });

        ExecuteQuery(
            res,
            query,
            [...paramArr],
            "delete",
            `${req?.params[msg]} deleted successfully`
        );
    });
});
