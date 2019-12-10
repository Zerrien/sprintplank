const sprintplank = require('sprintplank');

const sp = sprintplank.server({
    // Config stuff here;
}).listen(8080, 8081);

sp.addElement({
    type: "heartbeat",
});

sp.addElement({
    type: "list",
    properties: {
        title: "astronauts in space",
    },
    url: 'api.of.astronauts.in.space',
    gatherCallback: function(result) {
        return result.people;
    },
});
