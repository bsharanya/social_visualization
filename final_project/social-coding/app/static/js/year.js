/**
 * Created by tejalathippeswamy on 11/28/14.
 */
d3.json('/api/year/details', function (error, data) {
    var svgContainer = d3.select("#year-svg");

    var displayModal = function(element) {
        $("#dialog-modal").dialog(
            {
                title: " ",
                width: 400,
                minHeight: 100,
                position: {my: "left top", at: "left bottom", of: element}
            });
    };

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var root = data.repositories;
    var length = root.length;
    var inter_width = 600/length;
    var year = data.year;


    var text1 = svgContainer.append("text")
        .attr("x", 70)
        .attr("y", 70)
        .text(function () {
            return year;
        }) //need to get the year
        .attr("fill", "gray")
        .attr("font-size", "18")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var text2 = svgContainer.append("text")
        .attr("x", 10)
        .attr("y", 345)
        .text("Repository") //need to get the year
        .attr("fill", "gray")
        .attr("font-size", "12")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var text3 = svgContainer.append("text")
        .attr("x", 10)
        .attr("y", 380)
        .text("Followers") //need to get the year
        .attr("fill", "gray")
        .attr("font-size", "12")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var line1 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 80)
        .attr("x2", 670)
        .attr("y2", 80);

    var line2 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 330)
        .attr("x2", 670)
        .attr("y2", 330);

    var line3 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 70)
        .attr("y1", 355)
        .attr("x2", 670)
        .attr("y2", 355);


    for (var i = 0; i < data.repositories.length; i++) {
        var y1 = 85;
        var y2 = 78;

        var repo_act_name = data.repositories[i].repository_name;
        var repo_url_link = data.repositories[i].repository_url;
        var repo_name = data.repositories[i].name;
        var no_foll = data.repositories[i].followers;
        for (var j = 0; j < data.repositories[i].languages.length; j++) {
            var y2 = y1 + data.repositories[i].languages[j].lines;
            var lang = data.repositories[i].languages[j].name;
            var lang_color = data.repositories[i].languages[j].color;

            svgContainer.append("line")
                .attr("stroke-width", 5)
                .attr("stroke", function () {
                    if (lang_color) {
                        return lang_color;
                    }
                })
                .attr("class", function () {
                    return "language-" + i;
                })
                .attr("x1", function () {
                    console.log("x1");
                    console.log(90 + i * inter_width);
                    return 90 + i * inter_width;
                })
                .attr("y1", function () {
                    return y1;
                })
                .attr("x2", function () {
                    console.log("x2");
                    console.log(90 + i * inter_width);
                    return 90 + i * inter_width;
                })
                .attr("y2", function () {
                    return y1;
                })
                .transition()
                .duration(function () {
                    return (j + 1) * 500;
                })
                .delay(function () {
                    return (j + 1) * 100;
                })
                .attr("x2", function () {
                    return 90 + i * inter_width;
                })
                .attr("y2", function () {
                    return y2;
                });

            if (data.repositories[i].languages[j].lines <= 1)
                var y1 = y2 + 4;
            else
                var y1 = y2 + 5;
        }

        svgContainer.append("line")
            .style("stroke-dasharray", ("8, 3"))
            .attr("stroke-width", 1)
            .attr("stroke", "#9e9e9e")
            .attr("opacity", 0.9)
            .attr("x1", function () {
                return (90 + inter_width/2) + i * inter_width;
            })
            .attr("y1", 80)
            .attr("x2", function () {
                return (90 + inter_width/2) + i * inter_width;
            })
            .attr("y2", 330);

        svgContainer.append("line")
            .attr("stroke-width", 10)
            .attr("stroke", "#f93232")
            .attr("class", function () {
                return "language-" + i;
            })
            .attr("x1", function () {
                return 90 + i * inter_width;
            })
            .attr("y1", 357)
            .attr("x2", function () {
                return 90 + i * inter_width;
            })
            .attr("y2", 357)
            .transition()
            .duration(function () {
                return (j + 1) * 500;
            })
            .delay(function () {
                return (j + 1) * 100;
            })
            .attr("x2", function () {
                return 90 + i * inter_width;
            })
            .attr("y2", function () {
                return 357 + no_foll;
            });

        if ((90 + i * inter_width) > 650.0) {
            break;
        }
    }
    var nodes = svgContainer
        .selectAll(".repository-num")
        .data(data.repositories)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 86 + i * inter_width;
        })
        .attr("y", 347)
        .text(function (d) {
            if (length < 20)
                return "R" + d.name;
            else
                return "*";
        })
        .attr("fill", "gray")
        .attr("font-size", "13")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans")
        .attr("class", "repository-num")
        .on("click", function (d, i) {
            displayModal(this);
            d3.select("#repository_name")
                .text(d.repository_name);
            d3.select("#repository_url")
                .text(d.repository_url);
            d3.select("#repository_url")
                .attr("href", d.repository_url);
        })

});