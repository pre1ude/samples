import React, { useEffect, useState, useRef } from 'react'
import { init, dispose, Chart, YAxisType, YAxisPosition } from '@dm/klinecharts'
import generatedDataList from '../generatedDataList'
import Layout from '../Layout'

const positions = [
  { key: 'right', text: 'Right' },
  { key: 'left', text: 'Left' }
]

const types = [
  { key: 'normal', text: 'Liner' },
  { key: 'percentage', text: 'Percentage' },
  { key: 'log', text: 'Logarithm' }
]

export default function CustomThemeKLineChart () {
  const chart = useRef<Chart | null>()
  const [position, setPosition] = useState('right')
  const [type, setType] = useState('normal')
  const [isInside, setIsInside] = useState(false)
  const [isReverse, setIsReverse] = useState(false)

  useEffect(() => {
    chart.current = init('y-axis-k-line')
    chart.current?.createIndicator('VOL', false)
    chart.current?.applyNewData(generatedDataList())
    return () => {
      dispose('y-axis-k-line')
    }
  }, [])

  useEffect(() => {
    chart.current?.setStyles({
      yAxis: { position: position as YAxisPosition }
    })
  }, [position])

  useEffect(() => {
    chart.current?.setStyles({
      yAxis: { type: type as YAxisType }
    })
  }, [type])

  useEffect(() => {
    chart.current?.setStyles({
      yAxis: { inside: isInside  }
    })
  }, [isInside])

  useEffect(() => {
    chart.current?.setStyles({
      yAxis: { reverse: isReverse  }
    })
  }, [isReverse])

  return (
    <Layout
      title="Y轴">
      <div
        id="y-axis-k-line"
        className="k-line-chart"/>
      <div
        className="k-line-chart-menu-container">
        <label>
          内部:
          <input type='checkbox' checked={isInside} onChange={(e) => setIsInside(e.target.checked)}/>
        </label>
        <label>
          反转:
          <input type='checkbox' checked={isReverse} onChange={(e) => setIsReverse(e.target.checked)}/>
        </label>
        <p>
          位置:
          {
            positions.map(({ key, text }) => {
              return (
                <label><input type="radio" name="position" value={key} checked={key === position} onChange={(e) => setPosition(e.target.value)} />{text}</label>
              )
            })
          }
        </p>
        <p>
          类型:
          {
            types.map(({ key, text }) => {
              return (
                <label><input type="radio" name="type" value={key} checked={key === type} onChange={(e) => setType(e.target.value)} />{text}</label>
              )
            })
          }
        </p>
      </div>
    </Layout>
  )
}
