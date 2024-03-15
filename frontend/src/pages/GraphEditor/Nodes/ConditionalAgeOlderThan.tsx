import { DiamondSvg } from "assets/Diamond";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";

export type ConditionalAgeOlderThanData = {
  label: string;
  elseLabel?: string;
  width: number;
  height: number;
};

export function ConditionalAgeOlderThanNode({ data }: NodeProps<ConditionalAgeOlderThanData>) {
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
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "40px",
                  backgroundColor: "white",
                  border: "1px black solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black"
                }}
              >
                Yes
              </div>
              <div
                style={{
                  width: "40px",
                  backgroundColor: "white",
                  border: "1px black solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  color: "black"
                }}
              >
                No
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50px",
              zIndex: "20",
            }}
          >
            <div
              style={{
                width: "50px",
                zIndex: "20",
                marginBottom: "3px",
              }}
            >
              {" AGE >"}
            </div>
            <div
              style={{
                width: "50px",
                borderRadius: "5px",
                backgroundColor: "white",
                zIndex: "20",
              }}
            >
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid black",
                  width: "50px",
                  textAlign: "center",
                }}
              />
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
