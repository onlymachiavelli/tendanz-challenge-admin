"use client"

import * as React from "react"

import { NextUIProvider } from "@nextui-org/react"

function Nextui({ ...props }) {
  return <NextUIProvider>{props.children}</NextUIProvider>
}

export default Nextui
