/**
 * Created by tejalathippeswamy on 11/29/14.
 */

d3.json('/api/color/details', function (error, data) {
    var svgContainer = d3.select("#color-svg");

    svgContainer.attr("width", '288px')
        .attr("height", '250px');

    var lang_color = data.colors
    var length = data.colors.length;
    console.log(length);
    var inter_width = 250/length;
    var year = data.year;


    for (var i = 0; i < length; i++) {
        svgContainer.append('rect')
            .attr('x', function () {
                return 9 + i * inter_width;
            })
            .attr('y', 35)
            .attr("fill", function () {
                return lang_color[i].color;
            })
            .attr("width", "5")
            .attr("height", "30");

        svgContainer.append("text")
            .attr("x", function () {
                return 10 + i * inter_width;
            })
            .attr("y", 70)
            .text(function () {
                return lang_color[i].lang;
            })
            .attr("fill", "gray")
            .attr("font-size", "10")
            .attr("text-anchor", "left")
            .attr("style", "writing-mode: tb")
            .attr("font-family", "PT Sans");
    }
});