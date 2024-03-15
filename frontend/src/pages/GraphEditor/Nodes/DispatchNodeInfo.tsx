
import { Handle, NodeProps, Position } from "reactflow";
import { NodeWrapper } from "./NodeWrapper";
import { useState } from "react";
import React from 'react'
import { dispatch } from 'use-bus'
import { useEffect } from "react";

interface DispatchNodeInfoProps {
  value: any;
}

export function DispatchNodeInfo ({ value }: DispatchNodeInfoProps) {

  useEffect(() => {
    {
      console.log(value)
    }
  }, value);

  return(
    <>

    </>
  )
}

