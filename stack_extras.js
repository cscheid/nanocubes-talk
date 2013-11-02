slide_numbers = {};
d3.selectAll("section").each(function(d, i) {
    var id = d3.select(this).attr("id");
    if (id) {
        slide_numbers[id] = i;
    }
});

slide_map = {};
function slide(id)
{
    if (slide_map[id])
        return slide_map[id];
    var index = slide_numbers[id];
    var active = false;
    var on, off, lookahead;

    var result = {
        on: function(fn) {
            if (_.isUndefined(fn))
                return on;
            on = fn;
            return result;
        },
        off: function(fn) {
            if (_.isUndefined(fn))
                return off;
            off = fn;
            return result;
        },
        lookahead: function(dist) {
            if (_.isUndefined(dist))
                return lookahead;
            lookahead = dist;
            return result;
        },
        update: function(current) {
            var dist = Math.abs(index - current);
            if (dist <= lookahead && !active) {
                result.on()();
                active = true;
            } else if (dist > lookahead && active) {
                result.off()();
                active = false;
            }
        }
    };
    slide_map[id] = result;
    return result;
}

function slide_active(which) {
    _.each(slide_map, function(v) {
        v.update(which);
    });
    var calls = slide_map[which];
    if (_.isUndefined(calls))
        return;
    _.each(calls.on || [], function(call) { call(); });
}

function slide_inactive(which) {
    var calls = slide_map[which];
    if (_.isUndefined(calls))
        return;
    _.each(calls.on || [], function(call) { call(); });
}

stack.on("activate", slide_active);
stack.on("deactivate", slide_inactive);

function slide_start() {
    var v = Number(window.location.hash.substr(1));
    slide_active(v);
}
