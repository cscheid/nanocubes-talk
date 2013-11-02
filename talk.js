slide("nanocubes-1")
    .on(function() {
        d3.select("#nanocubes_iframe")
            .append("iframe")
            .attr("src", "http://nanocubes.net/view.html#twitter")
            .attr("width", "600")
            .attr("height", "400")
        ;
        console.log("on!");
        ;
    }).off(function() {
        d3.select("#nanocubes_iframe")
            .selectAll("iframe")
            .remove()
        ;
        console.log("off!");
    }).lookahead(0);
