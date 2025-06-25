import React, { useEffect, useRef } from 'react'
import { init, dispose, ChartApi, CandleType, LineType, YAxisPosition, LayoutChildType, PanePosition } from '@dm/klinecharts'
import generatedDataList from '../generatedDataList'
import Layout from '../Layout'

/* const types = [
  { key: 'candle_solid', text: '蜡烛实心' },
  { key: 'candle_stroke', text: '蜡烛空心' },
  { key: 'candle_up_stroke', text: '蜡烛涨空心' },
  { key: 'candle_down_stroke', text: '蜡烛跌空心' },
  { key: 'ohlc', text: 'OHLC' },
  { key: 'area', text: '面积图' }
] */

export default function ChartType () {
  const chartRef = useRef<ChartApi | null>()

  useEffect(() => { 
    const chart = init('real-time-k-line_DM', {
      layout: [
        { 
          type: "candle" as LayoutChildType,
          options: {
            axisOptions: {
              scrollZoomEnabled: false
            }
          }
        },
        {
          type: 'xAxis' as LayoutChildType,
          options: {
            position: "bottom" as PanePosition,
            axisOptions: {
              scrollZoomEnabled: false
            }
          }
        }
      ],
      styles: { 
        grid: { horizontal: { style: LineType.Dashed } },
        candle: {
          type: CandleType.Area
        },
        yAxis: { 
          position: YAxisPosition.Both,
        }
      }
    })
    // 设置最右边贴边
    chart?.setOffsetRightDistance(0)
    // 设置禁止滚动 缩放
    chart?.setScrollEnabled(!1)
    chart?.setZoomEnabled(!1)

    
    chart?.applyNewData(generatedDataList())
    chartRef.current = chart

    return () => {
      dispose('real-time-k-line')
    }
  }, [])

  return (
    <Layout
      title="分时图DM">
      <div id="real-time-k-line_DM" className="k-line-chart"/>
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
