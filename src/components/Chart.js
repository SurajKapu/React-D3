import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { transition } from "d3";

function Chart() {
  const margin = 60;
  const width = 500 - 2 * margin;
  const height = 500 - 2 * margin;
  const initialData = [
    { name: "A", value: Math.ceil(Math.random() * 100) },
    { name: "B", value: Math.ceil(Math.random() * 100) },
    { name: "C", value: Math.ceil(Math.random() * 100) },
    { name: "D", value: Math.ceil(Math.random() * 100) },
    { name: "E", value: Math.ceil(Math.random() * 100) },
    { name: "F", value: Math.ceil(Math.random() * 100) },
  ];
  const [data, setData] = useState(initialData);
  const svgRef = useRef();

  const randomData = (e) => {
    e.preventDefault();
    const randomData = data.map((obj) => ({
      name: obj.name,
      value: Math.ceil(Math.random() * 100),
    }));
    setData(randomData);
  };

  useEffect(() => {
    //setting svg container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("margin", margin)
      .style("overflow", "visible");

    //setting the Scaling
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((d) => d.value))])
      .range([height, 0])
      .nice(2);

    //setting the axis
    svg.append("g").call(d3.axisLeft(yScale));
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    //setting the svg data
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("fill", "orange")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value))
      .attr("width", xScale.bandwidth());

    //updating the data
    svg
      .selectAll("rect")
      .data(data)
      .transition(1000)
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => height - yScale(d.value));
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button className="btn--randomData" onClick={randomData}>
        Random data
      </button>
    </div>
  );
}

export default Chart;
