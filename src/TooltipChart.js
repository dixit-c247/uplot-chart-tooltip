import React, { useEffect, useRef } from "react";
import "./uPlot.min.css";
import { placement } from "./placement.min";
import uPlot from "uplot";

function TooltipChart() {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const overlayRef = useRef(null);
  const overlayRef2 = useRef(null);

  useEffect(() => {
    const data = [
      [1, 2, 3, 4, 5, 6, 7],
      [40, 43, 60, 65, 71, 73, 80],
    ];

    const tooltipPlugin = (ref) => {
      let over, bound, bLeft, bTop;

      function syncBounds() {
        let bbox = over.getBoundingClientRect();
        console.log("bbox.left", bbox.left)
        console.log("bbox.top", bbox.top)
        bLeft = bbox.left;
        bTop = bbox.top;
      }

      console.log("hhere")

      return {
        hooks: {
          init: (u) => {
            over = u.over;
            bound = over;

            over.onmouseenter = () => {
              ref.current.style.display = "block";
            };

            over.onmouseleave = () => {
              ref.current.style.display = "none";
            };
          },
          setSize: (u) => {
            syncBounds();
          },
          setCursor: (u) => {
            const { left, top, idx } = u.cursor;
            const x = u.data[0][idx];
            const y = u.data[1][idx];
            console.log("u", x, y)
            const anchor = { left: left + bLeft, top: top + bTop };
            ref.current.textContent = `${x},${y} at ${Math.round(
              left
            )},${Math.round(top)}`;
            placement(ref.current, anchor, "right", "start", { bound });
          },
        },
      };
    };

    const opts = {
      id: "upllot-chart-tooltip",
      title: "placement.js tooltip",
      width: 600,
      height: 400,
      cursor: {
        sync: {
          key: "sync",
        },
      },
      scales: {
        x: {
          time: false,
        },
      },
      plugins: [tooltipPlugin(overlayRef)],
      series: [
        {},
        {
          label: "blah",
          width: 1,
          stroke: "green",
        },
      ],
    };
    const opts2 = {
      id: "upllot-chart-tooltip",
      title: "placement.js tooltip",
      width: 600,
      height: 400,
      cursor: {
        sync: {
          key: "sync",
        },
      },
      scales: {
        x: {
          time: false,
        },
      },
      plugins: [tooltipPlugin(overlayRef2)],
      series: [
        {},
        {
          label: "blah",
          width: 1,
          stroke: "green",
        },
      ],
    };
    // Simulate loading external scripts

    const u = new uPlot(opts, data, chartRef.current);
    const u2 = new uPlot(opts2, data, chartRef2.current);

    return () => {
      // Clean up the chart when the component is unmounted
      u.destroy();
      u2.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={chartRef}></div>
      <div ref={chartRef2}></div>
      <div
        id="overlay"
        ref={overlayRef}
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "0.5rem",
          margin: "0.75rem",
          color: "#fff",
          zIndex: 10,
          pointerEvents: "none",
        }}
      ></div>
      <div
        id="overlay"
        ref={overlayRef2}
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "0.5rem",
          margin: "0.75rem",
          color: "#fff",
          zIndex: 10,
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
}

export default TooltipChart;


