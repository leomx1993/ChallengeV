import React, { useContext, useEffect } from 'react';
import { DiamondSvg } from "assets/Diamond";
import { Drawer } from "components/Drawer";
import { editor } from "@src/pages/GraphEditor/Editor";
import { ReactNode, useState } from "react";
import { CommonDrawerProps } from "..";
import { graph } from "../../Graph";
import { UserAddableNodeName } from "../../Nodes";
import { ChooseNodeButton } from "./ChooseNodeButton";

type ChooseNodeDrawerProps = {
  sourceNodeId: string;
  targetNodeId: string;
  sourceEdgeLabel: ReactNode | null | undefined;
  id: string;
  nodeInfo: Record<string, any>;
  lastCondition: string;
} & CommonDrawerProps;

export const ChooseNodeDrawer = ({
  id: edgeToAddNodeAfter,
  sourceNodeId: sourceNodeID,
  targetNodeId: targetNodeId,
  sourceEdgeLabel: sourceEdgeLabel
}: ChooseNodeDrawerProps) => {
  const { drawerVisible, closeEditorDrawer } = useContext(editor);
  const { addNodeAfterEdge, edges } = useContext(graph);
  const [localStorageValue, setLocalStorageValue] = useState<string | null>(null);
  const [previousNodeInfo, setPreviousNodeInfo] = useState({});

  const updatePreviousNodeInfo = () => {
    const valueFromLocalStorage = localStorage.getItem("nodeCondition");
    const updatedNodeInfo = {
      ...previousNodeInfo,
      [sourceNodeID]: {
        previousNodeID: sourceNodeID,
        previouseEdgeLabel: sourceEdgeLabel,
        previoueNodeConditin: valueFromLocalStorage
      }
    };
    setPreviousNodeInfo(updatedNodeInfo);
  };

  useEffect(() => {
    const valueFromLocalStorage = localStorage.getItem("nodeCondition");
    setLocalStorageValue(valueFromLocalStorage);

    updatePreviousNodeInfo(); // Chamada da função para atualizar as informações anteriores de nó
  }, []);

  const onButtonClick = (nodeName: UserAddableNodeName) => {

    if (edgeToAddNodeAfter !== undefined) {
      const edge = edges.find((edge) => edge.id === edgeToAddNodeAfter)!;
      addNodeAfterEdge({
        nodeName,
        edge,
      });
    }
  };

  return (
    <Drawer
      title="Add a new block"
      content={
        <>
          <div className="grid grid-cols-2 gap-4">
            <ChooseNodeButton
              preview={
                <DiamondSvg className="h-12 w-20 stroke-4 stroke-Y-350 text-Y-300" />
              }
              label="Conditional"
              onClick={() => {
                onButtonClick("conditional");
              }}
            />
          </div>
        </>
      }
      onClose={closeEditorDrawer}
      visible={drawerVisible}
    />
  );
};
