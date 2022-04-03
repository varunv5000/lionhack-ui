import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";

export default function PieChartFull({ data, title, tokenArr, timeElapsed }) {
  const lineWidth = 60;
  const [selected, setSelected] = useState(-1);
  const [hovered, setHovered] = useState(null);

  return (
    <div data-tip="" data-for="chart">
      <h3>{title}</h3>
      <PieChart
        style={{
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: "8px",
          height: "200px",
        }}
        data={data}
        radius={PieChart.defaultProps.radius - 6}
        lineWidth={60}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        segmentsShift={(index) => (index === selected ? 6 : 1)}
        animate
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: "#fff",
          opacity: 0.75,
          pointerEvents: "none",
        }}
        onClick={(_, index) => {
          setSelected(index === selected ? undefined : index);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === "number" ? (
            <div>
              <p> {data[hovered].title} </p>{" "}
              <p> {"Tokens: " + tokenArr[hovered]} </p>{" "}
              {timeElapsed ? <p>{"Time Elapsed: " + data[hovered].value/tokenArr[hovered] }</p> : ""}{" "}
            </div>
          ) : null
        }
      />
    </div>
  );
}
