/**
 * Created by madhushrees on 11/29/14.
 */
var data = d3.json("/api/language/details", function(error, data) {
    var svgContainer = d3.select("#language-svg");

    var displayModal = function(element) {
        $("#dialog-modal").dialog(
            {
                title: " ",
                width: 400,
                minHeight: 200,
                font : 5,
                position: {my: "left top", at: "left bottom", of: element}
            });
    };

    svgContainer.attr("width", '672px')
        .attr("height", '504px');

    var inter_width = 85

    var root = data.years;
    var keys = Object.keys(data.years)

    var language = data.language;
    var max_value=data.max;


    var languageText = svgContainer.append("text")
        .attr("x", 80)
        .attr("y", 50)
        .text(function(){
            return language;
        })
        .attr("fill", "gray")
        .attr("font-size", "18")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var legend1 = svgContainer.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .text(function(){
            return  "Percentage";
        })
        .attr("fill", "gray")
        .attr("font-size", "13")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");



    var line0 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 80)
        .attr("y1", 60)
        .attr("x2", 670)
        .attr("y2", 60);

    var line1 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 80)
        .attr("y1", 90)
        .attr("x2", 670)
        .attr("y2", 90);

    var time_legend = svgContainer.append("text")
        .attr("x", 25)
        .attr("y", 110)
        .text(function(){
            return "Time";
        })
        .attr("fill", "gray")
        .attr("font-size", "13")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");

    var line2 = svgContainer.append("line")
        .attr("stroke-width", 2)
        .attr("stroke", "gray")
        .attr("x1", 80)
        .attr("y1", 120)
        .attr("x2", 670)
        .attr("y2", 120);

    var repository_legend = svgContainer.append("text")
        .attr("x", 0)
        .attr("y", 140)
        .text(function(){
            return "Repository";
        })
        .attr("fill", "gray")
        .attr("font-size", "13")
        .attr("text-anchor", "left")
        .attr("font-family", "PT Sans");


    for (var i=1;i<8;i++) {
        for (var j = 0; j < data.years[keys[i - 1]].repos.length; j++) {

            // First rectangle
            if (data.years[keys[i - 1]].repos.length != 0) {
                if (max_value < 10) {
                    if (i % 2 === 0) {
                        var rectangle = svgContainer
                            .append("rect")
                            .style("fill", "#CCCCCC")
                            .attr("class", "2")
                            .attr("x", 91 + (i - 1) * 84)
                            .attr("y", 130 + (j) * 40)
                            .transition()
                            .duration(function () {
                                return (j) * 700;
                            })
                            .delay(function () {
                                return (j) * 200;
                            })
                            .attr("width", 70)
                            .attr("height", 30);
                    } else {
                        var rectangle = svgContainer
                            .append("rect")
                            .attr("class", "1")
                            .style("fill", "#A8A8A8")
                            .attr("x", 91 + (i - 1) * 84)
                            .attr("y", 130 + (j) * 40)
                            .transition()
                            .duration(function () {
                                return (j) * 700;
                            })
                            .delay(function () {
                                return (j) * 200;
                            })
                            .attr("width", 70)
                            .attr("height", 30);
                    }


                    //  // Text field for project name
                    //  var r1=data.years[keys[i - 1]].repos[j];
                    ////  console.log(r1);
                    //  svgContainer
                    //      .selectAll(".proj-num" + i)
                    //      .data(data.years[keys[i - 1]].repos)
                    //      .enter()
                    //      .append("text")
                    //
                    //      .attr("x", function () {
                    //          return 100 + (i - 1) * 84;
                    //      })
                    //      .attr("y", function(d, x) {
                    //          return 143 + (x) * 40;
                    //      })
                    //      .attr("dy", ".35em")
                    //      .text(function (d) {
                    //          if (r1.length != 0) {
                    //              return r1.name.substring(0, 7).concat("...");
                    //          } else {
                    //              return "";
                    //          }
                    //      })
                    //      .attr("fill", "#FFFFFF")
                    //      .attr("font-size", "15")
                    //      .attr("text-anchor", "left")
                    //      .attr("font-family", "PT Sans")
                    //      .attr("class", "proj-num" + i)
                    //      .on("click",function(d){
                    //          console.log(d);
                    //          displayModal(this);
                    //          if(d.length != 0) {
                    //              d3.select("#repoName")
                    //                  .text(d.name);
                    //              d3.select("#repo_url")
                    //                  .text(d.repo_url);
                    //              d3.select("#repo_url")
                    //                  .attr("href", d.repo_url)
                    //          }
                    //          })
                }

                else {
                    if(i%2==0) {
                        var rectangle = svgContainer.append("rect")
                            .style("fill", "#CCCCCC")
                            .attr("x", 91 + (i - 1) * 84)
                            .attr("y", 130 + (j) * 20)
                            .transition()
                            .duration(function () {
                                return (j) * 700;
                            })
                            .delay(function () {
                                return (j) * 200;
                            })
                            .attr("width", 70)
                            .attr("height", 200 / 18)
                    } else {
                        var rectangle = svgContainer.append("rect")
                            .style("fill", "#A8A8A8")
                            .attr("x", 91 + (i - 1) * 84)
                            .attr("y", 130 + (j) * 20)
                            .transition()
                            .duration(function () {
                                return (j) * 700;
                            })
                            .delay(function () {
                                return (j) * 200;
                            })
                            .attr("width", 70)
                            .attr("height", 200 / 18)
                    }
                //
                //    // Text field for project name
                //    var r2=data.years[keys[i - 1]].repos[j]
                //    svgContainer
                //        .data(data.years[keys[i - 1]].repos)
                //        .append("text")
                //
                //        .attr("x", function (d) {
                //            return 103 + (i - 1) * 84;
                //        })
                //        .attr("y", 135 + (j) * 20)
                //        .attr("dy", ".35em")
                //        .text(function () {
                //            if (r2.length != 0) {
                //                return r2.name.substring(0, 7).concat("...");
                //            } else {
                //                return "";
                //            }
                //        })
                //        .attr("fill", "#FFFFFF")
                //        .attr("font-size", "10")
                //        .attr("text-anchor", "left")
                //        .attr("font-family", "PT Sans")
                //        .on("click",function(d,i){
                //            displayModal(this);
                //            //console.log(d.repo_url);
                //            if(d.length != 0){
                //                d3.select("#repoName")
                //                    .text(d.name);
                //                d3.select("#repo_url")
                //                    .text(d.repo_url);
                //                d3.select("#repo_url")
                //                    .attr("href", d.repo_url)
                //
                //            }
                //
                //        });
                //
                //
                }
            }
            }


            //Dashed line
            svgContainer.append("line")
                .style("stroke-dasharray", ("8, 3"))
                .attr("stroke-width", 2)
                .attr("stroke", "gray")
                .attr("opacity", 0.5)
                .attr("x1", function () {
                    return 80 + (i) * inter_width;
                })
                .attr("y1", 60)
                .attr("x2", function () {
                    return 80 + (i) * inter_width;
                })
                //.attr("y2", 400);
                .attr("y2", 500);


            //Year sbg element
            svgContainer.append("text")
                .attr("x", function () {
                    return 103 + (i - 1) * inter_width;
                })
                .attr("y", 110)
                .text(function () {
                    return keys[i - 1];
                })
                .attr("fill", "gray")
                .attr("font-size", "15")
                .attr("text-anchor", "left")
                .attr("font-family", "PT Sans");


            //Total bar for repositories
            svgContainer

                //.append("g")
                //.selectAll("number1-repos")
                //.data(data.years[keys[i-1]].repos)
                //.enter()
                .append("line")
                .attr("stroke-width", 10)
                .attr("stroke", "#E0E0E0")
                .attr("y1", function () {
                    return 75;
                })
                .attr("x1", function () {
                    return 87 + (i - 1) * inter_width;
                })
                .attr("y2", function () {
                    return 75;
                })
                .attr("x2", function () {
                    return 153 + (i - 1) * inter_width;
                })
                .on("mouseover", function (d, i) {
                    //console.log(d.length);
                    var hov = d3.select("#tooltip")
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                    hov
                        .select("#number-repos")
                        .text("25/85");
                    d3.select("#tooltip").attr("class", "visible");
                })
                .on("mouseout", function (d) {
                    d3.select("#tooltip").attr("class", "hidden");
                });


            // No of repositories

            svgContainer.append("line")
                .attr("stroke-width", 10)
                .attr("stroke", "#3d67ea")
                .attr("y1", function () {
                    return 75;
                })
                //.attr("x1", 363)
                .attr("x1", function () {
                    return 87 + (i - 1) * inter_width;
                })
                .attr("y2", function () {
                    return 75;
                })
                //.attr("x1", 363)
                .attr("x2", function () {
                    return 87 + (i - 1) * inter_width;
                })
                .transition()
                .duration(function () {
                    return (i) * 300;
                })
                .delay(function () {
                    return (i) * 100;
                })
                .attr("y2", function () {
                    return 75;
                })
                .attr("x2", function () {
                    if (data.years[keys[i - 1]].repos.length != 0) {
                        return 87 + data.years[keys[i - 1]].ratio + (i - 1) * inter_width;
                    } else {
                        return 87 + (i - 1) * inter_width;
                    }
                });

    }



    for (var i=1;i<8;i++) {
        for (var j = 0; j < data.years[keys[i - 1]].repos.length; j++) {
            // Text field for project name
            if (max_value < 10) {
                var r1 = data.years[keys[i - 1]].repos[j];
                //  console.log(r1);
                svgContainer
                    .selectAll(".proj-num" + i)
                    .data(data.years[keys[i - 1]].repos)
                    .enter()
                    .append("text")

                    .attr("x", function () {
                        return 100 + (i - 1) * 84;
                    })
                    .attr("y", function (d, x) {
                        return 143 + (x) * 40;
                    })
                    .attr("dy", ".35em")
                    .text(function (d) {
                        if (d.length != 0) {
                            return d.name.substring(0, 7).concat("...");
                        } else {
                            return "";
                        }
                    })
                    .attr("fill", "#FFFFFF")
                    .attr("font-size", "15")
                    .attr("text-anchor", "left")
                    .attr("font-family", "PT Sans")
                    .attr("class", "proj-num" + i)
                    .on("click", function (d) {
                        console.log(d);
                        displayModal(this);
                        if (d.length != 0) {
                            d3.select("#repoName")
                                .text(d.name);
                            d3.select("#repo_url")
                                .text(d.repo_url);
                            d3.select("#repo_url")
                                .attr("href", d.repo_url)
                        }
                    })
            } else{
                    // Text field for project name
                   // var r2=data.years[keys[i - 1]].repos[j]
                    svgContainer
                        .selectAll(".proj-num1" + i)
                        .data(data.years[keys[i - 1]].repos)
                        .enter()
                        .append("text")

                        .attr("x", function (d) {
                            return 103 + (i - 1) * 84;
                        })
                        .attr("y", function (d, x) {
                            return 135 + (x) * 20;
                        })
                        .attr("dy", ".35em")

                        .text(function (d) {
                            if (d.length != 0) {
                                return d.name.substring(0, 7).concat("...");
                            } else {
                                return "";
                            }
                        })
                        .attr("fill", "#FFFFFF")
                        .attr("font-size", "10")
                        .attr("text-anchor", "left")
                        .attr("font-family", "PT Sans")
                        .attr("class", "proj-num1" + i)
                        .on("click",function(d){
                            displayModal(this);
                            //console.log(d.repo_url);
                            if(d.length != 0){
                                d3.select("#repoName")
                                    .text(d.name);
                                d3.select("#repo_url")
                                    .text(d.repo_url);
                                d3.select("#repo_url")
                                    .attr("href", d.repo_url)

                            }

                        });
            }
            }
        }


})