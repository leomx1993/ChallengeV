import React, { useState, useEffect } from "react";
import { DiamondSvg } from "assets/Diamond";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export type ConditionalNodeData = {
  condition: string;
  label: string;
  elseLabel?: string;
  width: number;
  height: number;
};

export function ConditionalNode({ data, id }: NodeProps<ConditionalNodeData>) {
  const [conditionalType, setConditionalType] = useState("Condition");
  const [nodeCondition, setNodeCondition] = useState("");
  

  function selectConditionalType(value: string) {
    setConditionalType(value);
  }

  useEffect(() => {
    // Atualiza o armazenamento local sempre que nodeCondition mudar
    localStorage.setItem("nodeCondition", nodeCondition);
  }, [nodeCondition]);

  return (
    <NodeWrapper>
      <div
        className="w-full h-full group"
        style={{
          width: data.width,
          height: data.height,
        }}
      >
        <div className="p-9 flex items-center justify-center text-[12px] text-center w-full h-full relative">
          <div
            className={`group-hover-focus:cursor-pointer absolute left-0 top-0 w-full h-full text-Y-300 [&>svg]:stroke-Y-600 group-hover:text-Y-350 z-0`}
          >
            <DiamondSvg style={{}} strokeWidth={4} />
            <div
              style={{
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  width: "40px",
                  backgroundColor: "white",
                  border: "1px black solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black",
                  marginRight: "55px",
                }}
              >
                Yes
              </div>
              <div
                style={{
                  fontSize: "10px",
                  width: "40px",
                  backgroundColor: "white",
                  border: "1px black solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black",
                  marginLeft: "55px",
                }}
              >
                No
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50px",
              zIndex: "20",
            }}
          >
            <div>
              <div
                style={{
                  width: "50px",
                  zIndex: "25",
                  marginBottom: "3px",
                  marginTop: "55px",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                {conditionalType}
              </div>
            </div>
            <div
              style={{
                width: "50px",
                marginTop: "5px",
                borderRadius: "5px",
                backgroundColor: "white",
                zIndex: "20",
              }}
            >
              <input
                disabled={conditionalType === "Condition"}
                onChange={(e) =>
                  setNodeCondition(`condition: ${conditionalType} ${e.target.value}`)
                }
                style={{
                  borderRadius: "5px",
                  border: "1px solid black",
                  width: "50px",
                  textAlign: "center",
                }}
              />
            </div>
            <div
              style={{
                marginTop: "25px",
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                zIndex: "30",
                textAlign: "center",
              }}
            >
              <select
                id="dropdown"
                style={{
                  marginTop: "5px",
                  backgroundColor: "#f1d4b3",
                  width: "130px",
                  height: "25px",
                  borderRadius: "5px",
                  borderColor: "#b36b00",
                  textAlign: "center",
                  border: "2px solid #b36b00",
                  fontSize: "12px",
                }}
                onChange={(event) => selectConditionalType(event.target.value)}
              >
                <option value="" disabled selected hidden>
                  Select Condition
                </option>
                <option value="Age >">{"Age >"}</option>
                <option value="Age <">{"Age <"}</option>
                <option value="Age <">{"Age >="}</option>
                <option value="Age <">{"Age <="}</option>
                <option value="Income >">{"Income >"}</option>
                <option value="income <">{"Income <"}</option>
                <option value="Income >=">{"Income >="}</option>
                <option value="Income <=">{"Income <="}</option>
              </select>
            </div>
          </div>
          <Handle
            type="target"
            id="target"
            className="invisible"
            position={Position.Top}
            isConnectable={false}
          />
          <p className={`cursor-pointer line-clamp-3 z-10`}>{data.label}</p>
          <Handle
            type="source"
            id="source"
            className="invisible"
            position={Position.Bottom}
            isConnectable={false}
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
