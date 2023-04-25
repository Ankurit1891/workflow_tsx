import React, { useState } from "react";
import { getSmoothStepPath } from "reactflow";

import "../index.css";
import { AbSelect, AbSelectOption } from "@surya-soft/surya-ab-reactui";

const foreignObjectSize = 40;

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: any) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const widthStyle = {
    width: 400,
  };
  const [value, setValue] = useState<any>(false);
  const dropdownList = [
    { key: 1, text: "True" },
    { key: 2, text: "False" },
  ];
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
        height={foreignObjectSize * 2}
        x={labelX - foreignObjectSize}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div style={{ width: "80px" }}>
          <select
            id="ad"
            defaultValue={`${value}`}
            value={value}
            style={{ width: "110px", padding: "3px", fontSize: "10px" }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          >
            {dropdownList.map((data: any) => {
              return (
                <option
                  key={data.key}
                  value={data.text}
                  style={{
                    fontSize: "15px",
                    paddingTop:'5px',
                    backgroundColor:'#ffffff',
                    border: "2px solid black",
                    borderRadius: "0px",
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
