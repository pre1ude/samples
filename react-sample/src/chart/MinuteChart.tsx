import React, { useEffect, useRef } from 'react'
import { init, dispose, Chart, CandleType, LineType, YAxisPosition, LayoutChildType, PanePosition } from 'klinecharts'
// import generatedDataList from '../generatedDataList'
import Layout from '../Layout'
import data0 from '../generatedData'

/* const types = [
  { key: 'candle_solid', text: '蜡烛实心' },
  { key: 'candle_stroke', text: '蜡烛空心' },
  { key: 'candle_up_stroke', text: '蜡烛涨空心' },
  { key: 'candle_down_stroke', text: '蜡烛跌空心' },
  { key: 'ohlc', text: 'OHLC' },
  { key: 'area', text: '面积图' }
] */

export default function ChartType () {
  const chartRef = useRef<Chart | null>()

  useEffect(() => { 
    const chart = init('real-time-k-line', {
      layout: [
        { 
          type: "candle" as LayoutChildType,
          content: [
            { name: "MA" }
          ],
          options: {
            axisOptions: {
              scrollZoomEnabled: true,
            }
          }
        },
        {
          type: 'xAxis' as LayoutChildType,
          options: {
            position: "bottom" as PanePosition,
            axisOptions: {
              scrollZoomEnabled: true
            }
          }
        }
      ],
      styles: { 
        grid: { horizontal: { style: LineType.Dashed } },
        candle: {
          type: CandleType.Area
        },
        yAxis: { position: YAxisPosition.Right }
      }
    })
    // 设置最右边贴边
    // chart?.setOffsetRightDistance(0)
    // 设置禁止滚动 缩放
    // chart?.setScrollEnabled(!1)
    // chart?.setZoomEnabled(!1)

    
    chart?.applyNewData(data0)
    chartRef.current = chart

    return () => {
      dispose('real-time-k-line')
    }
  }, [])

  return (
    <Layout
      title="分时图">
      <div id="real-time-k-line" className="k-line-chart"/>
      <div
        className="k-line-chart-menu-container">
        {/* {
          types.map(({ key, text }) => {
            return (
              <button
                key={key}
                onClick={_ => {
                  chart.current && chart.current.setStyles({
                    candle: {
                      type: key as CandleType
                    }
                  })
                }}>
                {text}
              </button>
            )
          })
        } */}
      </div>
    </Layout>
  )
}
