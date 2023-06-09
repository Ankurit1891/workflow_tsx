import React, { useEffect, useState } from "react";
import { getSmoothStepPath } from "reactflow";

import "../index.css";

const foreignObjectSize = 40;

export default function ButtonEdge(
  {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
  }: any,
) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [value, setValue] = useState<any>(data.value ?? "True");
  const dropdownList = [
    { key: 1, value: true, text: "True" },
    { key: 2, value: false, text: "False" },
  ];
  const onValueChange = (e: any) => {
    const val = e.target.value.toString();
    setValue(val);
    data.value = val;
    data.onDropdownChange(val, id);
  };
  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize * 3}
        height={foreignObjectSize * 3}
        x={labelX - foreignObjectSize}
        y={labelY - foreignObjectSize / 1.6}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
        style={{
          marginTop: "0px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "50px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            fontSize: "15px",
          }}
        >
          <select
            id="ad"
            defaultChecked={value}
            value={value}
            style={{
              width: "60px",
              padding: "3px",
              fontSize: "10px",
              backgroundColor: "transparent",
              borderRadius: "5px",
              borderColor: "1px solid black",
              backdropFilter: "blur(3px)",
              color: "black",
            }}
            onChange={onValueChange}
          >
            {dropdownList.map((data: any) => {
              return (
                <option
                  key={data.key}
                  value={data.text}
                  style={{
                    height: "30px",
                    fontSize: "15px",
                    padding: "2px",
                    backgroundColor: "transparent",
                    borderRadius: "5px",
                    borderColor: "1px solid black",
                    backdropFilter: "blur(2px)",
                    color: "black",
                  }}
                >
                  {data.text}
                </option>
              );
            })}
          </select>
        </div>
      </foreignObject>
    </>
  );
}
