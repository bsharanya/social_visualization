d3.json('api/overview', function(error, data) {
    var svg = d3.select("#main-svg");

    svg.attr("width", '672px')
        .attr("height", '504px');

    var years = data.years;
    var languages = data.languages;
    var details = data.details;

    var widthForEach = (595/years.length);
    var heightForEach = (450/languages.length);

    svg.append('path')
        .attr('d', "M77, 30 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "#9e9e9e")
        .attr("stroke-width", "2px");

    svg.append('path')
        .attr('d', "M77, 480 H 672")
        .attr("fill", "transparent")
        .attr("stroke", "#9e9e9e")
        .attr("stroke-width", "2px");

    for (var i = 0; i < years.length; i++) {
        svg.append('path')
            .attr('d', function () {
                return "M" + (162 + ((i) * widthForEach)) + ", 30 V 480";
            })
            .attr("class", "vertical-splits")
            .attr("fill", "transparent")
            .attr("stroke", "#9e9e9e")
            .attr("stroke-width", function () {
                if (i == 6) {
                    return "0px";
                } else {
                    return "2px";
                }
            })
            .attr("stroke-dasharray", "8, 4")
            .attr("opacity", "0.8");
    }


    for(var i = 0; i < languages.length; i++) {
        svg.append('path')
            .attr('d', function(){
                return "M77, " + (30 + ((i) * heightForEach)) + " H 672";
            })
            .attr("class", "horizontal-splits")
            .attr("fill", "transparent")
            .attr("stroke", "#9e9e9e")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", "6, 3")
            .attr("opacity", "0.8");
    }

    var year_nodes = svg.append("g")
                   .selectAll(".year-group")
                   .data(years)
                   .enter()
                   .append("g")
                   .attr("class", "year-group")
                   .attr("transform", function (d, i) {
                        var xCoordinate = (77 + ((i)*widthForEach));
                        var yCoordinate = 25;
                        return "translate(" + xCoordinate + "," + yCoordinate + ")";
                    }).on("click", function (d) {
                        $.post("api/year", {"year": d}).done(function() {
                            $(location).attr('href', '/year')
                        });
                    });

    year_nodes.append('text')
        .attr("font-size", "15px")
        .attr("id", function(d) {
            return "text-" + d;
        })
        .attr("font-weight", "bold")
        .attr("font-family", "PT Sans")
        .attr("fill", "#000000")
        .attr("text-align", "center")
        .text(function(d) {
            return d;
        }).on("click", function (d) {
            $.post("api/year", {"year": d}).done(function() {
                $(location).attr('href', '/year')
            });
        }).on("mouseover", function() {
            d3.select(this).attr("font-size", "25px").attr("fill", "#3d67ea")
        }).on("mouseout", function() {
            d3.select(this).attr("font-size", "15px").attr("fill", "#000000")
        });

    var languages_nodes = svg.append("g")
        .selectAll(".languages-group")
        .data(languages)
        .enter()
        .append("g")
        .attr("class", "languages-group")
        .attr("transform", function (d, i) {
            var xCoordinate = 0;
            var yCoordinate = (40 + ((i)*heightForEach));
            return "translate(" + xCoordinate + "," + yCoordinate + ")";
        }).on("click", function (d) {
            $.post("api/language", {"language": d}).done(function() {
                $(location).attr('href', '/language')
            });
        });

    languages_nodes.append('text')
        .attr("id", function(d) {
            var l = d.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '-');
            return "text-" + l.toLowerCase();
        })
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("font-family", "PT Sans")
        .attr("fill", "#000000")
        .attr("width", "77px")
        .attr("text-anchor", "start")
        .text(function(d) {
            return d;
        }).on("click", function (d) {
            $.post("api/language", {"language": d}).done(function() {
                $(location).attr('href', '/language')
            });
        }).on("mouseover", function() {
            d3.select(this).attr("font-size", "20px").attr("fill", "#3d67ea")
        }).on("mouseout", function() {
            d3.select(this).attr("font-size", "10px").attr("fill", "#000000")
        });


    var allYears = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];
    for(var j = 0; j < allYears.length; j++) {
        var thisYear = details[allYears[j]];
        console.log(thisYear);
        var svgPosition = $("#main-svg").position();
        var xPosition = $("#text-" + allYears[j]).position().left - svgPosition.left;

        var rects_languages = svg.append("g")
            .selectAll(".languages-group-" + j)
            .data(thisYear)
            .enter()
            .append("g")
            .attr("class", "languages-group-" + j)
            .attr("transform", function (language, i) {
                var languageClass = language["language"];
                languageClass = languageClass.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '-').toLowerCase();
                var yPosition = $("#text-" + languageClass).position().top - svgPosition.top + 5;
                return "translate(" + xPosition + "," + yPosition + ")";
            }).on("mouseover", function(language) {
                var hov=d3.select("#tooltip")
                    .style("left", (d3.event.pageX + 10) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                hov
                    .select("#repo-length")
                    .text(language["length"]);

                d3.select("#tooltip").attr("class", "visible");
            }).on("mouseout", function (d){
                d3.select("#tooltip").attr("class", "hidden");
            });;

        rects_languages.append('rect')
            .attr("class", "language-rects-" + j)
            .attr('x', 0)
            .attr('y', 0)
            .attr("fill", "#3d67ea")
            .attr("width", "0px")
            .attr("height", "4px")
            .transition()
            .duration(function () {
                return (j + 1) * 500;
            })
            .delay(function () {
                return (j) * 1000;
            })
            .attr("width", function(d) {
                return d["length"];
            })
            .ease("linear");
    }
});