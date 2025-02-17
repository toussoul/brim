import React from "react"
import {cssVar, transparentize} from "polished"
import styled, {keyframes} from "styled-components"

const bgColor = transparentize(0.3, cssVar("--primary-color") as string)
const reveal = keyframes`
    from {
        clip-path: circle(10%);
    }
    to {
        clip-path: circle(100%);
    }
`

const DropBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0;
  background: ${bgColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  animation: fadein 0.3s ease-in-out, ${reveal} ease-in-out 1s;
  box-shadow: inset 0 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  ${(p) => p.theme.typography.headingSection}
`

const DropMessage = styled.p`
  animation: updown 1200ms ease-in-out infinite alternate;
`

export const DropOverlay = (props: {
  children: React.ReactNode
  show: boolean
}) => {
  if (props.show) {
    return (
      <DropBG>
        <DropMessage>{props.children}</DropMessage>
      </DropBG>
    )
  } else {
    return null
  }
}
