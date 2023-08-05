const { app, ExecuteQuery } = require("../config");

const read =[

];

app.get("/lv-name", (req, res) => {
    const query = ` 
    select 
       DISTINCT LV_name as value
    from 
        pre_defined_ship
    ORDER BY 
        LV_name ASC
    `;

    ExecuteQuery(res, query);
});
