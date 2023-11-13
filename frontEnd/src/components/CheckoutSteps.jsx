import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function CheckoutSteps(props) {
  return (
    <div className="w-full flex items-center justify-center self-center flex-wrap mx-8 px-8 mt-0">

      <div className={`w-full md:w-1/3 text-center py-2 px-[1.5] ${
          props.step1 ? 'border-b-[3px] border-blue-400 text-blue-500' : 'text-gray-500'
        }`}>
        Customer Info
      </div>
      <div className={`w-full md:w-1/3 text-center py-2 px-[1.5] ${
          props.step2 ? 'border-b-[3px] border-blue-400 text-blue-500' : 'text-gray-500'
        }`}>
        Summary
      </div>
      <div className={`w-full md:w-1/3 text-center py-2 px-[1.5] ${
          props.step3 ? 'border-b-[3px] border-blue-400 text-blue-500' : 'text-gray-500'
        }`}>
        Placement
      </div>

    </div>

  )
}
